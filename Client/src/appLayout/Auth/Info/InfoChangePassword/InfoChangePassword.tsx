'use client';
import { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import { archivo } from '@/assets/FontNext';
import config from '@/config';
import Link from 'next/link';
import { authChangePassword } from '@/services/authServices';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import { useSelector } from 'react-redux';
import routes from '@/config/routes';
import AuthSpinLoading from '@/components/AuthSpinLoading';
import useMultiCooldown from '@/utils/hookMultiCooldown';
import { AuthState, ChangePasswordFormValues, ApiError, CooldownHook } from '@/types/client';

const cx = classNames.bind(styles);

function InfoChangePassword() {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [passwordCurrentFailed, setPasswordCurrentFailed] = useState<number | null>(null);
    const [form] = Form.useForm<ChangePasswordFormValues>();
    const { currentUser } = useSelector((state: AuthState) => state.auth.login);

    const {
        cooldown: infoChangePasswordCoolDown,
        startCooldown: startInfoChangePasswordCoolDown,
        checkCooldown,
    } = useMultiCooldown('infoChangePasswordCoolDown') as CooldownHook;

    useEffect(() => {
        checkCooldown();
    }, [checkCooldown]);

    const handleSubmit = async () => {
        if (infoChangePasswordCoolDown > 0) {
            return;
        }

        if (!currentUser) {
            return;
        }

        setPasswordCurrentFailed(null);
        setLoading(true);
        setSuccess(false);

        try {
            const values = await form.validateFields();
            const response = await authChangePassword(currentUser.email, values.oldPassword, values.password);

            if (response.status === 200) {
                form.resetFields();
                setSuccess(true);
                startInfoChangePasswordCoolDown();
            }
        } catch (error: ApiError | any) {
            if (error.response?.status === 400 || error.response?.status === 401) {
                setPasswordCurrentFailed(error.response.status);
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <AuthMessageNotification
                title="Mật khẩu đã được thay đổi thành công."
                subTitle={'Quay Về Trang Thông Tin'}
                textButton="Tiếp Tục"
                btnLinkTo={routes.user.info}
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
                    <p className={cx('auth-description')}>
                        {infoChangePasswordCoolDown > 0
                            ? `Vui lòng đợi ${infoChangePasswordCoolDown} giây trước khi thay đổi mật khẩu.`
                            : 'Nhập mật khẩu mới'}
                    </p>
                </header>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <div className={cx('form-search-wrapper')}>
                        <div className={cx('form-search-inner')}>
                            <Form.Item
                                name="oldPassword"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                            >
                                <Input.Password
                                    type="password"
                                    className={`${archivo.className} ${cx('form-field')}`}
                                    placeholder={'Mật khẩu cũ'}
                                    disabled={infoChangePasswordCoolDown > 0}
                                />
                            </Form.Item>
                        </div>
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
                                    disabled={infoChangePasswordCoolDown > 0}
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
                                    disabled={infoChangePasswordCoolDown > 0}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item>
                        <button
                            className={`${archivo.className} ${cx(
                                'btn-submit',
                                infoChangePasswordCoolDown > 0 && 'verify-clicked',
                            )} button `}
                            type="submit"
                            disabled={infoChangePasswordCoolDown > 0}
                        >
                            {infoChangePasswordCoolDown > 0 ? `Cập Nhật (${infoChangePasswordCoolDown}s)` : 'Cập Nhật'}
                        </button>
                    </Form.Item>
                </Form>
                {passwordCurrentFailed === 400 && <p className={cx('error-message')}>Mật Khẩu Cũ Không Đúng !!</p>}
                {passwordCurrentFailed === 401 && (
                    <p className={cx('error-message')}>Mật Khẩu Cũ Và Mật Khẩu Mới Phải Khác Nhau !!</p>
                )}
                <div className={`${cx('auth-footer')} link`}>
                    <p></p>
                    <button>
                        <Link href={config.routes.info}>Quay lại Trang Thông Tin.</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InfoChangePassword;
