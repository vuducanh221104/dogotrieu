'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';

import { authVerifyEmail, authVerifyResendEmail } from '@/services/authServices';
import Loading from '@/components/Loading';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import routes from '@/config/routes';
import NotFound from '@/components/NotFound';
import { useRouter } from 'next-nprogress-bar';

const cx = classNames.bind(styles);

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [tokenValid, setTokenValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await authVerifyEmail(token);
                if (response.status === 200) {
                    setTokenValid(true);
                    setSuccess(true);
                } else {
                    setTokenValid(false);
                }
            } catch (error) {
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
