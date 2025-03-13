'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Form } from 'antd';
import AuthSpinLoading from '@/components/AuthSpinLoading';
import { archivo } from '@/assets/FontNext';
import styles from '@/styles/Auth.module.scss';
import { authResendRegisterEmail } from '@/services/authServices';
import Loading from '@/components/Loading';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import useMultiCooldown from '@/utils/hookMultiCooldown';

const cx = classNames.bind(styles);

function PageVerifyEmailContent() {
    const [form] = Form.useForm();
    const { currentUser } = useSelector((state: any) => state.auth.login);
    const [loading, setLoading] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    const [isFailedSend, setIsFailedSend] = useState(false);

    const {
        cooldown: authVerifyEmail,
        startCooldown: startauthVerifyEmail,
        checkCooldown,
    } = useMultiCooldown('authVerifyEmail');

    // Kiểm tra cooldown khi component mount và mỗi khi có thay đổi
    useEffect(() => {
        checkCooldown();
    }, [checkCooldown]);

    const handleSubmit = async () => {
        // Kiểm tra lại cooldown trước khi submit
        if (authVerifyEmail > 0) {
            return;
        }

        setIsFailedSend(false);
        setLoading(true);
        try {
            const response = await authResendRegisterEmail(currentUser.email);
            if (response) {
                setSentEmail(true);
                startauthVerifyEmail(); // Bắt đầu cooldown khi gửi email thành công
            }
        } catch (error) {
            console.error('Lỗi khi gửi lại email:', error);
            setIsFailedSend(true);
        } finally {
            setLoading(false);
        }
    };

    if (sentEmail) {
        return (
            <AuthMessageNotification
                title="Xác Nhận Email"
                message={'Link Xác Nhận Đã Được Gửi !'}
                subTitle={'Hãy kiểm tra hộp thư đến hoặc mục Spam nếu không thấy Email.'}
                textButton="Quay Về Trang Chủ"
            />
        );
    }

    return (
        <div className={cx('auth-wrapper')}>
            <AuthSpinLoading loading={loading} />
            <div className="container">
                <header className={cx('auth-header')}>
                    <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Xác Nhận Email</h1>
                    <p className={cx('auth-description')}>'Bấm vào nút phía dưới để gửi lại Email Xác Nhận'</p>
                </header>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item>
                        <button
                            className={`${archivo.className} ${cx(
                                'btn-submit',
                                authVerifyEmail > 0 && 'verify-clicked',
                            )} button `}
                            id="btn-submit"
                            type="submit"
                            disabled={authVerifyEmail > 0}
                        >
                            {authVerifyEmail > 0 ? `Gửi Lại Email (${authVerifyEmail}s)` : 'Gửi Lại Email'}
                        </button>
                    </Form.Item>
                </Form>
                {isFailedSend && (
                    <p className={cx('error-message')}>Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau!</p>
                )}
            </div>
        </div>
    );
}

function PageVerifyEmail() {
    return (
        <Suspense fallback={<Loading height="300px" />}>
            <PageVerifyEmailContent />
        </Suspense>
    );
}

export default PageVerifyEmail;
