import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { KeyedMutator } from 'swr';
import { jwtDecode } from 'jwt-decode';
import { store } from '@/redux/store';
import { adminLogOutSuccess, updateAdminAccessToken } from '@/redux/adminAuthSlice';
import { authAdminRefreshToken, authAdminLogout } from '@/services/authServices';

interface AdminState {
    accessToken?: string;
    user_name?: string;
    email?: string;
    [key: string]: any;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    skipAuthRefresh?: boolean;
}

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig<any> {
    skipAuthRefresh?: boolean;
}

export interface APIResponseSWR<T> {
    data: T;
    error?: string | any;
    isLoading: boolean;
    mutate: KeyedMutator<any>;
}

const baseConfig = {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
};

const httpRequestAdmin = axios.create(baseConfig);

let isRefreshingAdmin = false;
let failedAdminQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processAdminQueue = (error: any, token: string | null = null) => {
    failedAdminQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedAdminQueue = [];
};

httpRequestAdmin.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const customConfig = config as CustomInternalAxiosRequestConfig;
        const state = store.getState();
        const currentAdmin = state.adminAuth.login.currentAdmin as AdminState | null;

        // Skip token check for login and register
        if (config.url === '/api/v1/auth/admin/login') {
            return config;
        }

        // Nếu không có token thì bỏ qua
        if (!currentAdmin?.accessToken) {
            return config;
        }

        try {
            const decodedToken: any = jwtDecode(currentAdmin.accessToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                if (!isRefreshingAdmin) {
                    isRefreshingAdmin = true;
                    try {
                        const response = await authAdminRefreshToken();
                        const { accessToken: newToken } = response;
                        store.dispatch(updateAdminAccessToken(newToken));
                        config.headers['Authorization'] = `Bearer ${newToken}`;
                        processAdminQueue(null, newToken);
                    } catch (error) {
                        processAdminQueue(error, null);
                        store.dispatch(adminLogOutSuccess());
                        if (typeof window !== 'undefined') {
                            window.location.href = '/admin/auth/login';
                        }
                        return Promise.reject(error);
                    } finally {
                        isRefreshingAdmin = false;
                    }
                }
            }

            if (!customConfig.skipAuthRefresh) {
                config.headers['Authorization'] = `Bearer ${currentAdmin.accessToken}`;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            store.dispatch(adminLogOutSuccess());
            if (typeof window !== 'undefined') {
                window.location.href = '/admin/auth/login';
            }
            return Promise.reject(error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

httpRequestAdmin.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Skip refresh token logic for login request
        if (originalRequest.url === '/api/v1/auth/admin/login') {
            return Promise.reject(error);
        }

        const state = store.getState();
        const currentAdmin = state.adminAuth.login.currentAdmin as AdminState | null;

        // Nếu không có token hoặc không phải lỗi 403 thì bỏ qua
        if (!currentAdmin?.accessToken || error.response?.status !== 403) {
            return Promise.reject(error);
        }

        // Handle refresh token missing or invalid
        if (
            error.response?.data?.message === 'Refresh token is missing' ||
            error.response?.data?.message === 'Invalid refresh token'
        ) {
            try {
                await authAdminLogout();
            } catch (logoutError) {
                console.error('Error during admin logout:', logoutError);
            } finally {
                store.dispatch(adminLogOutSuccess());
                if (typeof window !== 'undefined') {
                    window.location.href = '/admin/auth/login';
                }
            }
            return Promise.reject(error);
        }

        // Handle token refresh
        if (!originalRequest._retry) {
            if (isRefreshingAdmin) {
                return new Promise((resolve, reject) => {
                    failedAdminQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (token) {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        }
                        return httpRequestAdmin(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshingAdmin = true;

            try {
                const response = await authAdminRefreshToken();
                const { accessToken } = response;

                if (accessToken) {
                    store.dispatch(updateAdminAccessToken(accessToken));
                    httpRequestAdmin.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                }

                processAdminQueue(null, accessToken);
                return httpRequestAdmin(originalRequest);
            } catch (refreshError) {
                processAdminQueue(refreshError, null);
                try {
                    await authAdminLogout();
                } catch (logoutError) {
                    console.error('Error during admin logout:', logoutError);
                } finally {
                    store.dispatch(adminLogOutSuccess());
                    if (typeof window !== 'undefined') {
                        window.location.href = '/admin/auth/login';
                    }
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshingAdmin = false;
            }
        }

        return Promise.reject(error);
    },
);

export const adminGet = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpRequestAdmin.get<T>(path, options);
    return res.data;
};

export const adminPost = async <T>(
    path: string,
    data?: any,
    options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
    const res = await httpRequestAdmin.post<T>(path, data, options);
    return res;
};

export const adminPatch = async <T>(
    path: string,
    data?: any,
    options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
    const res = await httpRequestAdmin.patch<T>(path, data, options);
    return res;
};

export const adminDeleted = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    const res = await httpRequestAdmin.delete<T>(path, options);
    return res;
};

// SWR fetcher
export const adminFetcher = <T>(url: string) => httpRequestAdmin.get<T>(url).then((response) => response.data);

export default httpRequestAdmin;
