import classNames from 'classnames/bind';
import styles from './CartTippy.module.scss';
import { CartIcon, ChervonMenu, DecreaseIcon, IncreaseIcon } from '@/components/Icons';
import Tippy from '@tippyjs/react/headless';
import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { CldImage } from 'next-cloudinary';
import slugify from 'slugify';
import FormatPrice from '@/components/FormatPrice';
import { removeProduct, updateQuantity, updateTotalPrice } from '@/redux/cartSlice'; // Import the updateTotalPrice action
import routes from '@/config/routes';
import config from '@/config';

const cx = classNames.bind(styles);

function CartTippy() {
    const dispatch: AppDispatch = useDispatch();
    const productsAddToCart = useSelector((state: RootState) => state.cart);
    const scrollRef = useRef<any>(null);
    const [currentHeightRef, setCurrentHeightRef] = useState<number>(0);
    const [classActive, setClassActive] = useState<any>('');
    const [showMenu, setShowMenu] = useState<any>(false);
    const windowWidth = useWindowWidth();

    useLayoutEffect(() => {
        if (scrollRef.current) {
            setCurrentHeightRef(scrollRef.current.clientHeight);
        }

        const updateHeight = () => {
            if (scrollRef.current) {
                setCurrentHeightRef(scrollRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    //Handle Add To Cart
    const handleQuantityChange = (id: any, value: any) => {
        const quantity: any = value === '' ? '' : parseInt(value);
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleIncrease = (item: any, quantity: any) => {
        const itemId = item._id;
        if (item.quantity > quantity) {
            dispatch(updateQuantity({ id: itemId, quantity: quantity + 1 }));
            dispatch(updateTotalPrice());
        } else {
            return;
        }
    };

    const handleDecrease = (id: any, quantity: any) => {
        if (quantity > 1) {
            dispatch(updateQuantity({ id, quantity: quantity - 1 }));
            dispatch(updateTotalPrice());
        } else {
            dispatch(removeProduct({ id }));
            dispatch(updateTotalPrice());
        }
    };

    const handleBlur = (e: any, item: any) => {
        if (e.target.value === '') {
            handleQuantityChange(item._id, '1');
        } else if (e.target.value === '0') {
            dispatch(removeProduct({ id: item._id }));
        } else if (e.target.value > item.quantity) {
            handleQuantityChange(item._id, '1');
        }
        dispatch(updateTotalPrice());
    };
    const handleRemove = (item: any) => {
        dispatch(removeProduct({ id: item._id }));
        dispatch(updateTotalPrice());
    };

    return (
        <Tippy
            interactive
            visible={showMenu}
            placement="bottom"
            offset={windowWidth <= 641 ? [-500, 17] : [0, 15]}
            onClickOutside={() => setShowMenu(!showMenu)}
            onShow={() => setClassActive('active')}
            onHide={() => setClassActive('')}
            animation={' transition: opacity 0.7s cubic-bezier(0, 1, 0.4, 1), transform;'}
            render={(attrs: any) => (
                <div className={cx('popperover')} tabIndex="-1" {...attrs} style={!showMenu ? { display: 'none' } : {}}>
                    <ChervonMenu className={cx('icon-chervon-menu')} />
                    {productsAddToCart.products?.length > 0 ? (
                        <div className={cx('wrapper-tippy-have-product', classActive)}>
                            <div className={cx('mini-cart-content')}>
                                <div className={cx('inner')}>
                                    <div className={cx('mini-cart-title-wrapper')}>
                                        <p className={cx('title')}>Get free shipping!</p>
                                    </div>
                                    <ul className={cx('mini-cart-list')}>
                                        {productsAddToCart.products.map((item: any) => (
                                            <li className={cx('mini-cart-item')} key={item._id}>
                                                <div className={cx('mini-cart-image-wrapper')}>
                                                    <div className={cx('aspect-ratio')}>
                                                        <Link
                                                            href={`/products/${handleSlugify(item.name)}-${
                                                                item._id
                                                            }.html`}
                                                        >
                                                            <div className={cx('aspect-ratio')}>
                                                                <CldImage
                                                                    width="80"
                                                                    height="80"
                                                                    alt={item.name}
                                                                    src={item.thumb}
                                                                    loading="lazy"
                                                                    className={cx('image-cloudinary')}
                                                                />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className={cx('mini-cart-item-wrapper')}>
                                                    <div className={cx('mini-cart-product-info')}>
                                                        <h4 className={cx('mini-cart-product-info-vendor')}>
                                                            {item.material_id &&
                                                                item.material_id?.map(
                                                                    (material: any, index: number) => (
                                                                        <Link
                                                                            href={`/products/${handleSlugify(
                                                                                item.name,
                                                                            )}-${item._id}.html`}
                                                                            key={index}
                                                                        >
                                                                            {index !== 0 && ', '}
                                                                            {material.name}
                                                                        </Link>
                                                                    ),
                                                                )}
                                                        </h4>
                                                        <Link
                                                            href={`/products/${handleSlugify(item.name)}-${
                                                                item._id
                                                            }.html`}
                                                            className={cx('mini-cart-product-info-name')}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <div
                                                            className={cx(
                                                                'product-price-wrapper',
                                                                item.price.discount !== null &&
                                                                    item.price.discount !== 0 &&
                                                                    'have-price-discount',
                                                            )}
                                                        >
                                                            {item.discount !== null && item.price.discount !== 0 && (
                                                                <p className={cx('product-price-discount')}>
                                                                    <FormatPrice value={item.price.discount} />
                                                                </p>
                                                            )}
                                                            <p className={cx('product-price-real')}>
                                                                <FormatPrice value={item.price.original} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('mini-cart-item-quantity')}>
                                                    <div className={cx('quantity-selector')}>
                                                        <button
                                                            className={cx('quantity-selector-button')}
                                                            onClick={() =>
                                                                handleDecrease(item._id, item.quantityAddToCart)
                                                            }
                                                        >
                                                            <DecreaseIcon className={cx('icon-decrease')} />
                                                        </button>
                                                        <input
                                                            className={cx('quantity-selector-value')}
                                                            value={item.quantityAddToCart}
                                                            onChange={(e) =>
                                                                handleQuantityChange(item._id, e.target.value)
                                                            }
                                                            onBlur={(e) => handleBlur(e, item)}
                                                        />
                                                        <button
                                                            className={cx('quantity-selector-button')}
                                                            onClick={() => handleIncrease(item, item.quantityAddToCart)}
                                                        >
                                                            <IncreaseIcon className={cx('icon-increase')} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        className={cx('btn-remove')}
                                                        onClick={() => handleRemove(item)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={cx('mini-cart-item-footer')}>
                                    <div className={cx('mini-cart-item-total-price')}>
                                        <span>Total</span>
                                        <span>
                                            <FormatPrice value={productsAddToCart.totalPrice} />
                                        </span>
                                    </div>
                                    <div className={cx('mini-cart-item-button-container')}>
                                        <div className={cx('mini-cart-item-button-action')}>
                                            <Link href={config.routes.cart} className={cx('button-view-cart')}>
                                                View cart
                                            </Link>
                                            <a href={config.routes.cart} className={cx('button-check-out')}>
                                                Checkout
                                            </a>
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
                <CartIcon style={{ height: '24px', width: '27px', cursor: 'pointer' }} />
                <span className={cx('header-count')}>{productsAddToCart.quantity}</span>
            </div>
        </Tippy>
    );
}

export default CartTippy;
