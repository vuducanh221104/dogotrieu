'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import { FacebookLoginIcon, GoogleLoginIcon } from '@/components/Icons';
import config from '@/config';

const cx = classNames.bind(styles);
function PageLogin() {
    return (
        <div className={cx('auth-wrapper')}>
            <header className={cx('auth-header')}>
                <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Login to my account</h1>
                <p className={cx('auth-description')}>Enter your e-mail and password:</p>
            </header>
            <div className={cx('form-search-wrapper')}>
                <div className={cx('form-search-inner')}>
                    <div className={cx('form-input')}>
                        <input type="text" className={cx('form-field')} placeholder={'Email'} />
                    </div>
                </div>
                <div className={cx('form-search-inner')}>
                    <div className={cx('form-input')}>
                        <input type="text" className={cx('form-field')} placeholder={'Password'} />
                    </div>
                </div>
            </div>
            <button className={`${cx('btn-submit')} button`}>Login</button>
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
            <div className={`${cx('auth-footer')} link`}>
                <p>New customer? </p>
                <button>
                    <Link href={config.routes.register}>Create your account</Link>
                </button>
            </div>
            <div className={`${cx('auth-footer')} link`} style={{ margin: '0' }}>
                <p>Lost password? </p>
                <button>
                    <Link href={config.routes.recover}>Recover password</Link>
                </button>
            </div>
        </div>
    );
}

export default PageLogin;
