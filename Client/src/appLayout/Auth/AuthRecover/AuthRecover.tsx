'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import config from '@/config';
import { Form } from 'antd';
import { useState } from 'react';
import { authFotgotPassword } from '@/services/authServices';
import useMultiCooldown from '@/utils/hookMultiCooldown';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import AuthSpinLoading from '@/components/AuthSpinLoading';

const cx = classNames.bind(styles);

function AuthRecover() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    const [isFailedForgot, setIsFailedForgot] = useState(false);

    const { cooldown: recoverCoolDown, startCooldown: startrecoverCoolDown } = useMultiCooldown('recoverCooldown');

    const handleSubmit = async () => {
        setIsFailedForgot(false);
        try {
            const values = await form.validateFields();
            setLoading(true);

            const sentEmailRecover = await authFotgotPassword(values.email);
            if (sentEmailRecover) {
                setSentEmail(true);
            }
            setLoading(false);
            startrecoverCoolDown();
        } catch (error: any) {
            if (error.response.status === 400) {
                setIsFailedForgot(true);
                setLoading(false);
                return;
            }

            setLoading(false);
        }
    };

    if (sentEmail) {
        return (
            <AuthMessageNotification
                title="Quên Mật Khẩu ?"
                message={'Link Xác Nhận Email Đã Được Gửi !'}
                subTitle="Hãy kiểm tra hộp thư đến hoặc mục Spam nếu không thấy Email."
                textButton="Quay Về Đăng Nhập"
            />
        );
    }

    return (
        <div className={cx('auth-wrapper')}>
            <AuthSpinLoading loading={loading} />
            <div className="container">
                <header className={cx('auth-header')}>
                    <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Quên Mật Khẩu ?</h1>
                    <p className={cx('auth-description')}>Nhập Email hoặc Username</p>
                </header>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <div className={cx('form-search-wrapper')}>
                        <div className={cx('form-search-inner')}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Định dạng email không hợp lệ!' },
                                ]}
                            >
                                <input
                                    type="email"
                                    className={`${archivo.className}  ${cx('form-field')}`}
                                    placeholder={'Nhập Email hoặc Username'}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item>
                        <button
                            className={`${archivo.className} ${cx(
                                'btn-submit',
                                recoverCoolDown > 0 && 'verify-clicked',
                            )} button `}
                            id="btn-submit"
                            type="submit"
                            disabled={recoverCoolDown > 0}
                        >
                            {recoverCoolDown > 0
                                ? `Yêu Cầu Mật Khẩu Mới (${recoverCoolDown}s)`
                                : 'Yêu Cầu Mật Khẩu Mới'}
                        </button>
                    </Form.Item>
                </Form>
                {isFailedForgot && <p className={cx('error-message')}>Sai Email hoặc không tìm thấy Email !!</p>}
                <div className={`${cx('auth-footer')} link`}>
                    <button>
                        <Link href={config.routes.login}>Quay lại Đăng Nhập</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthRecover;
