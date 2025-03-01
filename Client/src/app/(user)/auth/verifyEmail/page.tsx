'use client';
import { Suspense, useState } from 'react';
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

    const { cooldown: resendCooldown, startCooldown: startResendCooldown } = useMultiCooldown('resendCooldown');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await authResendRegisterEmail(currentUser.email);
            setSentEmail(true);
            startResendCooldown();
        } catch (error) {
            console.error('Lỗi khi gửi lại email:', error);
        } finally {
            setLoading(false);
        }
    };

    if (sentEmail) {
        return (
            <AuthMessageNotification
                title="Xác Nhận Email"
                message={'Link Xác Nhận Đã Được Gửi !'}
                subTitle="Hãy kiểm tra hộp thư đến hoặc mục Spam nếu không thấy Email."
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
                    <p className={cx('auth-description')}>Bấm vào nút phía dưới để gửi lại Email Xác Nhận</p>
                </header>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item>
                        <button
                            className={`${archivo.className} ${cx(
                                'btn-submit',
                                resendCooldown > 0 && 'verify-clicked',
                            )} button `}
                            id="btn-submit"
                            type="submit"
                            disabled={resendCooldown > 0}
                        >
                            {resendCooldown > 0 ? `Gửi Lại Email (${resendCooldown}s)` : 'Gửi Lại Email'}
                        </button>
                    </Form.Item>
                </Form>
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
