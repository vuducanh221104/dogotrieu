import React from 'react';
import classNames from 'classnames/bind';
import styles from './CardFeaturedProduct.module.scss';
import Link from 'next/link';
import FormatPrice from '@/components/FormatPrice';
import { CldImage } from 'next-cloudinary';

interface IProps {
    item: any;
    handleSlugify: (value: string) => string;
    index: number;
    productRef: React.RefObject<HTMLDivElement> | null;
    windowWidth: number;
    style: any;
}

const cx = classNames.bind(styles);

const CardFeaturedProduct: React.FC<IProps> = ({
    item,
    handleSlugify,
    index,
    productRef,
    windowWidth,
    style = false,
}) => {
    const getProductImageStyle = () => {
        let leftPosition = 0;

        if (windowWidth >= 1440) {
            leftPosition = index !== 0 ? index * 16.67 : 0;
        } else if (windowWidth >= 1280) {
            leftPosition = index !== 0 ? index * 20 : 0;
        } else {
            leftPosition = index !== 0 ? index * 25 : 0;
        }

        const style = {
            position: 'absolute',
            left: `${leftPosition}%`,
        };

        return style;
    };

    return (
        <div
            ref={index === 0 ? productRef : null}
            className={cx('product-item')}
            style={
                style && windowWidth >= 1440
                    ? {
                          position: 'absolute',
                          left: `${index !== 0 ? index * 16.67 : 0}%`,
                      }
                    : windowWidth >= 1280
                    ? {
                          position: 'absolute',
                          left: `${index !== 0 ? index * 20 : 0}%`,
                      }
                    : {
                          position: 'absolute',
                          left: `${index !== 0 ? index * 25 : 0}%`,
                      }
            }
        >
            <div className={cx('product-image')}>
                <Link href={`/products/${handleSlugify(item.name)}-${item._id}.html`}>
                    <div className={cx('aspect-ratio')}>
                        <CldImage
                            width="400"
                            height="600"
                            alt={item.name}
                            src={item.thumb}
                            sizes={'(min-width: 0px) 100vw'}
                            loading="lazy"
                        />
                    </div>
                </Link>
            </div>
            <div className={cx('product-info')}>
                {item.ship !== 0 && <p className={cx('product-tag')}>QUICK SHIP</p>}
                <Link href={`/products/${handleSlugify(item.name)}-${item._id}.html`}>
                    <h3 className={cx('product-vendor')}>Gỗ Sồi</h3>
                </Link>
                <Link href={`/products/${handleSlugify(item.name)}-${item._id}.html`}>
                    <h2 className={cx('product-name')}>{item.name}</h2>
                </Link>
                <div className={cx('product-price-wrapper', item.price.discount !== null && 'have-price-discount')}>
                    {item.discount !== null && (
                        <p className={cx('product-price-discount')}>
                            <FormatPrice value={item.price.discount} />
                        </p>
                    )}
                    <p className={cx('product-price-real')}>
                        <FormatPrice value={item.price.original} />
                    </p>
                </div>

                {item.quantity > 0 ? (
                    <span className={cx('product-status')}>IN STOCK</span>
                ) : (
                    <span className={cx('product-status', 'out-stock')}>OUT STOCK</span>
                )}
            </div>
        </div>
    );
};

export default CardFeaturedProduct;
