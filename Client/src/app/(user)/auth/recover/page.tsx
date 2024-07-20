'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import config from '@/config';

const cx = classNames.bind(styles);
function PageRecoverPassword() {
    return (
        // Recover
        <div className={cx('auth-wrapper')}>
            <header className={cx('auth-header')}>
                <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Recover password</h1>
                <p className={cx('auth-description')}>Enter your email:</p>
            </header>
            <div className={cx('form-search-wrapper')}>
                <div className={cx('form-search-inner')}>
                    <div className={cx('form-input')}>
                        <input type="text" className={cx('form-field')} placeholder={'Email'} />
                    </div>
                </div>
            </div>
            <button className={`${cx('btn-submit')} button`}>Recover</button>
            <div className={`${cx('auth-footer')} link`}>
                <p>Remembered your password? </p>
                <button>
                    <Link href={config.routes.login}>Back to login</Link>
                </button>
            </div>
        </div>
    );
}

export default PageRecoverPassword;
