import React from 'react';
import classNames from 'classnames/bind';
import styles from './DiscountCalculation.module.scss';

const cx = classNames.bind(styles);

const DiscountCalculation = ({ price, discountPrice }: any) => {
    // Kiểm tra nếu có giá khuyến mãi
    const hasDiscount = discountPrice !== undefined && discountPrice !== null;
    // Tính phần trăm giảm giá
    const discountPercentage = hasDiscount ? ((price - discountPrice) / price) * 100 : 0;

    return (
        <>
            {hasDiscount && (
                <span className={`product-label ${cx('product-label-on-sale')}`}>
                    Sale {discountPercentage.toFixed(0)}%
                </span>
            )}
        </>
    );
};

export default DiscountCalculation;
