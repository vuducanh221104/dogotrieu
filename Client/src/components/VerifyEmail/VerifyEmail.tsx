import classNames from 'classnames/bind';
import styles from './VerifyEmail.module.scss';
import { IconEmailVerify } from '../Icons';
import { archivo } from '@/assets/FontNext';
import Link from 'next/link';
import routes from '@/config/routes';

const cx = classNames.bind(styles);
function VerifyEmail({ title }: any) {
    return (
        <div className={cx('auth-wrapper')}>
            <div className="container">
                <header className={cx('auth-header')}>
                    <IconEmailVerify className={cx('icon-email-verify')} />
                    {title && <p className={`${archivo.className} ${cx('auth-description', 'header')}`}>{title}</p>}
                    <p className={`${archivo.className} ${cx('auth-description', 'header-2')}`}>
                        {' '}
                        Link Xác Nhận Email Đã Được Gửi !
                    </p>
                    <p className={`${archivo.className} ${cx('auth-description', 'middle')}`}></p>
                    <p className={`${archivo.className} ${cx('auth-description', 'sub-title')}`}>
                        Hãy kiểm tra hộp thư đến hoặc mục Spam nếu không thấy Email.{' '}
                    </p>
                    <button className={`${archivo.className}  ${cx('btn-submit')} button`} id="btn-submit">
                        <Link href={routes.user.login}>Quay Về Đăng Nhập</Link>
                    </button>
                </header>
            </div>
        </div>
    );
}

export default VerifyEmail;
