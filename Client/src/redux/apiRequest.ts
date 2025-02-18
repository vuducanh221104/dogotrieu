import httpRequest from '@/utils/httpRequest';
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess } from './authSlice';

export const login = async (user: any, tokenCaptcha: string, dispatch: any, router: any) => {
    dispatch(loginStart());
    try {
        const { usernameOrEmail, password } = user;
        const res = await httpRequest.post<any>(`api/v1/auth/login`, {
            usernameOrEmail,
            password,
            tokenCaptcha: tokenCaptcha,
        });
        router.navigate('/');
        return res.data;
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const logout = async (dispatch: any, router: any) => {
    dispatch(logOutStart());
    try {
        await httpRequest.post('api/v1/auth/logout');
        dispatch(logOutSuccess());
        router.navigate('/');
    } catch (err) {
        dispatch(logOutFailed());
    }
};
