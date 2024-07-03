'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './SearchInner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { SearchIcon, XmarkIcon } from '@/components/Icons';
import useDebounce from '@/hooks/useDebouce';
import { search } from '@/services/searchServices';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import slugify from 'slugify';
import { CldImage } from 'next-cloudinary';
import FormatPrice from '@/components/FormatPrice';
const cx = classNames.bind(styles);

function SearchInner() {
    const nameRef: any = useRef();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500);
    const [trigger, setTrigger] = useState(0);

    //Hanle Input
    const onChangeInput = (e: any) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value === '' || value.startsWith(' ')) {
            setLoading(false);
            setSearchResult([]);
            setShowResult(false);
        } else {
            setLoading(true);
            setShowResult(true);
        }
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setLoading(false);
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await search(debounced);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced, trigger]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        nameRef.current.value = '';
        nameRef.current.focus();
        setTrigger((prev) => prev + 1);
    };

    const handleOutside = () => {
        setShowResult(false);
    };

    const handleSearch = () => {
        // window.location.href = `/search?q=${searchValue.trim()}`;
        router.replace(`/search?&q=${searchValue.trim()}`);
        setShowResult(false);
        nameRef.current.blur();
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    return (
        <Tippy
            interactive
            visible={showResult || loading}
            placement="bottom"
            className={'search-custom'}
            render={(attrs: any) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    {searchValue.length > 0 && (
                        <div className={cx('wrapper-tippy')}>
                            {loading ? (
                                <>
                                    <div className={cx('search-inner-loading-list')}>
                                        <div className={cx('search-inner-loading-item')}>
                                            <div className={cx('search-inner-loading-wrapper-image')}></div>
                                            <div className={cx('search-inner-loading-info')}>
                                                <div className={cx('search-inner-loading-name')}></div>
                                                <div className={cx('search-inner-loading-price')}></div>
                                            </div>
                                        </div>
                                        <div className={cx('search-inner-loading-item')}>
                                            <div className={cx('search-inner-loading-wrapper-image')}></div>
                                            <div className={cx('search-inner-loading-info')}>
                                                <div className={cx('search-inner-loading-name')}></div>
                                                <div className={cx('search-inner-loading-price')}></div>
                                            </div>
                                        </div>
                                        <div className={cx('search-inner-loading-item')}>
                                            <div className={cx('search-inner-loading-wrapper-image')}></div>
                                            <div className={cx('search-inner-loading-info')}>
                                                <div className={cx('search-inner-loading-name')}></div>
                                                <div className={cx('search-inner-loading-price')}></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className={cx('search-inner-title')}>products</p>
                                    {searchResult?.length > 0 ? (
                                        <>
                                            <div className={cx('search-inner-list')}>
                                                {searchResult.map((item: any) => (
                                                    <Link
                                                        href={`/products/${handleSlugify(item.name)}-${item._id}.html`}
                                                        className={cx('search-inner-item')}
                                                    >
                                                        <div className={cx('search-inner-wrapper-image')}>
                                                            <CldImage
                                                                width={'50'}
                                                                height={'60'}
                                                                src={item.thumb}
                                                                alt="image"
                                                                className={cx('search-inner-image')}
                                                            />
                                                        </div>
                                                        <div className={cx('search-inner-info')}>
                                                            <p className={cx('search-inner-name')}>{item.name}</p>
                                                            {/* <span className={cx('search-inner-price')}>255$</span> */}
                                                            <div
                                                                className={cx(
                                                                    'product-price-wrapper',
                                                                    item.price.discount !== null &&
                                                                        item.price.discount !== 0 &&
                                                                        'have-price-discount',
                                                                )}
                                                            >
                                                                {item.discount !== null &&
                                                                    item.price.discount !== 0 && (
                                                                        <p className={cx('product-price-discount')}>
                                                                            <FormatPrice value={item.price.discount} />
                                                                        </p>
                                                                    )}
                                                                <p className={cx('product-price-real')}>
                                                                    <FormatPrice value={item.price.original} />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className={cx('wrapper-search-inner-footer')}>
                                                <p
                                                    className={cx('search-inner-footer-title')}
                                                    onClick={() => router.push(`/search?q=${searchValue}`)}
                                                >
                                                    View all results
                                                </p>
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                    style={{
                                                        fontSize: '0.8rem',
                                                        marginLeft: '5px',
                                                        fontWeight: '600',
                                                    }}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className={cx('no-result')}>
                                            <p>No results matched</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
            onClickOutside={() => handleOutside()}
            offset={[0, 0]}
        >
            <div className={cx('header-search-inner')}>
                <div className={cx('header-search-content')}>
                    <input
                        className={cx('header-input')}
                        ref={nameRef}
                        onFocus={() => setShowResult(true)}
                        onChange={onChangeInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Search..."
                    />

                    {!loading && (
                        <button className={cx('button-search')} onClick={() => handleSearch()}>
                            <SearchIcon className={cx('icon-search')} />
                        </button>
                    )}
                    {searchValue.length > 0 && (
                        <button className={cx('button-clear')} onClick={() => handleClear()}>
                            <XmarkIcon className={cx('icon-xmark')} />
                        </button>
                    )}
                    {loading && (
                        <button className={cx('button-search')}>
                            <FontAwesomeIcon className={cx('icon-loading')} icon={faSpinner} />
                        </button>
                    )}
                </div>
            </div>
        </Tippy>
    );
}

export default SearchInner;
