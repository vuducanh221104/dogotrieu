'use client';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ChervonMenu, GoogleLoginIcon, UserIcon, XmarkIcon } from '@/components/Icons';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Form, Input, Spin } from 'antd';
import Turnstile from 'react-turnstile';
import { archivo } from '@/assets/FontNext';
import { useSelector, useDispatch } from 'react-redux';
import { loginFailed, loginStart, loginSuccess } from '@/redux/authSlice';
import { authLogin } from '@/services/authServices';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from 'next-nprogress-bar';
import config from '@/config';
import AuthSpinLoading from '@/components/AuthSpinLoading';

const cx = classNames.bind(styles);

function Login() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [tokenCaptcha, setToken] = useState(null);
    const [isFailedLogin, setIsFailedLogin] = useState(false);
    const [isFailedToken, setFailedToken] = useState(false);
    const dispatch = useDispatch();
    const { currentUser, isFetching, error } = useSelector((state: any) => state.auth.login);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const handleSubmit = async () => {
        setIsFailedLogin(false);
        setFailedToken(false);
        dispatch(loginStart());
        try {
            const values = await form.validateFields();
            const user = await authLogin(values, tokenCaptcha);
            dispatch(loginSuccess(user));
            setIsFailedLogin(false);
            form.resetFields();
        } catch (error: any) {
            if (error.response.status === 404) {
                dispatch(loginFailed());
                setIsFailedLogin(true);
                return;
            }
            if (error.response.status === 400) {
                dispatch(loginFailed());
                setFailedToken(true);
                return;
            }
            setIsFailedLogin(false);
            dispatch(loginFailed());
        }
    };
    const logoutSubmit = () => {
        router.replace('/auth/logout');
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className={cx('wrapper-user-tippy')}>
            <div role="button" aria-label="User Button" className={cx('btn-user')}>
                <UserIcon
                    style={{ height: '22px', width: '20px', cursor: 'pointer' }}
                    className={cx('icon-user', showMenu && 'onhide')}
                    onClick={() => setShowMenu(true)}
                />
                <XmarkIcon
                    style={{ height: '24px', width: '27px', cursor: 'pointer' }}
                    className={cx('icon-xmark', showMenu && 'onhide')}
                />
            </div>

            <div className={cx('wrapper-tippy', showMenu && 'active', currentUser && 'is-login')} ref={wrapperRef}>
                <AuthSpinLoading loading={isFetching} />

                <ChervonMenu className={cx('icon-chervon-menu')} />
                <div className={cx('wrapper-content')}>
                    <div className={cx('form-wrapper')}>
                        {currentUser ? (
                            <ul>
                                <li>Hello, {currentUser.user_name}</li>
                                <li>
                                    <Link href={config.routes.info}>Thông Tin</Link>
                                </li>
                                {!currentUser.is_verified && (
                                    <li>
                                        <Link href={config.routes.verifyEmail}>Xác Nhận Email</Link>
                                    </li>
                                )}
                                <li onClick={() => logoutSubmit()}>
                                    <Link href={config.routes.logout}>Đăng Xuất</Link>
                                </li>
                            </ul>
                        ) : (
                            <div className={cx('login-panel')}>
                                <header className={cx('popper-header')}>
                                    <h2 className={cx('popper-title')}>Đăng Nhập</h2>
                                    <p className={cx('popper-desc')}>Nhập E-mail/Tên Người Dùng và Mật Khẩu</p>
                                </header>
                                <div className={cx('popper-input')}>
                                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                                        <div className={cx('form-search-wrapper')}>
                                            <div className={cx('input-item')}>
                                                <Form.Item
                                                    name="usernameOrEmail"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập tên người dùng hoặc email!',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        type="text"
                                                        className={`${archivo.className}  ${cx('input-form')}`}
                                                        placeholder={'Tên Người Dùng hoặc Email'}
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={cx('input-item')}>
                                                <Form.Item
                                                    name="password"
                                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                                >
                                                    <Input.Password
                                                        iconRender={(visible) =>
                                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                        }
                                                        type="password"
                                                        className={`${archivo.className}  ${cx('input-form')}`}
                                                        placeholder={'Mật Khẩu'}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <Turnstile
                                            sitekey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
                                            size={'flexible'}
                                            theme={'light'}
                                            onVerify={(token: any) => setToken(token)}
                                        />

                                        <Form.Item>
                                            <button
                                                className={`${archivo.className}  ${cx('btn-submit')} button`}
                                                id="btn-submit"
                                                type="submit"
                                            >
                                                Đăng Nhập
                                            </button>
                                        </Form.Item>
                                        {isFailedLogin && (
                                            <p className={cx('error-message')}>Sai Mật Khẩu Hoặc Tài Khoản !!</p>
                                        )}
                                        {isFailedToken && !isFailedLogin && (
                                            <p className={cx('error-message')}>Xảy ra lỗi hoặc sai Captcha !!</p>
                                        )}
                                    </Form>
                                </div>
                                <div className={cx('popper-social')}>
                                    <a
                                        href="http://localhost:4000/api/v1/auth/google"
                                        className={cx('social-link', 'google')}
                                    >
                                        <span className={cx('social-title', 'goole')}>Sign in with Google</span>
                                        <GoogleLoginIcon className={cx('social-icon', 'google')} />
                                    </a>
                                </div>
                                <div className={cx('popper-auth')}>
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
