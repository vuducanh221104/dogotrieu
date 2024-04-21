import { Open_Sans } from 'next/font/google';
const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['italic', 'normal'],
});
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const cx = classNames.bind(styles);
function Navbar() {
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
                                    <FontAwesomeIcon icon={faChevronDown} size="sm" className={cx('icon-down')} />
                                </a>
                                <div className={cx('mega-menu')}>
                                    <Container>
                                        <div className={cx('mega-menu-inner')}>
                                            <div className={cx('mega-menu-column')}>
                                                <a className={cx('mega-menu-title')}>
                                                    <b>SEATING</b>
                                                </a>
                                                <ul className={cx('mega-menu-list')}>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={cx('mega-menu-column')}>
                                                <a className={cx('mega-menu-title')}>
                                                    <b>SEATING</b>
                                                </a>
                                                <ul className={cx('mega-menu-list')}>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={cx('mega-menu-column')}>
                                                <a className={cx('mega-menu-title')}>
                                                    <b>SEATING</b>
                                                </a>
                                                <ul className={cx('mega-menu-list')}>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={cx('mega-menu-column')}>
                                                <a className={cx('mega-menu-title')}>
                                                    <b>SEATING</b>
                                                </a>
                                                <ul className={cx('mega-menu-list')}>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={cx('mega-menu-column')}>
                                                <a className={cx('mega-menu-title')}>
                                                    <b>SEATING</b>
                                                </a>
                                                <ul className={cx('mega-menu-list')}>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={cx('mega-menu-column')}>
                                                <a className={cx('mega-menu-title')}>
                                                    <b>SEATING</b>
                                                </a>
                                                <ul className={cx('mega-menu-list')}>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                    <li className={cx('mega-menu-item')}>
                                                        <a href="/" className={cx('mega-menu-item-link')}>
                                                            Accent Chairs
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <a className={cx('mega-menu-promo')}>
                                                <div className={cx('mega-menu-image-wrapper')}>
                                                    <img
                                                        src={
                                                            'https://woodfurniture.com/cdn/shop/files/351475737_6200426373358841_5029300433322005183_n_550x.jpg?v=1693995998'
                                                        }
                                                        alt="image-promo"
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
