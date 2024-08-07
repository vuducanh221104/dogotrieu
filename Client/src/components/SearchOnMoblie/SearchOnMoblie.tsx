'use client';

import classNames from 'classnames/bind';
import styles from './SearchOnMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { search } from '@/services/searchServices';
import useDebounce from '@/hooks/useDebouce';
import { useRouter } from 'next-nprogress-bar';
import slugify from 'slugify';
import Link from 'next/link';
import FormatPrice from '../FormatPrice';
import { CldImage } from 'next-cloudinary';
import { Product } from '@/types/client';

interface SearchOnMobileProps {
    showSearch: boolean;
}

const cx = classNames.bind(styles);

function SearchOnMobile({ showSearch }: SearchOnMobileProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [close, setClose] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Product[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const debounced: any = useDebounce(searchValue, 500);
    const [trigger, setTrigger] = useState<number>(0);

    // Handle Input
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
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
            try {
                const result = await search(debounced);
                setSearchResult(result);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, [debounced, trigger]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        if (nameRef.current) {
            nameRef.current.value = '';
            nameRef.current.focus();
        }
        setTrigger((prev) => prev + 1);
    };

    const handleSearch = () => {
        setClose(true);
        router.replace(`/search?&q=${searchValue.trim()}`);
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

    const handleViewAll = () => {
        setClose(true);
        router.push(`/search?q=${searchValue}`);
    };

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    return (
        <>
            <div className={cx('header-search-on-moblie', showSearch && 'active', !close && showSearch && 'fixed')}>
                <div className={cx('header-search-on-moblie-content', showSearch && 'active', !close && 'fixed')}>
                    <div className={cx('header-inner-top')}>
                        <div className={cx('search-bar-top')}>
                            <div className={cx('input-wrapper')}>
                                <input
                                    className={cx('header-input')}
                                    placeholder="Search..."
                                    onFocus={() => {
                                        setClose(false), setShowResult(true);
                                    }}
                                    ref={nameRef}
                                    onChange={onChangeInput}
                                    onKeyDown={handleKeyDown}
                                />
                                <button className={cx('button-clear')}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className={cx('icon-xmark')}
                                        onClick={handleClear}
                                    />
                                </button>
                            </div>

                            {loading ? (
                                <button className={cx('button-search')} aria-label="Search">
                                    <FontAwesomeIcon className={cx('icon-loading')} icon={faSpinner} />
                                </button>
                            ) : (
                                <button className={cx('button-search')} onClick={handleSearch}>
                                    <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                                </button>
                            )}
                        </div>
                        <button
                            className={cx('heading-close', !close ? 'close' : '')}
                            onClick={() => setClose(!close)}
                            style={
                                !close
                                    ? {
                                          width: '77px',
                                      }
                                    : { width: '0px' }
                            }
                        >
                            <span>Close</span>
                        </button>
                    </div>
                </div>
                {/* RESULT */}
                <div className={cx('wrapper-tippy', !close && showSearch && 'fixed')}>
                    {!loading ? (
                        searchValue.trim() && (
                            <>
                                {searchResult?.length > 0 ? (
                                    <>
                                        <p className={cx('search-inner-title')}>products</p>
                                        <div className={cx('search-inner-list')}>
                                            {searchResult.map((item, index) => (
                                                <Link
                                                    href={`/products/${handleSlugify(item.name)}-${item._id}.html`}
                                                    className={cx('search-inner-item')}
                                                    key={index}
                                                    onClick={() => setClose(true)}
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
                                                            {item.discount !== null && item.price.discount !== 0 && (
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
                                            <p className={cx('search-inner-footer-title')}>View all results</p>
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
                        )
                    ) : (
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
                </div>
            </div>
        </>
    );
}

export default SearchOnMobile;
