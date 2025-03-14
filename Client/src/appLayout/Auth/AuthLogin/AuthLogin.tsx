'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import config from '@/config';
import { Form, Input } from 'antd';
import { authGoogleLogin, authLogin } from '@/services/authServices';
import { useState } from 'react';
import Turnstile from 'react-turnstile';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailed } from '@/redux/authSlice';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from 'next-nprogress-bar';
import AuthSpinLoading from '@/components/AuthSpinLoading';
import routes from '@/config/routes';
import { GoogleLogin } from '@react-oauth/google';
import { AuthState, LoginFormValues, ApiError, GoogleCredentialResponse } from '@/types/client';
import { Dispatch } from 'redux';
import useWindowSize from '@/hooks/useWIndowSize';

const cx = classNames.bind(styles);

function AuthLogin() {
    const router = useRouter();
    const [form] = Form.useForm<LoginFormValues>();
    const [tokenCaptcha, setToken] = useState<string | null>(null);
    const [isFailedLogin, setIsFailedLogin] = useState<boolean>(false);
    const [isFailedToken, setFailedToken] = useState<boolean>(false);
    const [isFailedGoogle, setIsFailedGoogle] = useState<boolean>(false);
    const [turnstileKey, setTurnstileKey] = useState<number>(0);

    const dispatch: Dispatch = useDispatch();
    const { currentUser, isFetching, error } = useSelector((state: AuthState) => state.auth.login);
    const { width } = useWindowSize();
    const googleButtonWidth = width < 297 ? '200' : width < 349 ? '250' : '300';

    const handleGoogleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
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

    const handleSubmit = async () => {
        if (!tokenCaptcha) {
            setFailedToken(true);
            return;
        }

        setIsFailedLogin(false);
        setFailedToken(false);
        dispatch(loginStart());
        try {
            const values = await form.validateFields();
            const user = await authLogin(values, tokenCaptcha);

            dispatch(loginSuccess(user));
            setIsFailedLogin(false);
            router.replace(routes.user.home);
        } catch (error: ApiError | any) {
            dispatch(loginFailed());

            if (error.response?.status === 404) {
                // Sai tài khoản hoặc mật khẩu
                setIsFailedLogin(true);
                setFailedToken(false);
                form.setFieldValue('password', '');
                // Reset captcha
                setToken(null);
                setTurnstileKey((prev) => prev + 1);
                return;
            }
            if (error.response?.status === 400) {
                // Lỗi captcha
                setFailedToken(true);
                setIsFailedLogin(false);
                setToken(null);
                setTurnstileKey((prev) => prev + 1);
                return;
            }
            // Lỗi khác
            setIsFailedLogin(false);
            setFailedToken(false);
            setToken(null);
            setTurnstileKey((prev) => prev + 1);
            form.setFieldValue('password', '');
        }
    };

    return (
        <div className={cx('auth-wrapper')}>
            <AuthSpinLoading loading={isFetching} />
            <div className="container">
                <header className={cx('auth-header')}>
                    <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Đăng Nhập</h1>
                    <p className={cx('auth-description')}>Nhập E-mail/Tên Người Dùng và Mật Khẩu</p>
                </header>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <div className={cx('form-search-wrapper')}>
                        <div className={cx('form-search-inner')}>
                            <Form.Item
                                name="usernameOrEmail"
                                rules={[{ required: true, message: 'Vui lòng nhập tên người dùng hoặc email!' }]}
                            >
                                <Input
                                    type="text"
                                    className={`${archivo.className}  ${cx('form-field')}`}
                                    placeholder={'Tên Người Dùng hoặc Email'}
                                />
                            </Form.Item>
                        </div>
                        <div className={cx('form-search-inner')}>
                            <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                                <Input.Password
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    type="password"
                                    className={`${archivo.className}  ${cx('form-field')}`}
                                    placeholder={'Mật Khẩu'}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={cx('captcha-container')} style={{ height: '65px' }}>
                        <Turnstile
                            key={turnstileKey}
                            sitekey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
                            size={'flexible'}
                            theme={'light'}
                            onVerify={(token: string) => setToken(token)}
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
                            type="submit"
                        >
                            Đăng Nhập
                        </button>
                    </Form.Item>
                    {isFailedLogin && <p className={cx('error-message')}>Sai Mật Khẩu Hoặc Tài Khoản !!</p>}
                    {isFailedToken && !isFailedLogin && (
                        <p className={cx('error-message')}>Xảy ra lỗi hoặc sai Captcha !!</p>
                    )}
                    {isFailedGoogle && <p className={cx('error-message')}>Xảy ra lỗi khi đăng nhập với Google!!</p>}
                </Form>
                <div className={cx('popper-social')}>
                    <div className={cx('google-login-container')}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="filled_black"
                            text="signin_with"
                            shape="rectangular"
                            locale="vi"
                            width={googleButtonWidth}
                            useOneTap={false}
                        />
                    </div>
                </div>
                <div className={`${cx('auth-footer')} link`}>
                    <p>Người Mới?</p>
                    <button>
                        <Link href={config.routes.register}>Tạo Tài Khoản</Link>
                    </button>
                </div>
                <div className={`${cx('auth-footer')} link`} style={{ margin: '0' }}>
                    <p>Bạn Quên Mật Khẩu?</p>
                    <button>
                        <Link href={config.routes.recover}>Lấy Lại Mật Khẩu</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthLogin;
