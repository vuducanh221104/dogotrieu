import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';
import FormatPrice from '@/components/FormatPrice';
import Link from 'next/link';
import DiscountCalculation from '@/components/DiscountCalculation';
import slugify from 'slugify';
import { CldImage } from 'next-cloudinary';

interface IPropsCardProduct {
    // data: IProduct;
    data: any;
    isSpecialIndex?: boolean;
    onPageSearch?: boolean;
}

const cx = classNames.bind(styles);
function CardProduct({ data, isSpecialIndex = false, onPageSearch = false }: IPropsCardProduct) {
    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    return (
        <div
            className={cx('product-item', onPageSearch && 'on-page-search')}
            style={isSpecialIndex ? { borderRight: 'none' } : {}}
        >
            <div className={cx('product-label-list')}>
                {data.price.discount !== null && data.price.discount !== 0 && (
                    <DiscountCalculation price={data.price.original} discountPrice={data.price.discount} />
                )}
            </div>
            <div className={cx('product-image')}>
                <Link href={`/products/${handleSlugify(data.name)}-${data._id}.html`}>
                    <div className={cx('aspect-ratio')}>
                        <CldImage
                            width={400}
                            height={600}
                            alt={`${data.name} | Dogotrieu.com`}
                            src={data.thumb}
                            sizes={'(min-width: 0px) 100vw'}
                            loading="lazy"
                        />
                    </div>
                </Link>
            </div>
            <div className={cx('product-info')}>
                {data.ship !== 0 && <p className={cx('product-tag')}>QUICK SHIP</p>}
                <h2 className={cx('product-vendor')}>
                    {data.material_id &&
                        data.material_id?.map((material: any, index: number) => (
                            <Link href={`/products/${handleSlugify(data.name)}-${data._id}.html`} key={index}>
                                {index !== 0 && ', '}
                                {material.name}
                            </Link>
                        ))}
                </h2>
                <Link href={`/products/${handleSlugify(data.name)}-${data._id}.html`}>
                    <h2 className={cx('product-name')}>{data.name}</h2>
                </Link>
                <div
                    className={cx(
                        'product-price-wrapper',
                        data.price.discount !== null && data.price.discount !== 0 && 'have-price-discount',
                    )}
                >
                    {data.discount !== null && data.price.discount !== 0 && (
                        <p className={cx('product-price-discount')}>
                            <FormatPrice value={data.price.discount} />
                        </p>
                    )}
                    <p className={cx('product-price-real')}>
                        <FormatPrice value={data.price.original} />
                    </p>
                </div>

                {data.quantity > 0 ? (
                    <span className={cx('product-status')}>IN STOCK</span>
                ) : (
                    <span className={cx('product-status', 'out-stock')}>OUT STOCK</span>
                )}
            </div>
        </div>
    );
}

export default CardProduct;
