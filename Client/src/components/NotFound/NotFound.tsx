'use client';
import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import { Container } from 'react-bootstrap';
import { SearchIcon } from '../Icons';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
interface IProps {
    title?: string;
    description?: string;
    placeholderText?: string;
    linkText?: string;
}

const cx = classNames.bind(styles);
function NotFound({
    title = 'Page not found',
    description = 'The page you are looking for cannot be found.',
    placeholderText = 'Search in store...',
    linkText = 'Click here to continue shopping',
}: IProps) {
    return (
        <Container>
            <div className={cx('empty-state')}>
                <p className={`heading h1 ${archivo.className} ${cx('empty-state-heading')}`}>{title}</p>
                <p className={cx('empty-state-description')}>{description}</p>
                <div className={cx('form-search-wrapper')}>
                    <div className={cx('form-search-inner')}>
                        <div className={cx('form-input')}>
                            <input type="text" className={cx('form-field')} placeholder={placeholderText} />
                        </div>
                        <button className={cx('btn')}>
                            <SearchIcon className={cx('icon-seach')} />
                        </button>
                    </div>
                </div>
                <Link href="/" className={`link ${cx('empty-state-link')}`}>
                    {linkText}
                </Link>
            </div>
        </Container>
    );
}

export default NotFound;
