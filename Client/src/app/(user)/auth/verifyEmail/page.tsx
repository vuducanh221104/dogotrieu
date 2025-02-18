'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import { Form, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { authResendRegisterEmail } from '@/services/authServices';
import { useSelector, useDispatch } from 'react-redux';
import { setResendCooldown, decrementResendCooldown } from '@/redux/verifyEmailSlice';

const cx = classNames.bind(styles);

function PageVerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    const resendCooldown = useSelector((state: any) => state.verifyEmail.resendCooldown);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            dispatch(setResendCooldown(120));
            const resendEmail = await authResendRegisterEmail('vng15960@gmail.com');
            if (resendEmail) {
                setSentEmail(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timer: any;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                dispatch(decrementResendCooldown());
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown, dispatch]);

    return (
        <div className={cx('auth-wrapper')}>
            {loading && (
                <div className={cx('wrapper-loading')}>
                    <Spin size="large" className={cx('spin-icon')} />
                    <div className={cx('modal-loading')}></div>
                </div>
            )}
            <div className="container">
                <header className={cx('auth-header')}>
                    <h1
                        className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}
                        style={{ fontWeight: '500' }}
                    >
                        Xác Nhận Email
                    </h1>
                    <p className={cx('auth-description', 'auth-description-verify-email')}>
                        Bấm vào nút phía dưới để gửi lại Email Xác Nhận
                    </p>
                </header>

                <Form form={form} layout="vertical">
                    <Form.Item>
                        <button
                            className={`${archivo.className} ${cx(
                                'btn-submit',
                                resendCooldown > 0 && 'verify-clicked',
                            )} button `}
                            id="btn-submit"
                            onClick={handleSubmit}
                            disabled={resendCooldown > 0}
                        >
                            {resendCooldown > 0 ? `Gửi Lại Email (${resendCooldown}s)` : 'Gửi Lại Email'}
                        </button>
                    </Form.Item>
                </Form>
                {sentEmail && (
                    <p className={`${archivo.className} ${cx('error-message')}`}>
                        Link Xác Nhận Đã Được Gửi ! . Hãy kiểm tra hộp thư đến hoặc mục Spam nếu không thấy Email.
                    </p>
                )}
            </div>
        </div>
    );
}

export default PageVerifyEmail;
