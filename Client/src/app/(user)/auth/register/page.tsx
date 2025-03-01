'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import { GoogleLoginIcon } from '@/components/Icons';
import config from '@/config';
import { Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import Turnstile from 'react-turnstile';
import { authCheckEmail, authCheckUsername, authRegister } from '@/services/authServices';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDebounce } from '@uidotdev/usehooks';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import AuthSpinLoading from '@/components/AuthSpinLoading';

const cx = classNames.bind(styles);

function PageLogin() {
    const [form] = Form.useForm();
    const [tokenCaptcha, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [isFailedToken, setFailedToken] = useState(false);

    const debouncedUsername = useDebounce(username, 500);
    const debouncedEmail = useDebounce(email, 500);

    useEffect(() => {
        if (!debouncedUsername) return;

        const checkUsername = async () => {
            try {
                if (username.length >= 6) {
                    const res = await authCheckUsername(debouncedUsername);
                    form.setFields([
                        {
                            name: 'username',
                            errors: res?.exists ? ['Tên người dùng đã tồn tại!'] : [],
                        },
                    ]);
                    setUsernameError(res?.exists ? 'Tên người dùng đã tồn tại!' : '');
                }
            } catch (err) {
                console.error(err);
            }
        };

        checkUsername();
    }, [debouncedUsername]);

    useEffect(() => {
        if (!debouncedEmail) return;

        const checkEmail = async () => {
            try {
                if (email.length >= 6) {
                    const res = await authCheckEmail(debouncedEmail);
                    form.setFields([
                        {
                            name: 'email',
                            errors: res?.exists ? ['Email đã tồn tại!'] : [],
                        },
                    ]);
                    setEmailError(res?.exists ? 'Email đã tồn tại!' : '');
                }
            } catch (err) {
                console.error(err);
            }
        };

        checkEmail();
    }, [debouncedEmail]);

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
        setUsernameError('');
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleSubmit = async () => {
        setRegisterSuccess(false);
        setFailedToken(false);

        try {
            await form.validateFields();

            if (usernameError || emailError) {
                return;
            }

            setLoading(true);
            const values = await form.validateFields();
            await authRegister(values, tokenCaptcha);
            setRegisterSuccess(true);
            setLoading(false);
        } catch (error: any) {
            if (error.response?.status === 400) {
                setFailedToken(true);
                setLoading(false);
                return;
            }
            setLoading(false);
        }
    };
    if (registerSuccess) {
        return (
            <AuthMessageNotification
                title={'Đăng Ký Thành Công'}
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
                    <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Tạo tài khoản </h1>
                    <p className={cx('auth-description')}>Điền đầy đủ thông tin bên dưới </p>
                </header>

                <Form form={form} layout="vertical">
                    <div className={cx('form-search-wrapper')}>
                        <div className={cx('form-search-inner')}>
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên người dùng!' },
                                    { min: 6, message: 'Tên người dùng phải có ít nhất 6 ký tự!' },
                                    {
                                        validator: async () => {
                                            if (usernameError) {
                                                return Promise.reject(new Error(usernameError));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Input
                                    className={`${archivo.className}  ${cx('form-field')}`}
                                    placeholder="Tên Người Dùng"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </Form.Item>
                        </div>

                        <div className={cx('form-search-inner')}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Định dạng email không hợp lệ!' },
                                    {
                                        validator: async () => {
                                            if (emailError) {
                                                return Promise.reject(new Error(emailError));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Input
                                    className={`${archivo.className}  ${cx('form-field')}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
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
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    className={`${archivo.className}  ${cx('form-field')}`}
                                    placeholder="Mật Khẩu"
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
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    className={`${archivo.className}  ${cx('form-field')}`}
                                    placeholder="Nhập lại mật khẩu"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Turnstile
                        sitekey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
                        size={'flexible'}
                        theme={'light'}
                        onVerify={(token: any) => {
                            setToken(token);
                        }}
                    />

                    <Form.Item>
                        <button
                            className={`${archivo.className}  ${cx('btn-submit')} button`}
                            id="btn-submit"
                            onClick={handleSubmit}
                        >
                            Đăng Ký
                        </button>
                    </Form.Item>
                </Form>
                {isFailedToken && <p className={cx('error-message')}>Xảy ra lỗi hoặc sai Captcha !!</p>}
                <div className={cx('popper-social')}>
                    <a className={cx('social-link', 'google')} aria-label="Đường Dẫn Tới Google">
                        <span className={cx('social-title', 'google')}>Đăng nhập với Google</span>
                        <GoogleLoginIcon className={cx('social-icon', 'google')} />
                    </a>
                </div>

                <div className={`${cx('auth-footer')} link`}>
                    <p>Bạn Đã Có Tài Khoản? </p>
                    <button>
                        <Link href={config.routes.login}> Đăng Nhập</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageLogin;
