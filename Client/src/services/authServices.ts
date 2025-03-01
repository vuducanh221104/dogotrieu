'use client';
import { Category } from '@/types/client';
import * as httpRequest from '@/utils/httpRequest';
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

export const authUpdatePhoneNumber = async (userId: string, phoneNumber: string): Promise<any> => {
    try {
        const res = await httpRequest.patch<any>(`api/v1/auth/updatePhoneNumber`, {
            userId: userId,
            phoneNumber: phoneNumber,
        });
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
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
