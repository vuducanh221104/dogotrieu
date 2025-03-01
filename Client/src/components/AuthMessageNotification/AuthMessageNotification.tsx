import classNames from 'classnames/bind';
import styles from './AuthMessageNotification.module.scss';
import { IconAuthSuccess, IconAuthWarning, IconEmailVerify } from '../Icons';
import { archivo } from '@/assets/FontNext';
import Link from 'next/link';
import routes from '@/config/routes';

const cx = classNames.bind(styles);
function AuthMessageNotification({ title, message, subTitle, textButton, iconHeader = 'verifyEmail', btnLinkTo }: any) {
    return (
        <div className={cx('auth-wrapper')}>
            <div className="container">
                <header className={cx('auth-header')}>
                    {iconHeader === 'success' && <IconAuthSuccess className={cx('icon-email-verify')} />}
                    {iconHeader === 'warning' && <IconAuthWarning className={cx('icon-email-verify')} />}
                    {iconHeader === 'verifyEmail' && <IconEmailVerify className={cx('icon-email-verify')} />}
                    {title && <p className={`${archivo.className} ${cx('auth-description', 'header')}`}>{title}</p>}
                    <p className={`${archivo.className} ${cx('auth-description', 'header-2')}`}>{message}</p>
                    <p className={`${archivo.className} ${cx('auth-description', 'middle')}`}></p>
                    <p className={`${archivo.className} ${cx('auth-description', 'sub-title')}`}>{subTitle}</p>
                    <Link href={btnLinkTo || routes.user.login}>
                        <button className={`${archivo.className}  ${cx('btn-submit')} button`} id="btn-submit">
                            {textButton}
                        </button>
                    </Link>
                </header>
            </div>
        </div>
    );
}

export default AuthMessageNotification;
