'use client';
import classNames from 'classnames/bind';
import styles from './CartTippy.module.scss';
import { CartIcon, ChervonMenu, DecreaseIcon, IncreaseIcon, XmarkIcon } from '@/components/Icons';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { CldImage } from 'next-cloudinary';
import slugify from 'slugify';
import FormatPrice from '@/components/FormatPrice';
import { removeProduct, updateQuantity, updateTotalPrice } from '@/redux/cartSlice'; // Import the updateTotalPrice action
import routes from '@/config/routes';
import config from '@/config';
import { archivo } from '@/assets/FontNext';

const cx = classNames.bind(styles);

function CartTippy() {
    const dispatch: AppDispatch = useDispatch();
    const productsAddToCart = useSelector((state: RootState) => state.cart);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const [isMounted, setIsMounted] = useState(false);

    const tippyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tippyRef.current && !tippyRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        // Lắng nghe sự kiện click trên document
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Cleanup khi component bị unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [tippyRef]);

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

    if (!isMounted) {
        return (
            <div role="button" aria-label="Cart Button">
                <CartIcon style={{ height: '24px', width: '27px', cursor: 'pointer' }} />
                <span className={cx('header-count')}>0</span>
            </div>
        );
    }
    return (
        <div className="wrapper-cart-tippy">
            <div role="button" aria-label="Cart Button" className={cx('btn-cart')}>
                <div onClick={() => setShowMenu(true)}>
                    <CartIcon
                        style={{ height: '24px', width: '27px', cursor: 'pointer' }}
                        className={cx('icon-cart', showMenu && 'onhide')}
                    />
                    <span className={cx('header-count', showMenu && 'onhide')}>{productsAddToCart?.quantity}</span>
                </div>
                <XmarkIcon
                    style={{
                        height: '24px',
                        width: '27px',
                        cursor: 'pointer',
                    }}
                    className={cx('icon-xmark', showMenu && 'onhide')}
                    onClick={() => setShowMenu(false)}
                />
            </div>
            <div className={cx('wrapper-tippy', showMenu && 'active')} ref={tippyRef}>
                <ChervonMenu className={cx('icon-chervon-menu')} />
                {productsAddToCart.products?.length > 0 ? (
                    <div className={cx('wrapper-content')}>
                        <div className={cx('mini-cart-content')}>
                            <div className={cx('inner')}>
                                <div className={cx('mini-cart-title-wrapper')}>
                                    <p className={cx('title', archivo.className)}>Vận chuyển miễn phí!</p>
                                </div>
                                <ul className={cx('mini-cart-list')}>
                                    {productsAddToCart.products.map((item: any) => (
                                        <li className={cx('mini-cart-item')} key={item._id}>
                                            <div
                                                className={cx('mini-cart-image-wrapper')}
                                                onClick={() => setShowMenu(false)}
                                            >
                                                <div className={cx('aspect-ratio')}>
                                                    <Link
                                                        href={`/products/${handleSlugify(item.name)}-${item._id}.html`}
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
                                                    <h4
                                                        className={cx(
                                                            'mini-cart-product-info-vendor',
                                                            archivo.className,
                                                        )}
                                                        onClick={() => setShowMenu(false)}
                                                    >
                                                        {item.material_id &&
                                                            item.material_id?.map((material: any, index: number) => (
                                                                <Link
                                                                    href={`/products/${handleSlugify(item.name)}-${
                                                                        item._id
                                                                    }.html`}
                                                                    key={index}
                                                                >
                                                                    {index !== 0 && ', '}
                                                                    {material.name}
                                                                </Link>
                                                            ))}
                                                    </h4>
                                                    <Link
                                                        href={`/products/${handleSlugify(item.name)}-${item._id}.html`}
                                                        className={cx('mini-cart-product-info-name')}
                                                        onClick={() => setShowMenu(false)}
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
                                                        {item.price.discount !== null && item.price.discount !== 0 && (
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
                                                        onClick={() => handleDecrease(item._id, item.quantityAddToCart)}
                                                    >
                                                        <DecreaseIcon className={cx('icon-decrease')} />
                                                    </button>
                                                    <input
                                                        className={cx('quantity-selector-value')}
                                                        value={item.quantityAddToCart}
                                                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                                        onBlur={(e) => handleBlur(e, item)}
                                                    />
                                                    <button
                                                        className={cx('quantity-selector-button')}
                                                        onClick={() => handleIncrease(item, item.quantityAddToCart)}
                                                    >
                                                        <IncreaseIcon className={cx('icon-increase')} />
                                                    </button>
                                                </div>
                                                <button className={cx('btn-remove')} onClick={() => handleRemove(item)}>
                                                    Xóa
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={cx('mini-cart-item-footer')}>
                                <div className={cx('mini-cart-item-total-price')}>
                                    <span className={cx(`${archivo.className}`)}>Tổng Cộng</span>
                                    <span>
                                        <FormatPrice value={productsAddToCart.totalPrice} />
                                    </span>
                                </div>
                                <div className={cx('mini-cart-item-button-container')}>
                                    <div className={cx('mini-cart-item-button-action')}>
                                        <Link
                                            href={config.routes.cart}
                                            className={cx('button-view-cart')}
                                            onClick={() => setShowMenu(false)}
                                        >
                                            Xem Giỏ Hàng
                                        </Link>
                                        <Link
                                            href={config.routes.cart}
                                            className={cx('button-check-out')}
                                            onClick={() => setShowMenu(false)}
                                        >
                                            Thanh Toán
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('wrapper-content')}>
                        <p className={cx('mini-cart-tile', archivo.className)}>Vận chuyển miễn phí!</p>
                        <div className={cx('mini-cart-empty')}>
                            <CartIcon className={cx('mini-cart-empty-icon')} />
                            <p className={cx('mini-cart-empty-heading')}>Giỏ hàng của bạn đang trống</p>
                        </div>
                        <Link
                            href={routes.user.home}
                            className={cx('btn-sumbit-link')}
                            onClick={() => setShowMenu(false)}
                        >
                            Mua sản phẩm của chúng tôi
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartTippy;
