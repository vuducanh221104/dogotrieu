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

const cx = classNames.bind(styles);
function Navbar() {
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

    return (
        <nav className={cx('navbar')}>
            <div className={openSans.className}>
                <div className={cx('navbar-inner')}>
                    <Container>
                        <ul className={cx('navbar-list')}>
                            <li className={cx('navbar-item')}>
                                <a href="/" className={cx('navbar-item-link')}>
                                    IN STOCK
                                </a>
                            </li>
                            <li className={cx('navbar-item', 'static')}>
                                <a href="/" className={cx('navbar-item-link')}>
                                    SHOP
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
                                <a href="/" className={cx('navbar-item-link')}>
                                    NEW
                                </a>
                            </li>
                            <li className={cx('navbar-item')}>
                                <a href="/" className={cx('navbar-item-link')}>
                                    BLOG
                                </a>
                            </li>
                            <li className={cx('navbar-item')}>
                                <a href="/" className={cx('navbar-item-link')}>
                                    TRADE
                                </a>
                            </li>
                            <li className={cx('navbar-item')}>
                                <a href="/" className={cx('navbar-item-link')}>
                                    CONTACT
                                </a>
                            </li>
                            <li className={cx('navbar-item')}>
                                <a href="/" className={cx('navbar-item-link')}>
                                    SHOP THE LOOK
                                </a>
                            </li>
                        </ul>
                    </Container>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
