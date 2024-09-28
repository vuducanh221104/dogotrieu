import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import styles from './AnouBar.module.scss';
import routes from '@/config/routes';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';

const cx = classNames.bind(styles);

function AnouBar() {
    return (
        <div className={cx('wrapper-anou-bar')}>
            <Container>
                <div className={cx('anou-bar-inner', archivo.className)}>
                    <Link href={routes.user.categoryAll}>ĐỒ GỖ CŨ XƯA & HIỆN ĐẠI</Link>
                </div>
            </Container>
        </div>
    );
}

export default AnouBar;
