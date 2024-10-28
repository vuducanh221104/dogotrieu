'use client';

import classNames from 'classnames/bind';
import styles from './SearchInner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { SearchIcon, XmarkIcon } from '@/components/Icons';
import { useDebounce } from '@uidotdev/usehooks';
import { search } from '@/services/searchServices';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import slugify from 'slugify';
import { CldImage } from 'next-cloudinary';
import FormatPrice from '@/components/FormatPrice';
import { Product } from '@/types/client';
import { archivo } from '@/assets/FontNext';

const cx = classNames.bind(styles);

function SearchInner() {
    const nameRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Product[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [noResult, setNoResult] = useState<boolean>(false);
    const debounced = useDebounce(searchValue, 500);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        setShowResult(value.length > 0);
    };

    useEffect(() => {
        const fetchApi = async () => {
            if (!debounced.trim()) {
                setLoading(false);
                setSearchResult([]);
                setNoResult(false);
                return;
            }

            setLoading(true);
            try {
                const result = await search(debounced);

                setTimeout(() => {
                    setSearchResult(result);
                    setNoResult(result.length === 0);
                    setLoading(false);
                }, 500);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        setNoResult(false);
        setShowResult(false);
        if (nameRef.current) {
            nameRef.current.value = '';
            nameRef.current.focus();
        }
    };

    const handleSearch = () => {
        router.push(`/search?q=${searchValue.trim()}`);
        setShowResult(false);
        if (nameRef.current) {
            nameRef.current.blur();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleOutsideAndResultClick = () => {
        setShowResult(false);
    };

    const handleViewAll = () => {
        setShowResult(false);
        router.push(`/search?q=${searchValue}`);
    };
    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    return (
        <div className={cx('wrapper-search-inner')}>
            <Tippy
                interactive
                visible={loading || (showResult && (searchResult.length > 0 || searchValue.length > 0))}
                placement="bottom"
                render={(attrs) => (
                    <div className={`${cx('search-result')} search-custom`} tabIndex={-1} {...attrs}>
                        {loading && (
                            <>
                                <div className={cx('search-inner-loading-list')}>
                                    <div className={cx('search-inner-loading-item')}>
                                        <div className={cx('search-bar-container')}>
                                            <div className={cx('aspect-ratio')}>
                                                <div className={cx('search-inner-loading-wrapper-image')}></div>
                                            </div>
                                        </div>
                                        <div className={cx('search-inner-loading-info')}>
                                            <div className={cx('search-inner-loading-name')}></div>
                                            <div className={cx('search-inner-loading-price')}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('search-inner-loading-list')}>
                                    <div className={cx('search-inner-loading-item')}>
                                        <div className={cx('search-bar-container')}>
                                            <div className={cx('aspect-ratio')}>
                                                <div className={cx('search-inner-loading-wrapper-image')}></div>
                                            </div>
                                        </div>
                                        <div className={cx('search-inner-loading-info')}>
                                            <div className={cx('search-inner-loading-name')}></div>
                                            <div className={cx('search-inner-loading-price')}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('search-inner-loading-list')}>
                                    <div className={cx('search-inner-loading-item')}>
                                        <div className={cx('search-bar-container')}>
                                            <div className={cx('aspect-ratio')}>
                                                <div className={cx('search-inner-loading-wrapper-image')}></div>
                                            </div>
                                        </div>
                                        <div className={cx('search-inner-loading-info')}>
                                            <div className={cx('search-inner-loading-name')}></div>
                                            <div className={cx('search-inner-loading-price')}></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {!loading && searchResult.length > 0 && (
                            <>
                                <p className={cx('search-inner-title', archivo.className)}>sản phẩm</p>
                                <div className={cx('search-inner-list')}>
                                    {searchResult.map((item) => (
                                        <Link
                                            href={`/products/${handleSlugify(item.name)}-${item._id}.html`}
                                            className={cx('search-inner-item')}
                                            key={item._id}
                                            onClick={handleOutsideAndResultClick}
                                        >
                                            <div className={cx('search-inner-wrapper-image')}>
                                                <CldImage
                                                    width={'50'}
                                                    height={'60'}
                                                    src={item.thumb}
                                                    alt={item.name}
                                                    className={cx('search-inner-image')}
                                                />
                                            </div>
                                            <div className={cx('search-inner-info')}>
                                                <p className={cx('search-inner-name')}>{item.name}</p>
                                                <div
                                                    className={cx(
                                                        'product-price-wrapper',
                                                        item.price.discount !== null &&
                                                            item.price.discount !== 0 &&
                                                            'have-price-discount',
                                                    )}
                                                >
                                                    {item.price.discount !== null && item.price.discount !== 0 && (
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
                                <div className={cx('wrapper-search-inner-footer')} onClick={handleViewAll}>
                                    <p className={cx('search-inner-footer-title', archivo.className)}>
                                        Xem tất cả sản phẩm
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
                        )}
                        {!loading && noResult && searchValue.length > 0 && (
                            <div className={cx('no-result')}>
                                <p>Không có kết quả nào được tìm thấy</p>
                            </div>
                        )}
                    </div>
                )}
                onClickOutside={handleOutsideAndResultClick}
                offset={[0, 0]}
            >
                <div className={cx('header-search-inner')} role="search" aria-label="Search Input">
                    <div className={cx('header-search-content')}>
                        <input
                            className={cx('header-input')}
                            ref={nameRef}
                            onFocus={() => setShowResult(true)}
                            onChange={onChangeInput}
                            onKeyDown={handleKeyDown}
                            placeholder="Tìm Kiếm..."
                        />

                        {!loading && (
                            <button className={cx('button-search')} onClick={handleSearch} aria-label="Search Button">
                                <SearchIcon className={cx('icon-search')} />
                            </button>
                        )}
                        {searchValue.length > 0 && (
                            <button className={cx('button-clear')} onClick={handleClear}>
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
        </div>
    );
}

export default SearchInner;
