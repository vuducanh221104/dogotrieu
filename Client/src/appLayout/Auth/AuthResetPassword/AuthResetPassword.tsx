'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { authResetPassword, authVerifyTokenResetPassword } from '@/services/authServices';
import Loading from '@/components/Loading';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import NotFound from '@/components/NotFound';
import routes from '@/config/routes';
import AuthSpinLoading from '@/components/AuthSpinLoading';
import { archivo } from '@/assets/FontNext';
import config from '@/config';
import { ApiError, ResetPasswordFormValues } from '@/types/client';

const cx = classNames.bind(styles);

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [tokenValid, setTokenValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const [form] = Form.useForm<ResetPasswordFormValues>();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setTokenValid(false);
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await authVerifyTokenResetPassword(token);
                if (response.status === 200) {
                    setTokenValid(true);
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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const response = await authResetPassword(token, values.password);

            if (response.status === 200) {
                form.resetFields();
                setSuccess(true);
            }
        } catch (error: ApiError | any) {
            console.log('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading height="300px" />;
    }
    if (!token) {
        return <NotFound />;
    }

    if (!tokenValid) {
        return (
            <AuthMessageNotification
                title="Liên kết này không hợp lệ hoặc đã hết hạn."
                subTitle="  Nếu bạn cần khôi phục mật khẩu, vui lòng nhấn vào nút bên dưới."
                textButton="Quên Mật Khẩu ?"
                iconHeader="warning"
                btnLinkTo={routes.user.recover}
            />
        );
    }

    if (success) {
        return (
            <AuthMessageNotification
                title="  Mật khẩu đã được thay đổi thành công."
                subTitle="Quay Về Đăng Nhập "
                textButton="Đăng Nhập"
                iconHeader="success"
            />
        );
    }

    return (
        <div className={cx('auth-wrapper')}>
            <AuthSpinLoading loading={loading} />
            <div className="container">
                <header className={cx('auth-header')}>
                    <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Tạo Mật Khẩu Mới</h1>
                    <p className={cx('auth-description')}>Nhập mật khẩu mới</p>
                </header>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <div className={cx('form-search-wrapper')}>
                        <div className={cx('form-search-inner')}>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    className={`${archivo.className} ${cx('form-field')}`}
                                    placeholder={'Mật khẩu mới'}
                                />
                            </Form.Item>
                        </div>
                        <div className={cx('form-search-inner')}>
                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    className={`${archivo.className} ${cx('form-field')}`}
                                    placeholder={'Nhập lại mật khẩu mới'}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item>
                        <button className={`${cx('btn-submit')} button`} type="submit">
                            Tiếp Tục
                        </button>
                    </Form.Item>
                </Form>
                <div className={`${cx('auth-footer')} link`}>
                    <p></p>
                    <button>
                        <Link href={config.routes.login}>Quay lại Đăng Nhập!</Link>
                    </button>
                </div>
            </div>
        </div>
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
