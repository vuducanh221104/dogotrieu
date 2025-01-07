'use client';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ChervonMenu, FacebookLoginIcon, GoogleLoginIcon, UserIcon, XmarkIcon } from '@/components/Icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
function Login() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

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
            <div className={cx('wrapper-tippy', showMenu && 'active')} ref={wrapperRef}>
                <ChervonMenu className={cx('icon-chervon-menu')} />
                <div className={cx('wrapper-content')}>
                    <div className={cx('form-wrapper')}>
                        {/* Don't hide , delete only div  */}
                        {/* <div className={cx('modal-overlay', showMenu && 'active')}>Chức Năng Này Chưa Hoàn Thiện</div> */}
                        <div className={cx('login-panel', showRegister && 'active-login')}>
                            <header className={cx('popper-header')}>
                                <h2 className={cx('popper-title')}>Login to my account</h2>
                                <p className={cx('popper-desc')}>Enter your e-mail and password:</p>
                            </header>
                            <div className={cx('popper-input')}>
                                <div className={cx('input-item')}>
                                    <input className={cx('input-form')} placeholder="Email" />
                                </div>
                                <div className={cx('input-item')}>
                                    <input className={cx('input-form')} placeholder="Password" />
                                </div>
                            </div>
                            <button className={cx('btn-submit')}>Login</button>
                            <div className={cx('popper-social')}>
                                <a className={cx('social-link', 'facebook')}>
                                    <span className={cx('social-title')}>Sign in with Facebook</span>
                                    <FacebookLoginIcon className={cx('social-icon', 'facebook')} />
                                </a>
                                <a
                                    href="http://localhost:4000/api/v1/auth/google"
                                    className={cx('social-link', 'google')}
                                >
                                    <span className={cx('social-title', 'goole')}>Sign in with Google</span>
                                    <GoogleLoginIcon className={cx('social-icon', 'google')} />
                                </a>
                            </div>
                            <div className={cx('popper-auth')}>
                                <p>
                                    New customer?
                                    <button onClick={() => setShowRegister(!showRegister)}>Create your account</button>
                                </p>

                                <p>
                                    Lost password?
                                    <a>Recover password</a>
                                </p>
                            </div>
                        </div>

                        <div className={cx('register-panel', showRegister && 'active-register')}>
                            <header className={cx('popper-header')}>
                                <h2 className={cx('popper-title')}>Create my account</h2>
                                <p className={cx('popper-desc')}>Please fill in the information below:</p>
                            </header>
                            <div className={cx('popper-input')}>
                                <div className={cx('input-item')}>
                                    <input className={cx('input-form')} placeholder="First Name" />
                                </div>
                                <div className={cx('input-item')}>
                                    <input className={cx('input-form')} placeholder="Last Name" />
                                </div>
                                <div className={cx('input-item')}>
                                    <input className={cx('input-form')} placeholder="Email" />
                                </div>
                                <div className={cx('input-item')}>
                                    <input className={cx('input-form')} placeholder="Password" />
                                </div>
                            </div>
                            <button className={cx('btn-submit')}>Create my account</button>
                            <div className={cx('popper-social')}>
                                <a className={cx('social-link', 'facebook')}>
                                    <span className={cx('social-title')}>Sign in with Facebook</span>
                                    <FacebookLoginIcon className={cx('social-icon', 'facebook')} />
                                </a>
                                <a className={cx('social-link', 'google')}>
                                    <span className={cx('social-title', 'goole')}>Sign in with Google</span>
                                    <GoogleLoginIcon className={cx('social-icon', 'google')} />
                                </a>
                            </div>
                            <div className={cx('popper-auth')}>
                                <p>
                                    Already have an account?
                                    <button onClick={() => setShowRegister(!showRegister)}>Login</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
