import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';
import FormatPrice from '@/components/FormatPrice';
import Link from 'next/link';
import DiscountCalculation from '@/components/DiscountCalculation';

interface IPropsCardProduct {
    // data: IProduct;
    data: any;
    isSpecialIndex?: boolean;
    onPageSearch?: boolean;
}

const cx = classNames.bind(styles);
function CardProduct({ data, isSpecialIndex = false, onPageSearch = false }: IPropsCardProduct) {
    const linkHref = '';
    return (
        <div
            className={cx('product-item', onPageSearch && 'on-page-search')}
            style={isSpecialIndex ? { borderRight: 'none' } : {}}
        >
            <div className={cx('product-label-list')}>
                {data.discount !== null && <DiscountCalculation price={data.price} discountPrice={data.discount} />}
            </div>
            <div className={cx('product-image')} style={data.discount !== null ? { marginTop: '-25.3px' } : {}}>
                <Link href="/">
                    <div className={cx('aspect-ratio')}>
                        <img src={data.thumb} alt="image-product" />
                    </div>
                </Link>
            </div>
            <div className={cx('product-info')}>
                {data.ship !== null && <p className={cx('product-tag')}>{data.ship}</p>}
                <Link href="/">
                    <h3 className={cx('product-vendor')}>{data.material_id.material_type_id.name}</h3>
                </Link>
                <Link href="/">
                    <h2 className={cx('product-name')}>{data.name}</h2>
                </Link>

                <div className={cx('product-price-wrapper', data.discount !== null && 'have-price-discount')}>
                    {data.discount !== null && (
                        <p className={cx('product-price-discount')}>
                            <FormatPrice value={data.discount} />
                        </p>
                    )}
                    <p className={cx('product-price-real')}>
                        <FormatPrice value={data.price} />
                    </p>
                </div>

                {data.quantity > 0 ? (
                    <span className={cx('product-status')}>CÒN HÀNG</span>
                ) : (
                    <span className={cx('product-status', 'out-stock')}>HẾT HÀNG</span>
                )}
            </div>
        </div>
    );
}

export default CardProduct;
