'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import config from '@/config';
import { Form, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { authFotgotPassword } from '@/services/authServices';
import { useSelector, useDispatch } from 'react-redux';
import { setRecoverCooldown, decrementRecoverCooldown } from '@/redux/verifyEmailSlice';
import VerifyEmail from '@/components/VerifyEmail';
import AuthMessageNotification from '@/components/AuthMessageNotification';

const cx = classNames.bind(styles);

function PageRecoverPassword() {
    const [loading, setLoading] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    const recoverCooldown = useSelector((state: any) => state.verifyEmail.recoverCooldown);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            dispatch(setRecoverCooldown(120));
            const sentEmailRecover = await authFotgotPassword(values.email);
            if (sentEmailRecover) {
                setSentEmail(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timer: any;
        if (recoverCooldown > 0) {
            timer = setInterval(() => {
                dispatch(decrementRecoverCooldown());
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [recoverCooldown, dispatch]);
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
            {loading && (
                <div className={cx('wrapper-loading')}>
                    <Spin size="large" className={cx('spin-icon')} />
                    <div className={cx('modal-loading')}></div>
                </div>
            )}
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
                            recoverCooldown > 0 && 'verify-clicked',
                        )} button `}
                        id="btn-submit"
                        type="submit"
                        disabled={recoverCooldown > 0}
                    >
                        {recoverCooldown > 0 ? `Tiếp Tục (${recoverCooldown}s)` : 'Tiếp Tục'}
                    </button>
                </Form.Item>
            </Form>
            {sentEmail && (
                <p className={`${archivo.className} ${cx('error-message')}`}>
                    Link Xác Nhận Đã Được Gửi ! . Hãy kiểm tra hộp thư đến hoặc mục Spam nếu không thấy Email.
                </p>
            )}

            <div className={`${cx('auth-footer')} link`}>
                <p>Bạn Quên Mật Khẩu?</p>
                <button>
                    <Link href={config.routes.login}>Quay lại Đăng Nhập</Link>
                </button>
            </div>
        </div>
    );
}

export default PageRecoverPassword;
