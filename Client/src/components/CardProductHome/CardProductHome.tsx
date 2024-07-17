import React from 'react';
import classNames from 'classnames/bind';
import styles from './CardProductHome.module.scss';
import FormatPrice from '@/components/FormatPrice';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

const cx = classNames.bind(styles);

const CardProductHome = ({ data, windowWidth, productRef }: any) => {
    return (
        <>
            {data.map((item: any, index: number) => (
                <div
                    key={index}
                    ref={productRef}
                    className={cx('product-item')}
                    style={
                        windowWidth >= 1440
                            ? { left: `${index !== 0 ? index * 16.67 : 0}% ` }
                            : windowWidth >= 1280
                            ? { left: `${index !== 0 ? index * 20 : 0}% ` }
                            : { left: `${index !== 0 ? index * 25 : 0}% ` }
                    }
                >
                    <div className={cx('product-image')}>
                        <Link href="/">
                            <div className={cx('aspect-ratio')}>
                                <CldImage
                                    width={'500'}
                                    height="500"
                                    src={item.thumb}
                                    alt={`${data.name} | Dogotrieu.com`}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className={cx('product-info')}>
                        {item.ship !== null && <p className={cx('product-tag')}>{item.ship}</p>}
                        <Link href="/">
                            <h3 className={cx('product-vendor')}>{item.wood_type}</h3>
                        </Link>
                        <Link href="/">
                            <h2 className={cx('product-name')}>{item.name}</h2>
                        </Link>
                        <div
                            className={cx(
                                'product-price-wrapper',
                                item.price_discount !== null && 'have-price-discount',
                            )}
                        >
                            {item.price_discount !== null && (
                                <p className={cx('product-price-discount')}>
                                    <FormatPrice value={item.price_discount} />
                                </p>
                            )}
                            <p className={cx('product-price-real')}>
                                <FormatPrice value={item.price} />
                            </p>
                        </div>
                        {item.stock_quantity > 0 ? (
                            <span className={cx('product-status')}>IN STOCK</span>
                        ) : (
                            <span className={cx('product-status', 'out-stock')}>OUT STOCK</span>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default CardProductHome;
