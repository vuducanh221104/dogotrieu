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
const cx = classNames.bind(styles);

function Header() {
    const menuRef = useRef<any>(null);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showBars, setShowBars] = useState<boolean>(false);
    const [showShop, setShowShop] = useState<boolean>(false);
    const [showTippyLang, setShowTippyLang] = useState<boolean>(false);

    const [classActive, setClassActive] = useState<any>('');
    const [toggleIndex, setToggleIndex] = useState(null);
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const updateDimensions = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [showBars]);

    const dataMenuPanel: IMenuPanel[] = [
        {
            id: 0,
            title: 'SEATING',
            subMenu: [
                { title: 'Accent Chairs', link: '/' },
                { title: 'Barstools', link: '/' },
                { title: 'Benches', link: '/' },
                { title: 'Dining Chairs', link: '/' },
                { title: 'Poufs & Stools', link: '/' },
            ],
            height: 190,
        },
        {
            id: 1,
            title: 'TABLES',
            subMenu: [
                { title: 'Coffee Tables', link: '/' },
                { title: 'Console Tables', link: '/' },
                { title: 'Desks', link: '/' },
                { title: 'Dining Tables', link: '/' },
                { title: 'Side Tables', link: '/' },
            ],
            height: 190,
        },
        {
            id: 2,
            title: 'STORAGE',
            subMenu: [
                { title: 'Bookcases', link: '/' },
                { title: 'Cabinets', link: '/' },
                { title: 'Dressers', link: '/' },
                { title: 'Media Units', link: '/' },
                { title: 'Sideboards', link: '/' },
            ],
            height: 190,
        },
        {
            id: 2,
            title: 'BED & BATH',
            subMenu: [
                { title: 'Bathroom', link: '/' },
                { title: 'Beds', link: '/' },
            ],
            height: 70,
        },
        {
            id: 3,
            title: 'LIGHTING',
            subMenu: [
                { title: 'Floor Lamps', link: '/' },
                { title: 'Table Lamps', link: '/' },
                { title: 'Wall Lamps', link: '/' },
                { title: 'Pendant Lights', link: '/' },
            ],
            height: 150,
        },
        {
            id: 4,
            title: 'DECOR',
            subMenu: [
                { title: 'Home Decor', link: '/' },
                { title: 'Chest', link: '/' },
            ],
            height: 70,
        },
    ];

    const handleToggle = (index: any) => {
        setToggleIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowBars(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('header-wrapper', showSearch && 'header--search-expanded')}>
            <header className={cx('header')}>
                <Container>
                    <div className={cx('header-inner')}>
                        {/* Menu Bars */}

                        <nav className={cx('header-bars')}>
                            {showBars ? (
                                <button className={cx('btn-bars')}>
                                    <XmarkIcon
                                        style={{ width: '19px', height: '19px' }}
                                        onClick={() => setShowBars(!showBars)}
                                    />
                                </button>
                            ) : (
                                <button className={cx('btn-bars')} onClick={() => setShowBars(!showBars)}>
                                    <BarsIcon
                                        style={{ width: '20px', height: '16px' }}
                                        onClick={() => setShowBars(!showBars)}
                                    />
                                </button>
                            )}
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
                                              maxHeight: width < 386 ? height - 117 : height - 93,
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
                                                    <button
                                                        className={cx('mobile-menu-section-item-button')}
                                                        onClick={() => setShowShop(!showShop)}
                                                    >
                                                        SHOP
                                                        <ChervonRight />
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
                                                    <PhoneIcon className={cx('icon-iphone')} />
                                                    <a
                                                        href="/"
                                                        className={cx('mobile-menu-section-need-help-item-link')}
                                                    >
                                                        (844) /443-WOOD/
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-need-help-item')}>
                                                    <MailTextIcon className={cx('icon-mail')} />

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
                                                    <FacebookIcon className={cx('icon-social')} />
                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Facebook
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <InstaIcon className={cx('icon-social')} />
                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Instagram
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <PrinterestIcon className={cx('icon-social')} />

                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Pinterest
                                                    </a>
                                                </li>
                                                <li className={cx('mobile-menu-section-follow-item')}>
                                                    <YoutubeIcon className={cx('icon-social')} />

                                                    <a href="/" className={cx('mobile-menu-section-follow-item-link')}>
                                                        Youtube
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* -> SHOP PANEL */}
                                    <div
                                        className={cx('mobile-menu-panel-shop')}
                                        style={showShop ? { transform: 'translateX(0)', visibility: 'visible' } : {}}
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
                                                    <div className={cx('mobile-menu-panel-shop-item')}>
                                                        <button
                                                            className={cx('mobile-menu-panel-shop-item-toggle')}
                                                            onClick={() => handleToggle(index)}
                                                        >
                                                            <b>{item.title}</b>
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
                                                                        >
                                                                            <a
                                                                                href={subMenuItem.link}
                                                                                className={cx(
                                                                                    'mobile-menu-panel-shop-toggle-link',
                                                                                )}
                                                                            >
                                                                                {subMenuItem.title}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={cx('mobile-menu-panel-shop-promo-item')}>
                                                <a href="/" className={cx('mobile-menu-panel-shop-promo-link')}>
                                                    <div className={cx('mobile-menu-panel-shop-promo-wrapper')}>
                                                        <div className={cx('aspect-ratio')}>
                                                            <Image
                                                                src={images.imgPromo}
                                                                alt="img-promo"
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
                                        <div className={cx('wrapper-tippy', 'no-padding', classActive)}>
                                            <ul className={cx('language-change-list')}>
                                                <li className={cx('language-change-item')}>
                                                    <button>Vietnam</button>
                                                </li>
                                                <li className={cx('language-change-item')}>
                                                    <button>English</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                offset={[0, 0]}
                            >
                                <div className={cx('header-icon-map')} onClick={() => setShowTippyLang(!showTippyLang)}>
                                    <span style={{ fontSize: '1.4rem' }}>🇺🇸</span>
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
                            <div className={cx('header-icon-search')}>
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
