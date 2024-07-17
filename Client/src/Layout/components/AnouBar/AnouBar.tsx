import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import styles from './AnouBar.module.scss';
import routes from '@/config/routes';
import Link from 'next/link';

const cx = classNames.bind(styles);

function AnouBar() {
    return (
        <div className={cx('wrapper-anou-bar')}>
            <Container>
                <div className={cx('anou-bar-inner')}>
                    <Link href={routes.user.categoryAll}>Kho hàng lớn + Miễn phí vận chuyển *</Link>
                </div>
            </Container>
        </div>
    );
}

export default AnouBar;
