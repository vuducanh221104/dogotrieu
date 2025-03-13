'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { authVerifyEmail } from '@/services/authServices';
import Loading from '@/components/Loading';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import routes from '@/config/routes';
import NotFound from '@/components/NotFound';
import { updateIsVerified } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import { ApiError, ApiResponse } from '@/types/client';
import { Dispatch } from 'redux';

interface VerifyResponse extends ApiResponse<any> {
    type?: 'GOOGLE';
}

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [tokenValid, setTokenValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const [successGoogle, setSuccessGoogle] = useState<boolean>(false);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const verifyToken = async () => {
            try {
                const response: VerifyResponse = await authVerifyEmail(token);
                if (response.status === 200) {
                    setTokenValid(true);
                    setSuccess(true);
                    if (response.type === 'GOOGLE') {
                        dispatch(updateIsVerified(true));
                        setSuccessGoogle(true);
                    }
                } else {
                    setTokenValid(false);
                }
            } catch (error: ApiError | any) {
                setTokenValid(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    if (loading) {
        return <Loading height="300px" />;
    }

    if (!token) {
        return <NotFound />;
    }

    if (successGoogle) {
        return (
            <AuthMessageNotification
                title="Xác thực Email thành công"
                subTitle="Quay Về Trang Thông Tin"
                textButton="Quay Về Trang Thông Tin"
                iconHeader="success"
                btnLinkTo={routes.user.info}
            />
        );
    }

    if (success) {
        return (
            <AuthMessageNotification
                title="Xác thực Email thành công"
                subTitle="Quay Về Trang Đăng Nhập"
                textButton="Quay Về Đăng Nhập"
                iconHeader="success"
                btnLinkTo={routes.user.login}
            />
        );
    }

    return (
        <AuthMessageNotification
            title="Liên kết này không hợp lệ hoặc đã hết hạn."
            subTitle="Bạn có thể đăng nhập mà không cần xác minh Email"
            textButton="Quay Về Đăng Nhập"
            iconHeader="warning"
        />
    );
}

function ResetPassword() {
    return (
        <Suspense fallback={<Loading height="300px" />}>
            <ResetPasswordContent />
        </Suspense>
    );
}

export default ResetPassword;
