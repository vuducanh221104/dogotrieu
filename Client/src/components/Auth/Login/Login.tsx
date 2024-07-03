'use client';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ChervonMenu, FacebookLoginIcon, GoogleLoginIcon, UserIcon } from '@/components/Icons';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Login() {
    const [classActive, setClassActive] = useState<any>('');
    const [showMenu, setShowMenu] = useState<any>(false);
    const [showRegister, setShowRegister] = useState<any>(false);

    return (
        <div>
            <Tippy
                interactive
                visible={showMenu}
                placement="bottom-start"
                onClickOutside={() => setShowMenu(!showMenu)}
                onShow={() => setClassActive('active')}
                onHide={() => setClassActive('')}
                offset={[10, 15]}
                animation={' transition: opacity 0.7s cubic-bezier(0, 1, 0.4, 1), transform;'}
                render={(attrs: any) => (
                    <div className={cx('wrapper')} style={!showMenu ? { display: 'none' } : {}}>
                        <div
                            className={cx('popperover')}
                            tabIndex="-1"
                            {...attrs}
                            style={showRegister ? { height: '590px' } : { height: '490px' }}
                        >
                            <ChervonMenu className={cx('icon-chervon-menu')} />
                            <div className={cx('wrapper-tippy', classActive)}>
                                <div className={cx('form-wrapper')}>
                                    {/* Don't hide , delete only div  */}
                                    <div className={cx('modal-overlay')}>Chức Năng Này Chưa Hoàn Thiện</div>
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
                                            <a className={cx('social-link', 'google')}>
                                                <span className={cx('social-title', 'goole')}>Sign in with Google</span>
                                                <GoogleLoginIcon className={cx('social-icon', 'google')} />
                                            </a>
                                        </div>
                                        <div className={cx('popper-auth')}>
                                            <p>
                                                New customer?
                                                <button onClick={() => setShowRegister(!showRegister)}>
                                                    Create your account
                                                </button>
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
                )}
            >
                <div onClick={() => setShowMenu(!showMenu)}>
                    <UserIcon style={{ height: '22px', width: '20px', cursor: 'pointer' }} />
                </div>
            </Tippy>
        </div>
    );
}

export default Login;
