'use client';
import { Category } from '@/types/client';
import * as httpRequest from '@/utils/httpRequest';
import * as httpRequestAdmin from '@/utils/httpRequestAdmin';
import { adminPost } from '@/utils/httpRequestAdmin';
import { AxiosError } from 'axios';
import useSWR from 'swr';

export const authLogin = async (user: any, tokenCaptcha: string | null): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`api/v1/auth/login`, {
            usernameOrEmail: user.usernameOrEmail,
            password: user.password,
            tokenCaptcha: tokenCaptcha,
        });
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
        // return error;
        // console.error(err.response?.data);
    }
};
export const authLogout = async (): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`/api/v1/auth/logout`);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};

export const updateInfoUser = async (userId: string, phoneNumber?: string, full_name?: string): Promise<any> => {
    try {
        const data: any = { userId };
        if (phoneNumber !== undefined) data.phoneNumber = phoneNumber;
        if (full_name !== undefined) data.full_name = full_name;

        const res = await httpRequest.patch<any>(`api/v1/auth/updateInfoUser`, data);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};

export const authCheckEmail = async (email: string): Promise<any> => {
    try {
        const res = await httpRequest.get<any>(`api/v1/auth/checkEmail?email=${email}`);
        return res;
    } catch (error: any) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};

export const authCheckUsername = async (username: string): Promise<any> => {
    try {
        const res = await httpRequest.get<any>(`api/v1/auth/checkUsername?username=${username}`);
        return res;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};

export const authRegister = async (user: any, tokenCaptcha: string | null): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`api/v1/auth/addNewUser`, {
            email: user.email,
            password: user.password,
            user_name: user.username,
            tokenCaptcha: tokenCaptcha,
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
        // console.error(err.response?.data);
    }
};
export const authFotgotPassword = async (usernameOrEmail: string | null): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`api/v1/auth/forgotPassword`, {
            usernameOrEmail: usernameOrEmail,
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
        // console.error(err.response?.data);
    }
};
export const authResetPassword = async (token: string | null, newPassword: string): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`api/v1/auth/updatePassword`, {
            token: token,
            newPassword: newPassword,
        });
        return res;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};

export const authChangePassword = async (email: string, currentPassword: string, newPassword: string): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`api/v1/auth/changePassword`, {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
        });
        return res;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
        // console.error(err.response?.data);
    }
};
export const authVerifyTokenResetPassword = async (token: any) => {
    try {
        const res = await httpRequest.get<any>(`api/v1/auth/verifyFotgotPassword?token=${token}`);
        return res;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};
export const authResendRegisterEmail = async (email: string | null): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`api/v1/auth/resendVerifyEmail`, {
            email: email,
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);s
    }
};

export const authVerifyResendEmail = async (token: string) => {
    try {
        const res = await httpRequest.get<any>(`api/v1/auth/verifyResendEmail?token=${token}`);
        return res;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};

export const authVerifyEmail = async (token: string) => {
    try {
        const res = await httpRequest.get<any>(`api/v1/auth/verifyEmail?token=${token}`);
        return res;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};

//Google
export const authGoogleLogin = async (credentialResponse: any) => {
    try {
        const res = await httpRequest.post<any>(`api/v1/auth/google/verify`, {
            credential: credentialResponse,
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
        // console.error(err.response?.data);
    }
};

export const authAdminLogin = async (user: any, tokenCaptcha: string | null): Promise<any> => {
    try {
        const res = await httpRequestAdmin.adminPost<any>(`api/v1/auth/admin/login`, {
            usernameOrEmail: user.usernameOrEmail,
            password: user.password,
            tokenCaptcha: tokenCaptcha,
        });
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};

export const authAdminLogout = async (): Promise<any> => {
    try {
        const res = await httpRequestAdmin.adminPost<any>(`/api/v1/auth/admin/logout`);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};

export const authAdminRefreshToken = async (): Promise<any> => {
    try {
        const res = await httpRequestAdmin.adminPost<any>(`/api/v1/auth/admin/refreshToken`);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};

export const authRefreshToken = async (): Promise<any> => {
    try {
        const res = await httpRequest.post<any>(`/api/v1/auth/refreshToken`);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};

// Admin User Management
export const getAllUsers = () => {
    const url = `api/v1/auth/users`;
    const { data, error, isLoading, mutate } = useSWR<any, AxiosError>(url, httpRequestAdmin.adminFetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        errorRetryCount: 0,
    });

    if (error) {
        const err = error as AxiosError;
    }
    return { data, error, isLoading, mutate };
};

export const updateUser = async (userId: string, userData: any): Promise<any> => {
    try {
        const res = await httpRequestAdmin.adminPatch<any>(`api/v1/auth/users/${userId}`, userData);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};

export const deleteUser = async (userId: string): Promise<any> => {
    try {
        const res = await httpRequestAdmin.adminDeleted<any>(`api/v1/auth/users/${userId}`);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};

export const adminAddUser = async (userData: any): Promise<any> => {
    try {
        const res = await httpRequestAdmin.adminPost<any>(`api/v1/auth/admin/users`, userData);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        throw err;
    }
};
