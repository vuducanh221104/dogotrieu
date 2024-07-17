'use client';
import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '@/styles/Cart.module.scss';
import { archivo } from '@/assets/FontNext';
import FormatPrice from '@/components/FormatPrice';
import { DecreaseIcon, IncreaseIcon } from '@/components/Icons';

import { useDispatch, useSelector } from 'react-redux';
import slugify from 'slugify';
import { removeProduct, updateQuantity, updateTotalPrice } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import CartEmpty from '@/components/CartEmpty';

const cx = classNames.bind(styles);

function PageCart() {
    const dispatch = useDispatch();
    const productsAddToCart: any = useSelector((state: RootState) => state.cart);
    const [localQuantities, setLocalQuantities] = useState<{ [key: string]: number | string }>({});

    useEffect(() => {
        const initialQuantities = productsAddToCart.products.reduce((acc: any, product: any) => {
            acc[product._id] = product.quantityAddToCart;
            return acc;
        }, {});
        setLocalQuantities(initialQuantities);
    }, [productsAddToCart.products]);

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    const handleQuantityChange = (id: any, value: any) => {
        setLocalQuantities((prev) => ({ ...prev, [id]: value }));
    };

    const handleIncrease = (item: any, quantity: any) => {
        const itemId = item._id;
        if (item.quantity > quantity) {
            const newQuantity = quantity + 1;
            setLocalQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
            dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
            dispatch(updateTotalPrice());
        }
    };

    const handleDecrease = (id: any, quantity: any) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setLocalQuantities((prev) => ({ ...prev, [id]: newQuantity }));
            dispatch(updateQuantity({ id, quantity: newQuantity }));
            dispatch(updateTotalPrice());
        } else {
            dispatch(removeProduct({ id }));
            dispatch(updateTotalPrice());
        }
    };

    const handleBlur = (e: any, item: any) => {
        const value = e.target.value;
        if (value === '' || parseInt(value) === 0) {
            dispatch(removeProduct({ id: item._id }));
        } else if (parseInt(value) > item.quantity) {
            setLocalQuantities((prev) => ({ ...prev, [item._id]: item.quantity }));
            dispatch(updateQuantity({ id: item._id, quantity: item.quantity }));
        } else {
            dispatch(updateQuantity({ id: item._id, quantity: parseInt(value) }));
        }
        dispatch(updateTotalPrice());
    };

    const handleRemove = (item: any) => {
        dispatch(removeProduct({ id: item._id }));
        dispatch(updateTotalPrice());
    };
    if (productsAddToCart.products.length <= 0 || null) {
        return <CartEmpty />;
    } else {
    }
    return (
        <div className={cx('page-cart')}>
            <section className={cx('page-cart-section')}>
                <Container>
                    <header className={cx('page-cart-header')}>
                        <h1 className={`${cx('page-cart-title')} heading h1 ${archivo.className}`}>My cart</h1>
                        <p className={cx('page-cart-description')}>You are eligible for free shipping!</p>
                    </header>
                </Container>
                <div className={cx('cart-wrapper')}>
                    <div className={cx('cart-wrapper-inner')}>
                        <div className={cx('cart-wrapper-inner-inner')}>
                            <Container className={'container-flush'}>
                                <div className={cx('card')}>
                                    <div className={cx('table-wrapper')}>
                                        <table className={cx('line-item-table')}>
                                            <thead className={cx('thead', 'hidden-phone')}>
                                                <tr>
                                                    <th>Product</th>
                                                    <th className={cx('table-cell-center')}>Quantity</th>
                                                    <th className={cx('table-cell-right')}>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className={cx('tbody')}>
                                                {productsAddToCart.products.map((item: any) => (
                                                    <tr key={item._id}>
                                                        <td className={cx('line-item-product-info')}>
                                                            <div className={cx('line-item-product-info-wrapper')}>
                                                                <div className={cx('line-item-image-wrapper')}>
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
                                                                </div>
                                                                <div className={cx('line-item-meta')}>
                                                                    <div className={cx('cart-product-info-vendor')}>
                                                                        {item.material_id &&
                                                                            item.material_id?.map(
                                                                                (material: any, index: number) => (
                                                                                    <Link
                                                                                        key={index}
                                                                                        href={`/products/${handleSlugify(
                                                                                            item.name,
                                                                                        )}-${item._id}.html`}
                                                                                        className={cx(
                                                                                            'line-item-vendor-link',
                                                                                        )}
                                                                                    >
                                                                                        {index !== 0 && ', '}
                                                                                        {material.name}
                                                                                    </Link>
                                                                                ),
                                                                            )}
                                                                    </div>

                                                                    <Link
                                                                        href={`/products/${handleSlugify(item.name)}-${
                                                                            item._id
                                                                        }.html`}
                                                                        className={cx('line-item-title-link')}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                    <div className={cx('line-item-price-list')}>
                                                                        <div
                                                                            className={cx(
                                                                                'product-price-wrapper',
                                                                                item.price.discount !== null &&
                                                                                    item.price.discount !== 0 &&
                                                                                    'have-price-discount',
                                                                            )}
                                                                        >
                                                                            {item.discount !== null &&
                                                                                item.price.discount !== 0 && (
                                                                                    <p
                                                                                        className={cx(
                                                                                            'product-price-discount',
                                                                                        )}
                                                                                    >
                                                                                        <FormatPrice
                                                                                            value={item.price.discount}
                                                                                        />
                                                                                    </p>
                                                                                )}
                                                                            <p className={cx('product-price-real')}>
                                                                                <FormatPrice
                                                                                    value={item.price.original}
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                'line-item-quantity',
                                                                'table-cell-center',
                                                                'hidden-phone',
                                                            )}
                                                        >
                                                            <div className={cx('mini-cart-item-quantity')}>
                                                                <div className={cx('quantity-selector')}>
                                                                    <button
                                                                        className={cx('quantity-selector-button')}
                                                                        onClick={() =>
                                                                            handleDecrease(
                                                                                item._id,
                                                                                localQuantities[item._id],
                                                                            )
                                                                        }
                                                                    >
                                                                        <DecreaseIcon className={cx('icon-decrease')} />
                                                                    </button>
                                                                    <input
                                                                        className={cx('quantity-selector-value')}
                                                                        value={localQuantities[item._id] || ''}
                                                                        onChange={(e) =>
                                                                            handleQuantityChange(
                                                                                item._id,
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                        onBlur={(e) => handleBlur(e, item)}
                                                                    />
                                                                    <button
                                                                        className={cx('quantity-selector-button')}
                                                                        onClick={() =>
                                                                            handleIncrease(
                                                                                item,
                                                                                localQuantities[item._id],
                                                                            )
                                                                        }
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
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                'line-item-price',
                                                                'table-cell-right',
                                                                'hidden-phone',
                                                            )}
                                                        >
                                                            <span>
                                                                <FormatPrice value={item.productTotalPrice} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={cx('cart-recap')}>
                                    <div className={cx('cart-recap-scroller')}>
                                        <div className={cx('card')}>
                                            <div className={cx('card-section')}>
                                                <div className={cx('cart-recap-price-line-list')}>
                                                    <div className={cx('cart-recap-price-label')}>Total</div>
                                                    <div className={cx('cart-recap-price-line')}>
                                                        <FormatPrice value={productsAddToCart.totalPrice} />
                                                    </div>
                                                </div>
                                                <div className={cx('cart-notice-important')}>
                                                    <h2>Tạm Thời Bảo Trì Chức Năng Này</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className={cx('cart-recap-price-line-list')}>
                                                    <div className={cx('cart-recap-price-label')}>Total</div>
                                                    <div className={cx('cart-recap-price-line')}>20,000,000đ</div>
                                                </div>
                                                <div className={cx('cart-recap-note')}>
                                                    <button>
                                                        Order instructions
                                                        <ChervonDonwIcon className={cx('icon-chevorn-down')} />
                                                    </button>
                                                </div>
                                                <div className={cx('cart-recap-notices')}>
                                                    <p>Taxes and shipping calculated at checkout</p>
                                                </div>
                                                <button className={cx('btn-submit')}>Checkout</button>
                                                <div className={cx('shipping-terms-group')}>
                                                    By continuing with your purchase, you agree to our{' '}
                                                    <a href="/">shipping/return terms.</a>
                                                </div> */}
                            </Container>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PageCart;
