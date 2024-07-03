import { Open_Sans } from 'next/font/google';
const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['italic', 'normal'],
});
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Container } from 'react-bootstrap';
import Image from 'next/image';
import { ChervonDonwIcon, ChervonUpMenuIcon } from '@/components/Icons';
import images from '@/assets';
import { dataMenuNavBar } from '@/services/menuData/menuData';
import config from '@/config';
import Link from 'next/link';

const cx = classNames.bind(styles);
function Navbar() {
    const dataMenuPanel = dataMenuNavBar;

    return (
        <nav className={cx('navbar')}>
            <div className={openSans.className}>
                <div className={cx('navbar-inner')}>
                    <Container>
                        <ul className={cx('navbar-list')}>
                            <li className={cx('navbar-item', 'static')}>
                                <a href={config.routes.categoryAll} className={cx('navbar-item-link')}>
                                    CỬA HÀNG
                                    <ChervonDonwIcon style={{ height: '8px', width: '12px', marginLeft: '8px' }} />
                                    <ChervonUpMenuIcon className={cx('icon-menu-up')} />
                                </a>
                                <div className={cx('mega-menu')}>
                                    <Container>
                                        <div className={cx('mega-menu-inner')}>
                                            {dataMenuPanel.map((item, index) => (
                                                <div className={cx('mega-menu-column')}>
                                                    <a className={cx('mega-menu-title')}>
                                                        <b>{item.title}</b>
                                                    </a>
                                                    <ul className={cx('mega-menu-list')}>
                                                        {item.subMenu.map((subMenuItem) => (
                                                            <li className={cx('mega-menu-item')}>
                                                                <a
                                                                    href={subMenuItem.link}
                                                                    className={cx('mega-menu-item-link')}
                                                                >
                                                                    {subMenuItem.title}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}

                                            <a className={cx('mega-menu-promo')}>
                                                <div className={cx('mega-menu-image-wrapper')}>
                                                    <Image
                                                        src={images.imgPromo}
                                                        alt="img-promo"
                                                        className={cx('mega-menu-image-promo')}
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                    </Container>
                                </div>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link href={config.routes.news} className={cx('navbar-item-link')}>
                                    TIN TỨC
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link href={config.routesCompany.tradeIn} className={cx('navbar-item-link')}>
                                    GIAO DỊCH
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link href={config.routesCompany.contact} className={cx('navbar-item-link')}>
                                    LIÊN HỆ
                                </Link>
                            </li>
                            <li className={cx('navbar-item')}>
                                <Link href={config.routesCompany.aboutUs} className={cx('navbar-item-link')}>
                                    VỀ CHÚNG TÔI
                                </Link>
                            </li>
                        </ul>
                    </Container>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
