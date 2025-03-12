import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { KeyedMutator } from 'swr';
import { jwtDecode } from 'jwt-decode';
import { store } from '@/redux/store';
import { loginSuccess, logOutSuccess, updateAccessToken } from '@/redux/authSlice';
import { authLogout, authRefreshToken } from '@/services/authServices';

interface UserState {
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

axios.defaults.withCredentials = true;

const httpRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

httpRequest.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const customConfig = config as CustomInternalAxiosRequestConfig;
        const state = store.getState();
        const currentUser = state.auth.login.currentUser as UserState | null;

        if (currentUser?.accessToken) {
            try {
                const decodedToken: any = jwtDecode(currentUser.accessToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    if (!isRefreshing) {
                        isRefreshing = true;
                        try {
                            const data = await authRefreshToken();
                            const { accessToken: newToken } = data;
                            store.dispatch(updateAccessToken(newToken));
                            config.headers['Authorization'] = `Bearer ${newToken}`;
                            processQueue(null, newToken);
                        } catch (error) {
                            processQueue(error, null);
                            store.dispatch(loginSuccess(null as any));
                            return Promise.reject(error);
                        } finally {
                            isRefreshing = false;
                        }
                    }
                }

                if (!customConfig.skipAuthRefresh) {
                    config.headers['Authorization'] = `Bearer ${currentUser.accessToken}`;
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                return Promise.reject(error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

httpRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const state = store.getState();
        const currentUser = state.auth.login.currentUser as UserState | null;

        if (error.response?.status === 403 && currentUser) {
            if (
                error.response?.data?.message === 'Refresh token is missing' ||
                error.response?.data?.message === 'Invalid refresh token'
            ) {
                // Xử lý logout và reject ngay lập tức
                store.dispatch(loginSuccess(null as any));
                if (typeof window !== 'undefined') {
                    await authLogout();
                    store.dispatch(logOutSuccess());
                    window.location.href = '/auth/login';
                }
                return Promise.reject(error);
            }

            // Xử lý refresh token nếu chưa thử refresh
            if (!originalRequest._retry) {
                if (isRefreshing) {
                    // Nếu đang refresh token, thêm request vào hàng đợi
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            if (token) {
                                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            }
                            return httpRequest(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                // Đánh dấu request này đã thử refresh
                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    // Gọi API refresh token
                    const data = await authRefreshToken();
                    const { accessToken } = data;

                    if (accessToken) {
                        // Chỉ cập nhật access token mới
                        store.dispatch(updateAccessToken(accessToken));
                        httpRequest.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    }

                    // Xử lý các request trong hàng đợi
                    processQueue(null, accessToken);

                    // Thực hiện lại request ban đầu với token mới
                    return httpRequest(originalRequest);
                } catch (refreshError) {
                    // Nếu refresh token fail
                    processQueue(refreshError, null);

                    // Xóa user khỏi Redux store
                    store.dispatch(loginSuccess(null as any));

                    // Redirect về trang login nếu refresh token hết hạn
                    if (typeof window !== 'undefined') {
                        window.location.href = '/auth/login';
                    }
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error);
    },
);

export const get = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpRequest.get<T>(path, options);
    return res.data;
};

export const post = async <T>(
    path: string,
    data?: any,
    options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
    const res = await httpRequest.post<T>(path, data, options);
    return res;
};

export const patch = async <T>(
    path: string,
    data?: any,
    options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
    const res = await httpRequest.patch<T>(path, data, options);
    return res;
};

export const deleted = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    const res = await httpRequest.delete<T>(path, options);
    return res;
};

// SWR
export const fetcher = <T>(url: string) => httpRequest.get<T>(url).then((response) => response.data);

export default httpRequest;
