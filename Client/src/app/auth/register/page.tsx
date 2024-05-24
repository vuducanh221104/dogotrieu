'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/Auth.module.scss';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import config from '@/config';

const cx = classNames.bind(styles);
function PageRegister() {
    return (
        // Recover
        <div className={cx('auth-wrapper')}>
            <header className={cx('auth-header')}>
                <h1 className={`heading h1 ${archivo.className} ${cx('auth-heading')}`}>Create my account</h1>
                <p className={cx('auth-description')}>Please fill in the information below:</p>
            </header>
            <div className={cx('form-search-wrapper')}>
                <div className={cx('form-search-inner')}>
                    <div className={cx('form-input')}>
                        <input type="text" className={cx('form-field')} placeholder={'First name'} />
                    </div>
                </div>
                <div className={cx('form-search-inner')}>
                    <div className={cx('form-input')}>
                        <input type="text" className={cx('form-field')} placeholder={'Last name'} />
                    </div>
                </div>

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

            <button className={`${cx('btn-submit')} button`}>Create my account</button>
            <div className={`${cx('auth-footer')} link`}>
                <p>Already have an account?</p>
                <button>
                    <Link href={config.routes.login}>Login here</Link>
                </button>
            </div>
        </div>
    );
}

export default PageRegister;
