'use client';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './SearchOnMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

interface SearchOnMobileProps {
    showSearch: boolean;
}

const cx = classNames.bind(styles);

function SearchOnMobile({ showSearch }: SearchOnMobileProps) {
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            <div className={cx('header-search-on-moblie', close ? 'hide' : '', showSearch ? 'active' : '')}>
                <div className={cx('header-search-on-moblie-content')}>
                    <input className={cx('header-input')} placeholder="Search..." onFocus={() => setClose(false)} />
                    <button className={cx('button-search')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                    </button>
                </div>
                <div className={cx('on-fixed', close ? 'close' : '')}>
                    <div className={cx('search-wrapper-on-fixed')}>
                        <div className={cx('header-search-on-moblie-on-fixed')}>
                            <input className={cx('header-input')} placeholder="Search..." />

                            <button className={cx('button-search')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                            </button>
                            <button className={cx('button-clear')}>
                                <FontAwesomeIcon icon={faXmark} className={cx('icon-xmark')} />
                            </button>
                            {loading && (
                                <button className={cx('button-search')}>
                                    <FontAwesomeIcon className={cx('icon-loading')} icon={faSpinner} />
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
                    {/* RESULT */}
                    <div className={cx('wrapper-tippy')}>
                        <p className={cx('search-inner-title')}>products</p>

                        {!loading && (
                            <div className={cx('search-inner-list')}>
                                <a href="/" className={cx('search-inner-item')}>
                                    <div className={cx('search-inner-wrapper-image')}>
                                        <img
                                            src="https://woodfurniture.com/cdn/shop/products/DBOWD890014_120x120.png?v=1650554505"
                                            alt="image"
                                            className={cx('search-inner-image')}
                                        />
                                    </div>
                                    <div className={cx('search-inner-info')}>
                                        <p className={cx('search-inner-name')}>Textured Art Print | dBodhi </p>
                                        <span className={cx('search-inner-price')}>255$</span>
                                    </div>
                                </a>
                                <a className={cx('search-inner-item')}>
                                    <div className={cx('search-inner-wrapper-image')}>
                                        <img
                                            src="https://woodfurniture.com/cdn/shop/products/DBOWD890014_120x120.png?v=1650554505"
                                            alt="image"
                                            className={cx('search-inner-image')}
                                        />
                                    </div>
                                    <div className={cx('search-inner-info')}>
                                        <p className={cx('search-inner-name')}>Textured Art Print | dBodhi </p>
                                        <span className={cx('search-inner-price')}>255$</span>
                                    </div>
                                </a>
                                <a className={cx('search-inner-item')}>
                                    <div className={cx('search-inner-wrapper-image')}>
                                        <img
                                            src="https://woodfurniture.com/cdn/shop/products/DBOWD890014_120x120.png?v=1650554505"
                                            alt="image"
                                            className={cx('search-inner-image')}
                                        />
                                    </div>
                                    <div className={cx('search-inner-info')}>
                                        <p className={cx('search-inner-name')}>Textured Art Print | dBodhi </p>
                                        <span className={cx('search-inner-price')}>255$</span>
                                    </div>
                                </a>
                                <a className={cx('search-inner-item')}>
                                    <div className={cx('search-inner-wrapper-image')}>
                                        <img
                                            src="https://woodfurniture.com/cdn/shop/products/DBOWD890014_120x120.png?v=1650554505"
                                            alt="image"
                                            className={cx('search-inner-image')}
                                        />
                                    </div>
                                    <div className={cx('search-inner-info')}>
                                        <p className={cx('search-inner-name')}>Textured Art Print | dBodhi </p>
                                        <span className={cx('search-inner-price')}>255$</span>
                                    </div>
                                </a>
                            </div>
                        )}

                        {loading && (
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
                        )}

                        {!loading && (
                            <div className={cx('wrapper-search-inner-footer')}>
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
                        )}
                    </div>
                    {/* NEU KHONG CO GIA TRI TRA VE  NO RESUULT */}
                    {/* <div className={cx('no-result')}>
                        <p>No results matched</p>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default SearchOnMobile;
