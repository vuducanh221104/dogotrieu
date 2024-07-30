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
import routes from '@/config/routes';

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
                                <Link href={config.routes.categoryAll} className={cx('navbar-item-link')}>
                                    CỬA HÀNG
                                    <ChervonDonwIcon style={{ height: '8px', width: '12px', marginLeft: '8px' }} />
                                    <ChervonUpMenuIcon className={cx('icon-menu-up')} />
                                </Link>
                                <div className={cx('mega-menu')}>
                                    <Container>
                                        <div className={cx('mega-menu-inner')}>
                                            {dataMenuPanel.map((item) => (
                                                <div className={cx('mega-menu-column')} key={item.id}>
                                                    <Link className={cx('mega-menu-title')} href="#">
                                                        <b>{item.title}</b>
                                                    </Link>
                                                    <ul className={cx('mega-menu-list')}>
                                                        {item.subMenu.map((subMenuItem, indexSubMenuItem) => (
                                                            <li className={cx('mega-menu-item')} key={indexSubMenuItem}>
                                                                <Link
                                                                    href={subMenuItem.link}
                                                                    className={cx('mega-menu-item-link')}
                                                                >
                                                                    {subMenuItem.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}

                                            <Link className={cx('mega-menu-promo')} href={routes.imgPromo.navbar}>
                                                <div className={cx('mega-menu-image-wrapper')}>
                                                    <Image
                                                        src={images.imgPromo}
                                                        alt="img-promo"
                                                        className={cx('mega-menu-image-promo')}
                                                    />
                                                </div>
                                            </Link>
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
                                    THƯƠNG MẠI
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
