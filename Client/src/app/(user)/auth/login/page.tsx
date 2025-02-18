'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import config from '@/config';
import { Form, Input, Spin } from 'antd';
import { authLogin } from '@/services/authServices';
import { useEffect, useState } from 'react';
import Turnstile from 'react-turnstile';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailed } from '@/redux/authSlice';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { GoogleLoginIcon } from '@/components/Icons';
import { useRouter } from 'next-nprogress-bar';

const cx = classNames.bind(styles);

function PageLogin() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [tokenCaptcha, setToken] = useState(null);
    const [isFailedLogin, setIsFailedLogin] = useState(false);
    const dispatch = useDispatch();
    const { currentUser, isFetching, error } = useSelector((state: any) => state.auth.login);

    useEffect(() => {
        if (currentUser) {
            router.replace('/');
        }
    }, [currentUser, router]);

    const handleSubmit = async () => {
        dispatch(loginStart());
        try {
            const values = await form.validateFields();
            const user = await authLogin(values, tokenCaptcha);
            if (!user) {
                dispatch(loginFailed());
                setIsFailedLogin(true);
                return;
            }
            setIsFailedLogin(false);
            dispatch(loginSuccess(user));
            router.replace('/');
        } catch (error) {
            setIsFailedLogin(false);
            dispatch(loginFailed());
        }
    };

    return (
        <div className={cx('auth-wrapper')}>
            {isFetching && (
                <div className={cx('wrapper-loading')}>
                    <Spin size="large" className={cx('spin-icon')} />
                    <div className={cx('modal-loading')}></div>
                </div>
            )}

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
                    {isFailedLogin && <p className={cx('error-message')}>Sai Mật Khẩu Hoặc Tài Khoản !!</p>}
                </Form>
                <div className={cx('popper-social')}>
                    <a className={cx('social-link', 'google')} aria-label="Đăng nhập với Google">
                        <span className={cx('social-title', 'google')}>Đăng nhập với Google</span>
                        <GoogleLoginIcon className={cx('social-icon', 'google')} />
                    </a>
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

export default PageLogin;
