import classNames from 'classnames/bind';
import styles from './CartTippy.module.scss';
import { CartIcon, DecreaseIcon, IncreaseIcon } from '@/components/Icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function CartTippy() {
    const [classActive, setClassActive] = useState<any>('');
    const [showMenu, setShowMenu] = useState<any>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        setWindowWidth(window.innerWidth);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const cartQuanity = 1;
    return (
        <>
            <Tippy
                interactive
                visible={showMenu}
                placement="bottom"
                offset={windowWidth <= 641 ? [-500, 17] : [0, 0]}
                onClickOutside={() => setShowMenu(!showMenu)}
                onShow={() => setClassActive('active')}
                onHide={() => setClassActive('')}
                animation={' transition: opacity 0.7s cubic-bezier(0, 1, 0.4, 1), transform;'}
                render={(attrs: any) => (
                    <div className={cx('popperover')} tabIndex="-1" {...attrs}>
                        {cartQuanity > 0 ? (
                            <div className={cx('wrapper-tippy-have-product', classActive)}>
                                <div className={cx('mini-cart-content')}>
                                    <div className={cx('mini-cart-title-wrapper')}>
                                        <p className={cx('title')}>Get free shipping!</p>
                                    </div>
                                    <ul className={cx('mini-cart-list')}>
                                        <li className={cx('mini-cart-item')}>
                                            <div className={cx('mini-cart-image-wrapper')}>
                                                <div className={cx('aspect-ratio')}>
                                                    <img
                                                        src="https://woodfurniture.com/cdn/shop/files/BLA02-091-01_3980797_5d0c21f1-8818-48ae-b471-e2f418eed312_180x.png?v=1712575660"
                                                        alt="image-product"
                                                        className={cx('image-product')}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('mini-cart-item-wrapper')}>
                                                <div className={cx('mini-cart-product-info')}>
                                                    <a className={cx('mini-cart-product-info-vendor')}>Bolia</a>
                                                    <a className={cx('mini-cart-product-info-name')}>
                                                        Flat Woven Swivel Armchair | Bolia Saga - Satin lacquered steel
                                                        / Light beige
                                                    </a>
                                                    <div className={cx('mini-cart-price')}>
                                                        <span>$3,255.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('mini-cart-item-quantity')}>
                                                <div className={cx('quantity-selector')}>
                                                    <button className={cx('quantity-selector-button')}>
                                                        <DecreaseIcon className={cx('icon-decrease')} />
                                                    </button>
                                                    <input className={cx('quantity-selector-value')} value={'2'} />
                                                    <button className={cx('quantity-selector-button')}>
                                                        <IncreaseIcon className={cx('icon-increase')} />
                                                    </button>
                                                </div>
                                                <button className={cx('btn-remove')}>Remove</button>
                                            </div>
                                        </li>
                                        <li className={cx('mini-cart-item')}>
                                            <div className={cx('mini-cart-image-wrapper')}>
                                                <div className={cx('aspect-ratio')}>
                                                    <img
                                                        src="https://woodfurniture.com/cdn/shop/files/BLA02-091-01_3980797_5d0c21f1-8818-48ae-b471-e2f418eed312_180x.png?v=1712575660"
                                                        alt="image-product"
                                                        className={cx('image-product')}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('mini-cart-item-wrapper')}>
                                                <div className={cx('mini-cart-product-info')}>
                                                    <a className={cx('mini-cart-product-info-vendor')}>Bolia</a>
                                                    <a className={cx('mini-cart-product-info-name')}>
                                                        Flat Woven Swivel Armchair | Bolia Saga - Satin lacquered steel
                                                        / Light beige
                                                    </a>
                                                    <div className={cx('mini-cart-price')}>
                                                        <span>$3,255.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('mini-cart-item-quantity')}>
                                                <div className={cx('quantity-selector')}>
                                                    <button className={cx('quantity-selector-button')}>
                                                        <DecreaseIcon className={cx('icon-decrease')} />
                                                    </button>
                                                    <input className={cx('quantity-selector-value')} value={'2'} />
                                                    <button className={cx('quantity-selector-button')}>
                                                        <IncreaseIcon className={cx('icon-increase')} />
                                                    </button>
                                                </div>
                                                <button className={cx('btn-remove')}>Remove</button>
                                            </div>
                                        </li>
                                        <li className={cx('mini-cart-item')}>
                                            <div className={cx('mini-cart-image-wrapper')}>
                                                <div className={cx('aspect-ratio')}>
                                                    <img
                                                        src="https://woodfurniture.com/cdn/shop/files/BLA02-091-01_3980797_5d0c21f1-8818-48ae-b471-e2f418eed312_180x.png?v=1712575660"
                                                        alt="image-product"
                                                        className={cx('image-product')}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('mini-cart-item-wrapper')}>
                                                <div className={cx('mini-cart-product-info')}>
                                                    <a className={cx('mini-cart-product-info-vendor')}>Bolia</a>
                                                    <a className={cx('mini-cart-product-info-name')}>
                                                        Flat Woven Swivel Armchair | Bolia Saga - Satin lacquered steel
                                                        / Light beige
                                                    </a>
                                                    <div className={cx('mini-cart-price')}>
                                                        <span>$3,255.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('mini-cart-item-quantity')}>
                                                <div className={cx('quantity-selector')}>
                                                    <button className={cx('quantity-selector-button')}>
                                                        <DecreaseIcon className={cx('icon-decrease')} />
                                                    </button>
                                                    <input className={cx('quantity-selector-value')} value={'2'} />
                                                    <button className={cx('quantity-selector-button')}>
                                                        <IncreaseIcon className={cx('icon-increase')} />
                                                    </button>
                                                </div>
                                                <button className={cx('btn-remove')}>Remove</button>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={cx('mini-cart-item-footer')}>
                                        <div className={cx('mini-cart-item-total-price')}>
                                            <span>Total</span>
                                            <span>$14,590.00</span>
                                        </div>
                                        <div className={cx('mini-cart-item-button-container')}>
                                            <div className={cx('mini-cart-item-button-action')}>
                                                <a className={cx('button-view-cart')}>View cart</a>
                                                <a className={cx('button-check-out')}>Checkout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('wrapper-tippy', classActive)}>
                                <div className={cx('mini-cart')}>
                                    <p className={cx('mini-cart-tile')}>Get free shipping!</p>
                                    <div className={cx('mini-cart-empty')}>
                                        <CartIcon className={cx('mini-cart-empty-icon')} />
                                        <p className={cx('mini-cart-empty-heading')}>Your cart is empty</p>
                                    </div>
                                    <a href="/" className={cx('btn-sumbit-link')}>
                                        Shop our products
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            >
                <div onClick={() => setShowMenu(!showMenu)}>
                    <CartIcon style={{ height: '24px', width: '27px' }} />
                    <span className={cx('header-count')}>0</span>
                </div>
            </Tippy>
        </>
    );
}

export default CartTippy;
