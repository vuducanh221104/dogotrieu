'use client';

import classNames from 'classnames/bind';
import styles from './SearchInner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { SearchIcon, XmarkIcon } from '@/components/Icons';
import useDebounce from '@/hooks/useDebouce';
import { search } from '@/services/searchServices';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import slugify from 'slugify';
import { CldImage } from 'next-cloudinary';
import FormatPrice from '@/components/FormatPrice';
import { Product } from '@/types/client';
const cx = classNames.bind(styles);

function SearchInner() {
    const nameRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Product[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [trigger, setTrigger] = useState<number>(0);
    const debounced: any = useDebounce(searchValue, 500);
    // Handle Input
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value === '' || value.startsWith(' ')) {
            setLoading(false);
            setSearchResult([]);
            setSearchValue('');
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

    const handleOutside = () => {
        setShowResult(false);
    };

    const handleSearch = () => {
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

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    return (
        <div className={cx('wrapper-search-inner')}>
            <Tippy
                interactive
                visible={showResult || loading}
                placement="bottom"
                render={(attrs) => (
                    <div className={`${cx('search-result')} search-custom`} tabIndex={-1} {...attrs}>
                        {searchValue.length > 0 && (
                            <div className={cx('wrapper-tippy')}>
                                {loading ? (
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
                                ) : (
                                    <>
                                        <p className={cx('search-inner-title')}>sản phẩm</p>
                                        {searchResult?.length > 0 ? (
                                            <>
                                                <div className={cx('search-inner-list')}>
                                                    {searchResult.map((item) => (
                                                        <Link
                                                            href={`/products/${handleSlugify(item.name)}-${
                                                                item._id
                                                            }.html`}
                                                            className={cx('search-inner-item')}
                                                            key={item._id}
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
                                                                    {item.discount !== null &&
                                                                        item.price.discount !== 0 && (
                                                                            <p className={cx('product-price-discount')}>
                                                                                <FormatPrice
                                                                                    value={item.price.discount}
                                                                                />
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

                                                <div
                                                    className={cx('wrapper-search-inner-footer')}
                                                    onClick={() => router.push(`/search?q=${searchValue}`)}
                                                >
                                                    <p className={cx('search-inner-footer-title')}>
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
                                        ) : (
                                            <div className={cx('no-result')}>
                                                <p>Không có kết quả nào được tìm thấy</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
                onClickOutside={handleOutside}
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
                            placeholder="Search..."
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
