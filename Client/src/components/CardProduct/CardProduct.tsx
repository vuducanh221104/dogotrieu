import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';
import FormatPrice from '@/components/FormatPrice';
import Link from 'next/link';
import DiscountCalculation from '@/components/DiscountCalculation';

const cx = classNames.bind(styles);
function CardProduct({ data, isSpecialIndex = false }: any) {
    return (
        <div className={cx('product-item')} style={isSpecialIndex ? { borderRight: 'none' } : {}}>
            <div className={cx('product-label-list')}>
                {data.price_discount !== null && <DiscountCalculation price={30000000} discountPrice={20000000} />}
            </div>
            <div className={cx('product-image')} style={data.price_discount !== null ? { marginTop: '-25.3px' } : {}}>
                <Link href="/">
                    <div className={cx('aspect-ratio')}>
                        <img src={data.image} alt="image-product" />
                    </div>
                </Link>
            </div>
            <div className={cx('product-info')}>
                {data.ship !== null && <p className={cx('product-tag')}>{data.ship}</p>}
                <Link href="/">
                    <h3 className={cx('product-vendor')}>{data.wood_type}</h3>
                </Link>
                <Link href="/">
                    <h2 className={cx('product-name')}>{data.name}</h2>
                </Link>

                <div className={cx('product-price-wrapper', data.price_discount !== null && 'have-price-discount')}>
                    {data.price_discount !== null && (
                        <p className={cx('product-price-discount')}>
                            <FormatPrice value={data.price_discount} />
                        </p>
                    )}
                    <p className={cx('product-price-real')}>
                        <FormatPrice value={data.price} />
                    </p>
                </div>

                {data.stock_quantity > 0 ? (
                    <span className={cx('product-status')}>IN STOCK</span>
                ) : (
                    <span className={cx('product-status', 'out-stock')}>OUT STOCK</span>
                )}
            </div>
        </div>
    );
}

export default CardProduct;
