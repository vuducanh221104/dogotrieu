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
import { authCheckEmail, authCheckUsername, authGoogleLogin, authRegister } from '@/services/authServices';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDebounce } from '@uidotdev/usehooks';
import AuthMessageNotification from '@/components/AuthMessageNotification';
import AuthSpinLoading from '@/components/AuthSpinLoading';
import { useDispatch } from 'react-redux';
import { loginFailed, loginStart, loginSuccess } from '@/redux/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import routes from '@/config/routes';
import { useRouter } from 'next-nprogress-bar';

const cx = classNames.bind(styles);

function PageRegister() {
    const [form] = Form.useForm();
    const [tokenCaptcha, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [isFailedToken, setFailedToken] = useState(false);
    const [turnstileKey, setTurnstileKey] = useState(0);
    const [isCaptchaLoading, setIsCaptchaLoading] = useState(true);

    const debouncedUsername = useDebounce(username, 500);
    const debouncedEmail = useDebounce(email, 500);
    const [isFailedGoogle, setIsFailedGoogle] = useState(false);
    const router = useRouter();

    const dispatch = useDispatch();
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
        try {
            // Validate form trước
            const values = await form.validateFields();

            // Kiểm tra các điều kiện lỗi
            if (usernameError || emailError) {
                return;
            }

            // Kiểm tra token captcha sau khi đã validate form
            if (!tokenCaptcha) {
                setFailedToken(true);
                return;
            }

            setRegisterSuccess(false);
            setFailedToken(false);
            setLoading(true);

            await authRegister(values, tokenCaptcha);
            setRegisterSuccess(true);
            setLoading(false);
        } catch (error: any) {
            // Nếu lỗi validate form thì return luôn, không reset captcha
            if (error.errorFields) {
                return;
            }

            // Xử lý các lỗi từ API
            if (error.response?.status === 400) {
                setFailedToken(true);
                setToken(null);
                setTurnstileKey((prev) => prev + 1);
                setLoading(false);
                return;
            }
            setLoading(false);
            setToken(null);
            setTurnstileKey((prev) => prev + 1);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            if (!credentialResponse.credential) {
                setIsFailedGoogle(true);
                return;
            }

            dispatch(loginStart());
            const response = await authGoogleLogin(credentialResponse.credential);
            dispatch(loginSuccess(response));
            router.replace(routes.user.home);
        } catch (error) {
            dispatch(loginFailed());
            setIsFailedGoogle(true);
        }
    };

    const handleGoogleError = () => {
        dispatch(loginFailed());
        setIsFailedGoogle(true);
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

                    <div className={cx('captcha-container')} style={{ height: '65px' }}>
                        {isCaptchaLoading && (
                            <div className={cx('captcha-loading')}>
                                <Spin size="small" />
                                <span>Đang tải Captcha...</span>
                            </div>
                        )}
                        <Turnstile
                            key={turnstileKey}
                            sitekey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
                            size={'flexible'}
                            theme={'light'}
                            onVerify={(token: any) => setToken(token)}
                            onLoad={() => setIsCaptchaLoading(false)}
                            onError={() => {
                                setFailedToken(true);
                                setToken(null);
                            }}
                            onExpire={() => {
                                setToken(null);
                                setTurnstileKey((prev) => prev + 1);
                            }}
                            refreshExpired="auto"
                        />
                    </div>

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
                {isFailedGoogle && <p className={cx('error-message')}>Xảy ra lỗi khi đăng nhập với Google!!</p>}
                <div className={cx('popper-social')}>
                    <div className={cx('google-login-container')}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="filled_black"
                            text="signin_with"
                            shape="rectangular"
                            locale="vi"
                            width="100%"
                        />
                    </div>
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

export default PageRegister;
