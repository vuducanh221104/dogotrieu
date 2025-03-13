'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { authVerifyResendEmail } from '@/services/authServices';
import Loading from '@/components/Loading';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import routes from '@/config/routes';
import NotFound from '@/components/NotFound';
import { useDispatch } from 'react-redux';
import { updateIsVerified } from '@/redux/authSlice';
import { ApiError } from '@/types/client';
import { Dispatch } from 'redux';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [tokenValid, setTokenValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await authVerifyResendEmail(token);
                if (response.status === 200) {
                    setTokenValid(true);
                    setSuccess(true);
                    dispatch(updateIsVerified(true));
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
    }, [token, dispatch]);

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
                subTitle="Quay Về Trang Chủ"
                textButton="Trang Chủ"
                iconHeader="success"
                btnLinkTo={routes.user.login}
            />
        );
    }

    return (
        <AuthMessageNotification
            title="Liên kết này không hợp lệ hoặc đã hết hạn."
            subTitle="Nếu bạn muốn xác minh Email , Vui lòng bấm vào nút bên dưới "
            textButton="Xác Minh Email"
            iconHeader="warning"
            btnLinkTo={routes.user.verifyEmail}
        />
    );
}

function PageVerifyEmailCheck() {
    return (
        <Suspense fallback={<Loading height="300px" />}>
            <VerifyEmailContent />
        </Suspense>
    );
}

export default PageVerifyEmailCheck;
