'use client';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '@/assets';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import SearchInner from '@/components/Tippy/SearchInner';
import Navbar from '../Navbar';
import SearchOnMoblie from '@/components/SearchOnMoblie';
import { useEffect, useRef, useState } from 'react';
import {
    BarsIcon,
    ChervonDonwIcon,
    ChervonLeft,
    ChervonMenu,
    ChervonRight,
    FacebookIcon,
    InstaIcon,
    MailTextIcon,
    PhoneIcon,
    PrinterestIcon,
    SearchIcon,
    XmarkIcon,
    YoutubeIcon,
} from '@/components/Icons';
import Tippy from '@tippyjs/react/headless';
import Login from '@/components/Auth/Login';
import CartTippy from '@/components/Tippy/CartTippy';
import { dataMenuNavBar } from '@/services/menuData/menuData';
import config from '@/config';
import { archivo } from '@/assets/FontNext';
import Link from 'next/link';
import routes from '@/config/routes';
import useWindowSize from '@/hooks/useWIndowSize';

const cx = classNames.bind(styles);

function Header() {
    const menuRef = useRef<any>(null);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showBars, setShowBars] = useState<boolean>(false);
    const [showShop, setShowShop] = useState<boolean>(false);
    const [showTippyLang, setShowTippyLang] = useState<boolean>(false);
    const [anoubarHidden, setAnoubarHidden] = useState<boolean>(false);
    const [classActive, setClassActive] = useState<any>('');
    const [toggleIndex, setToggleIndex] = useState<number | null>(null);
    const { width, height } = useWindowSize();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = () => {
        if (window.scrollY > 40) {
            setAnoubarHidden(true);
        } else {
            setAnoubarHidden(false);
        }
    };

    const dataMenuPanel = dataMenuNavBar;

    const handleToggle = (index: any) => {
        setToggleIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowBars(false);
        }
    };

    useEffect(() => {
        // Ẩn thông báo khi scroll
        const handleScroll = () => setAnoubarHidden(window.scrollY > 40);

        // Đóng menu khi click ra ngoài
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowBars(false);
            }
        };

        // Reset trạng thái showShop khi đóng menu
        if (!showBars) setShowShop(false);

        // Thêm event listener
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup khi unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showBars]);

    //Handle Calc Max Height
    const calculateMobileMenuHeight = () => {
        if (width !== null && height !== null) {
            if (width <= 396) {
                return anoubarHidden ? `${height - 85}px` : `${height - 112}px`;
            } else if (width <= 641) {
                return anoubarHidden ? `${height - 60}px` : `${height - 87}px`;
            } else if (width <= 999) {
                return anoubarHidden ? `${height - 78}px` : `${height - 117}px`;
            }
        }
    };

    return (
        <div className={cx('header-wrapper', showSearch && 'header--search-expanded')}>
            <header className={cx('header')}>
                <Container>
                    <div className={cx('header-inner')}>
                        {/* Menu Bars */}
                        <nav className={cx('header-bars')}>
                            <div style={{ position: 'relative' }}>
                                <BarsIcon
                                    style={{ width: '20px', height: '16px', cursor: 'pointer' }}
                                    className={cx('icon-bars', showBars && 'onhide')}
                                    onClick={() => setShowBars(true)}
                                />

                                <XmarkIcon
                                    style={{ width: '19px', height: '19px', cursor: 'pointer' }}
                                    className={cx('icon-xmark', showBars && 'onhide')}
                                />
                            </div>

                            {/* MENU MOBILE */}
                            <div
                                ref={menuRef}
                                className={cx('mobile-menu')}
                                style={
                                    showBars
                                        ? {
                                              visibility: 'visible',
                                              transform: 'scale(1)',
                                              opacity: '1',
                                              transition:
                                                  'opacity 0.4s cubic-bezier(0, 1, 0.4, 1), transform 0.4s cubic-bezier(0.18, 1.25, 0.4, 1),visibility 0.4s linear',
                                              maxHeight: calculateMobileMenuHeight(),
                                          }
                                        : {}
                                }
                            >
                                <div className={cx('mobile-menu-inner')} ref={wrapperRef}>
                                    <div className={cx('mobile-menu-panel')}>
                                        <div className={cx('mobile-menu-section')}>
                                            <ul className={cx('mobile-menu-section-list')}>
                                                {/* <li className={cx('mobile-menu-section-item')}>
                                                    <a href="/" className={cx('mobile-menu-section-item-link')}>
                                                        NGOÀI TRỜI
                                                    </a>
                                                </li> */}
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <button
                                                        className={`${cx(
                                                            'mobile-menu-section-item-button',
                                                            'static',
                                                        )} ${archivo.className}`}
                                                        onClick={() => setShowShop(!showShop)}
                                                    >
                                                        CỬA HÀNG
                                                        <ChervonRight />
                                                    </button>
                                                </li>

                                                <li className={cx('mobile-menu-section-item')}>
                                                    <Link
                                                        href={config.routes.news}
                                                        className={`${cx('mobile-menu-section-item-link')} ${
                                                            archivo.className
                                                        }`}
                                                        onClick={() => setShowBars(!showBars)}
                                                    >
                                                        TIN TỨC
                                                    </Link>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <Link
                                                        href={config.routesCompany.tradeIn}
                                                        className={`${cx('mobile-menu-section-item-link')} ${
                                                            archivo.className
                                                        }`}
                                                        onClick={() => setShowBars(!showBars)}
                                                    >
                                                        KHÁM PHÁ
                                                    </Link>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <Link
                                                        href={config.routesCompany.contact}
                                                        className={`${cx('mobile-menu-section-item-link')} ${
                                                            archivo.className
                                                        }`}
                                                        onClick={() => setShowBars(!showBars)}
                                                    >
                                                        LIÊN HỆ
                                                    </Link>
                                                </li>
                                                <li className={cx('mobile-menu-section-item')}>
                                                    <Link
                                                        href={config.routesCompany.aboutUs}
                                                        className={`${cx('mobile-menu-section-item-link')} ${
                                                            archivo.className
                                                        }`}
                                                        onClick={() => setShowBars(!showBars)}
                                                    >
                                                        VỀ CHÚNG TÔI
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={cx('mobile-menu-section-need-help')}>
                                            <p className={cx('mobile-menu-section-need-help-tile', archivo.className)}>
                                                BẠN CẦN HỖ TRỢ ?
                                            </p>
                                            <ul className={cx('mobile-menu-section-need-help-list')}>
                                                <li className={cx('mobile-menu-section-need-help-item')}>
                                                    <PhoneIcon className={cx('icon-iphone')} />
                                                    <a
                                                        href={routes.social.phone}
                                                        className={cx('mobile-menu-section-need-help-item-link')}
                                                    >
                                                        0348483612 - Em Lan
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-need-help-item')}>
                                                    <MailTextIcon className={cx('icon-mail')} />

                                                    <a
                                                        href={routes.social.mail}
                                                        className={cx('mobile-menu-section-need-help-item-link')}
                                                    >
                                                        dogotrieu@gmail.com
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={cx('mobile-menu-section-follow')}>
                                            <p className={cx('mobile-menu-section-follow-tile', archivo.className)}>
                                                THEO DÕI CHÚNG TÔI
                                            </p>

                                            <ul className={cx('mobile-menu-section-follow-list')}>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <a
                                                        href={routes.social.facebook}
                                                        className={cx('mobile-menu-section-follow-item-link')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="Facebook Đồ Gỗ Triệu"
                                                    >
                                                        <FacebookIcon className={cx('icon-social')} />
                                                        Facebook
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <a
                                                        href={routes.social.instagram}
                                                        className={cx('mobile-menu-section-follow-item-link')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="Instagram Đồ Gỗ Triệu"
                                                    >
                                                        <InstaIcon className={cx('icon-social')} />
                                                        Instagram
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <a
                                                        href={routes.social.printerest}
                                                        className={cx('mobile-menu-section-follow-item-link')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="Printerest Đồ Gỗ Triệu"
                                                    >
                                                        <PrinterestIcon className={cx('icon-social')} />
                                                        Pinterest
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <a
                                                        href={routes.social.youtube}
                                                        className={cx('mobile-menu-section-follow-item-link')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="Youtube Đồ Gỗ Triệu"
                                                    >
                                                        <YoutubeIcon className={cx('icon-social')} />
                                                        Youtube
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* -> SHOP PANEL */}
                                    <div
                                        className={cx('mobile-menu-panel-shop')}
                                        style={
                                            showShop
                                                ? {
                                                      visibility: 'visible',
                                                      transform: 'translateX(0)',
                                                  }
                                                : {
                                                      visibility: 'hidden',
                                                  }
                                        }
                                    >
                                        <div className={cx('mobile-menu-panel-shop-title')}>
                                            <button
                                                className={cx('mobile-menu-panel-shop-title-button')}
                                                onClick={() => setShowShop(!showShop)}
                                            >
                                                <ChervonLeft
                                                    className={cx('icon-mobile-menu-panel-shop-chervonleft')}
                                                />
                                                Back
                                            </button>
                                        </div>
                                        <div className={cx('mobile-menu-panel-shop-section')}>
                                            <div className={cx('mobile-menu-panel-shop-list')}>
                                                {dataMenuPanel.map((item, index) => (
                                                    <div className={cx('mobile-menu-panel-shop-item')} key={item.id}>
                                                        <button
                                                            className={cx('mobile-menu-panel-shop-item-toggle')}
                                                            onClick={() => handleToggle(index)}
                                                        >
                                                            <b className={archivo.className}>{item.title}</b>
                                                            <ChervonDonwIcon
                                                                className={cx(
                                                                    'icon-mobile-menu-panel-shop-chervondown',
                                                                    toggleIndex === index && 'active',
                                                                )}
                                                            />
                                                        </button>
                                                        <div
                                                            className={cx('mobile-menu-panel-shop-toggle-wrapper')}
                                                            style={
                                                                toggleIndex === index
                                                                    ? { height: `${item.height}px` }
                                                                    : { height: '0' }
                                                            }
                                                        >
                                                            <div className={cx('mobile-menu-panel-shop-toggle-menu')}>
                                                                <ul
                                                                    className={cx('mobile-menu-panel-shop-toggle-list')}
                                                                >
                                                                    {item?.subMenu.map((subMenuItem) => (
                                                                        <li
                                                                            className={cx(
                                                                                'mobile-menu-panel-shop-toggle-item',
                                                                            )}
                                                                            key={subMenuItem.link}
                                                                            onClick={() => setShowBars(false)}
                                                                        >
                                                                            <Link
                                                                                href={subMenuItem.link}
                                                                                className={cx(
                                                                                    'mobile-menu-panel-shop-toggle-link',
                                                                                )}
                                                                            >
                                                                                {subMenuItem.title}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={cx('mobile-menu-panel-shop-promo-item')}>
                                                <Link
                                                    href={routes.user.categoryAll}
                                                    className={cx('mobile-menu-panel-shop-promo-link')}
                                                >
                                                    <div
                                                        className={cx('mobile-menu-panel-shop-promo-wrapper')}
                                                        onClick={() => setShowBars(false)}
                                                    >
                                                        <div className={cx('aspect-ratio')}>
                                                            <Image
                                                                src={images.imgPromo}
                                                                alt="img-promo"
                                                                className={cx('mobile-menu-panel-shop-promo-image')}
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        <div className={cx('header-logo')}>
                            <Link href={config.routes.home} className={cx('header-logo-link')}>
                                <Image
                                    src={images.logo2}
                                    alt="logo"
                                    style={{
                                        maxWidth: '120px',
                                        height: 'auto',
                                        display: 'block',
                                        verticalAlign: 'middle',
                                        maxHeight: '100px',
                                    }}
                                />
                            </Link>
                        </div>

                        <div className={cx('header-search')}>
                            <SearchInner />
                        </div>

                        <div className={cx('header-action')}>
                            {/* Icon Language */}
                            <Tippy
                                interactive
                                visible={showTippyLang}
                                onClickOutside={() => setShowTippyLang(!showTippyLang)}
                                placement="bottom"
                                onShow={() => setClassActive('active')}
                                onHide={() => setClassActive('')}
                                animation={' transition: opacity 0.4s cubic-bezier(0, 1, 0.4, 1), transform;'}
                                render={(attrs: any) => (
                                    <div
                                        className={cx('popperover')}
                                        tabIndex="-1"
                                        {...attrs}
                                        style={!showTippyLang ? { display: 'none' } : {}}
                                    >
                                        <ChervonMenu className={cx('icon-chervon-menu')} />

                                        <div className={cx('wrapper-tippy', 'no-padding', classActive)}>
                                            <ul className={cx('language-change-list')}>
                                                <li className={cx('language-change-item')}>
                                                    <button>Vietnam</button>
                                                </li>
                                                {/* <li className={cx('language-change-item')}>
                                                    <button>English</button>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                offset={[-17, 5]}
                            >
                                <div
                                    className={cx('header-icon-map')}
                                    onClick={() => setShowTippyLang(!showTippyLang)}
                                    role="button"
                                    aria-label="Map"
                                >
                                    <span style={{ fontSize: '1.4rem' }}>🇻🇳</span>
                                    <ChervonDonwIcon
                                        style={{
                                            height: '15px',
                                            width: '18px',
                                            paddingLeft: '3px',
                                            fontSize: '1.2rem',
                                            marginBottom: '5px',
                                        }}
                                    />
                                </div>
                            </Tippy>
                            {/* Icon Search */}
                            <div className={cx('header-icon-search')} role="button" aria-label="Search Button">
                                <SearchIcon
                                    className={cx('header-icon-search-wrapper')}
                                    style={{ height: '15px', width: '18px', paddingLeft: '3px', fontSize: '1.2rem' }}
                                    onClick={() => setShowSearch(!showSearch)}
                                />
                            </div>
                            {/* Icon User */}
                            <div className={cx('header-icon-user')}>
                                <Login />
                            </div>
                            {/* Icon Cart */}
                            <div className={cx('header-icon-shopping')}>
                                <CartTippy />
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
