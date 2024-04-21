'use client';
import images from '@/assets';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import {
    faShoppingCart,
    faUser,
    faEarthAmerica,
    faChevronDown,
    faBars,
    faSearch,
    faPhone,
    faEnvelopeOpenText,
    faClose,
    faChevronRight,
    faChevronLeft,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import SearchInner from '@/components/Tippy/SearchInner';
import Navbar from '../Navbar';
import SearchOnMoblie from '@/components/SearchOnMoblie';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showBars, setShowBars] = useState<boolean>(false);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [showBars]);
    const menuHeightPrev = height - 105;
    const menuHeightReal = height * 0.04;

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Container>
                    test
                    <div className={cx('header-inner')}>
                        <nav className={cx('header-bars')}>
                            {showBars ? (
                                <button className={cx('btn-bars')}>
                                    <FontAwesomeIcon
                                        icon={faClose}
                                        className={cx('icon-bars')}
                                        onClick={() => setShowBars(!showBars)}
                                    />
                                </button>
                            ) : (
                                <button className={cx('btn-bars')} onClick={() => setShowBars(!showBars)}>
                                    <FontAwesomeIcon icon={faBars} className={cx('icon-bars')} />
                                </button>
                            )}
                            {/* MENU MOBILE */}
                            <div
                                className={cx('mobile-menu')}
                                style={
                                    showBars
                                        ? {
                                              visibility: 'visible',
                                              transform: 'scale(1)',
                                              opacity: '1',
                                              transition:
                                                  'opacity 0.4s cubic-bezier(0, 1, 0.4, 1), transform 0.4s cubic-bezier(0.18, 1.25, 0.4, 1),visibility 0.4s linear',
                                              maxHeight: menuHeightPrev - menuHeightReal,
                                          }
                                        : {}
                                }
                            >
                                <div className={cx('mobile-menu-inner')}>
                                    <div className={cx('mobile-menu-panel')}>
                                        <div className={cx('mobile-menu-section')}>
                                            <ul className={cx('mobile-menu-section-list')}>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <a href="/" className={cx('mobile-menu-section-item-link')}>
                                                        IN STOCK
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <a href="/" className={cx('mobile-menu-section-item-link')}>
                                                        OUDOOR
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <button className={cx('mobile-menu-section-item-button')}>
                                                        SHOP
                                                        <FontAwesomeIcon icon={faChevronRight} />
                                                    </button>
                                                </li>

                                                <li className={cx('mobile-menu-section-item')}>
                                                    <a href="/" className={cx('mobile-menu-section-item-link')}>
                                                        NEW
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <a href="/" className={cx('mobile-menu-section-item-link')}>
                                                        BLOG
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <a href="/" className={cx('mobile-menu-section-item-link')}>
                                                        TRADE
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <a href="/" className={cx('mobile-menu-section-item-link')}>
                                                        CONTACT
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={cx('mobile-menu-section-need-help')}>
                                            <p className={cx('mobile-menu-section-need-help-tile')}> NEED HELP?</p>
                                            <ul className={cx('mobile-menu-section-need-help-list')}>
                                                <li className={cx('mobile-menu-section-need-help-item')}>
                                                    <FontAwesomeIcon icon={faPhone} className={cx('icon-iphone')} />
                                                    <a
                                                        href="/"
                                                        className={cx('mobile-menu-section-need-help-item-link')}
                                                    >
                                                        (844) /443-WOOD/
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-need-help-item')}>
                                                    <FontAwesomeIcon
                                                        icon={faEnvelopeOpenText}
                                                        className={cx('icon-mail')}
                                                    />

                                                    <a
                                                        href="/"
                                                        className={cx('mobile-menu-section-need-help-item-link')}
                                                    >
                                                        info@woodfurniture.com
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={cx('mobile-menu-section-follow')}>
                                            <p className={cx('mobile-menu-section-follow-tile')}> FOLLOW US</p>

                                            <ul className={cx('mobile-menu-section-follow-list')}>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <FontAwesomeIcon icon={faFacebook} className={cx('icon-social')} />
                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Facebook
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <FontAwesomeIcon icon={faFacebook} className={cx('icon-social')} />
                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Instagram
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <FontAwesomeIcon icon={faFacebook} className={cx('icon-social')} />

                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Pinterest
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <FontAwesomeIcon icon={faFacebook} className={cx('icon-social')} />

                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Youtube
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* -> SHOP PANEL */}
                                    <div className={cx('mobile-menu-panel-shop')}>
                                        <div className={cx('mobile-menu-panel-shop-title')}>
                                            <button className={cx('mobile-menu-panel-shop-title-button')}>
                                                <FontAwesomeIcon
                                                    icon={faChevronLeft}
                                                    className={cx('icon-mobile-menu-panel-shop-chervonleft')}
                                                />
                                                Back
                                            </button>
                                        </div>
                                        <div className={cx('mobile-menu-panel-shop-section')}>
                                            <div className={cx('mobile-menu-panel-shop-list')}>
                                                <div className={cx('mobile-menu-panel-shop-item')}>
                                                    <button className={cx('mobile-menu-panel-shop-item-toggle')}>
                                                        <b>SEATING</b>
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                            className={cx('icon-mobile-menu-panel-shop-chervondown')}
                                                        />
                                                        {/* <FontAwesomeIcon
                                                            icon={faChevronUp}
                                                            className={cx('icon-mobile-menu-panel-shop-chervonup')}
                                                        /> */}
                                                    </button>
                                                    <div className={cx('mobile-menu-panel-shop-toggle-wrapper')}>
                                                        <div className={cx('mobile-menu-panel-shop-toggle-menu')}>
                                                            <ul className={cx('mobile-menu-panel-shop-toggle-list')}>
                                                                <li
                                                                    className={cx('mobile-menu-panel-shop-toggle-item')}
                                                                >
                                                                    <a
                                                                        href="/"
                                                                        className={cx(
                                                                            'mobile-menu-panel-shop-toggle-link',
                                                                        )}
                                                                    >
                                                                        Accent Chairs
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className={cx('mobile-menu-panel-shop-toggle-item')}
                                                                >
                                                                    <a
                                                                        href="/"
                                                                        className={cx(
                                                                            'mobile-menu-panel-shop-toggle-link',
                                                                        )}
                                                                    >
                                                                        Barstools
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className={cx('mobile-menu-panel-shop-toggle-item')}
                                                                >
                                                                    <a
                                                                        href="/"
                                                                        className={cx(
                                                                            'mobile-menu-panel-shop-toggle-link',
                                                                        )}
                                                                    >
                                                                        Benches
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className={cx('mobile-menu-panel-shop-toggle-item')}
                                                                >
                                                                    <a
                                                                        href="/"
                                                                        className={cx(
                                                                            'mobile-menu-panel-shop-toggle-link',
                                                                        )}
                                                                    >
                                                                        Dining Chairs
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className={cx('mobile-menu-panel-shop-toggle-item')}
                                                                >
                                                                    <a
                                                                        href="/"
                                                                        className={cx(
                                                                            'mobile-menu-panel-shop-toggle-link',
                                                                        )}
                                                                    >
                                                                        Poufs & Stools
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('mobile-menu-panel-shop-promo-item')}>
                                                <a href="/" className={cx('mobile-menu-panel-shop-promo-link')}>
                                                    <div className={cx('mobile-menu-panel-shop-promo-wrapper')}>
                                                        <div className={cx('aspect-ratio')}>
                                                            <img
                                                                src="https://woodfurniture.com/cdn/shop/files/351475737_6200426373358841_5029300433322005183_n_550x.jpg?v=1693995998"
                                                                alt="image-promo"
                                                                className={cx('mobile-menu-panel-shop-promo-image')}
                                                            />
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className={cx('header-logo')}>
                            <a href="/" className={cx('header-logo-link')}>
                                <Image
                                    src={images.logo}
                                    alt="logo"
                                    style={{
                                        maxWidth: '120px',
                                        height: 'auto',
                                        display: 'block',
                                        verticalAlign: 'middle',
                                        maxHeight: '100px',
                                    }}
                                />
                            </a>
                        </div>

                        <div className={cx('header-search')}>
                            <SearchInner />
                        </div>
                        <div className={cx('header-action')}>
                            <div className={cx('header-icon-map')}>
                                <FontAwesomeIcon
                                    icon={faEarthAmerica}
                                    size="sm"
                                    style={{ height: '15px', width: '15px' }}
                                />
                                <FontAwesomeIcon
                                    icon={faChevronUp}
                                    size="sm"
                                    style={{ height: '15px', width: '15px', paddingLeft: '3px' }}
                                />
                            </div>
                            <div className={cx('header-icon-search')}>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className={cx('header-icon-search-wrapper')}
                                    onClick={() => setShowSearch(!showSearch)}
                                />
                            </div>
                            <div className={cx('header-icon-user')}>
                                <FontAwesomeIcon icon={faUser} size="sm" style={{ height: '22px', width: '20px' }} />
                            </div>
                            <div className={cx('header-icon-shopping')}>
                                <FontAwesomeIcon
                                    icon={faShoppingCart}
                                    size="sm"
                                    style={{ height: '24px', width: '27px' }}
                                />
                                <span className={cx('header-count')}>0</span>
                            </div>
                        </div>
                    </div>
                </Container>
                {/* Navbar */}
                <Navbar />
            </header>
            <SearchOnMoblie showSearch={showSearch} />
        </div>
    );
}

export default Header;
