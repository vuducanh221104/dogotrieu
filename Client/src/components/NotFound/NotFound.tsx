'use client';
import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import { Container } from 'react-bootstrap';
import { SearchIcon, XmarkIcon } from '../Icons';
import Link from 'next/link';
import { archivo } from '@/assets/FontNext';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    const nameRef = useRef<any>();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    //Hanle Input
    const onChangeInput = (e: any) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleSearch = () => {
        // window.location.href = `/search?q=${searchValue.trim()}`;
        router.replace(`/search?&q=${searchValue}`);
        nameRef.current.blur();
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchValue('');
        nameRef.current.value = '';
        nameRef.current.focus();
    };

    return (
        <Container>
            <div className={cx('empty-state')}>
                <p className={`heading h1 ${archivo.className} ${cx('empty-state-heading')}`}>{title}</p>
                <p className={cx('empty-state-description')}>{description}</p>
                <div className={cx('form-search-wrapper')}>
                    <div className={cx('form-search-inner')}>
                        <div className={cx('form-input')}>
                            <input
                                type="text"
                                className={cx('form-field')}
                                placeholder={placeholderText}
                                ref={nameRef}
                                onChange={onChangeInput}
                                onKeyDown={handleKeyDown}
                            />
                            {searchValue.length > 0 && (
                                <button className={cx('button-clear')} onClick={() => handleClear()}>
                                    <XmarkIcon className={cx('icon-xmark')} />
                                </button>
                            )}
                        </div>
                        <button className={cx('btn')} onClick={() => handleSearch()}>
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
