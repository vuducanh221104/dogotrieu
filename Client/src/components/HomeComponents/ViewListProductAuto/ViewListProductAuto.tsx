'use client';
import styles from './ViewListProductAuto.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Container } from 'react-bootstrap';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FormatPrice from '@/components/FormatPrice';
import Link from 'next/link';
import slugify from 'slugify';
import { CldImage } from 'next-cloudinary';
import { featuredProductGet, featuredProductGetById } from '@/services/productServices';
import useWindowSize from '@/hooks/useWIndowSize';
import { useMeasure } from '@uidotdev/usehooks';
import { archivo } from '@/assets/FontNext';
import DiscountCalculation from '@/components/DiscountCalculation';

const cx = classNames.bind(styles);

interface IProps {
    query: any;
    isLoading?: boolean;
    title: string;
    nextBtnLink?: string;
}

function ViewListProductAuto({ query, isLoading, title, nextBtnLink }: IProps) {
    const { width: windowWidth } = useWindowSize();
    const hasCategoryOrMaterial = query.includes('category_id') || query.includes('material_id');
    const { data } = hasCategoryOrMaterial ? featuredProductGet(query) : featuredProductGetById(query);
    const [currentTransform, setCurrentTransform] = useState<number>(0);

    const [maxHeight, setMaxHeight] = useState<number>(0);
    const productRefs = useRef<Array<HTMLDivElement | null>>([]);

    const updateMaxHeight = () => {
        const heights = productRefs.current.map((item) => item?.offsetHeight || 0);
        setMaxHeight(Math.max(...heights));
    };

    useEffect(() => {
        if (data) {
            updateMaxHeight();
        }
    }, [data, windowWidth]);

    const handleNavigation = (value: string) => {
        if (windowWidth < 1280 && value === 'next' && currentTransform !== -200) {
            setCurrentTransform((prev) => prev - 100);
        } else if (windowWidth < 1280 && value === 'prev' && currentTransform !== 0) {
            setCurrentTransform((prev) => prev + 100);
        } else if (windowWidth >= 1280 && windowWidth < 1440 && value === 'next' && currentTransform !== -140) {
            setCurrentTransform((prev) => (currentTransform === -100 ? prev - 40 : prev - 100));
        } else if (windowWidth >= 1280 && windowWidth < 1440 && value === 'prev' && currentTransform !== 0) {
            setCurrentTransform((prev) => (currentTransform === -40 ? prev + 40 : prev + 100));
        } else if (windowWidth >= 1440 && value === 'next' && currentTransform !== -100) {
            setCurrentTransform(-100);
        } else if (windowWidth >= 1440 && value === 'prev' && currentTransform !== 0) {
            setCurrentTransform(0);
        }
    };

    const arrowOpacity = useMemo(
        () => ({
            prev: currentTransform === 0 ? 0 : 1,
            next: currentTransform === (windowWidth >= 1440 ? -100 : windowWidth >= 1280 ? -140 : -200) ? 0 : 1,
        }),
        [currentTransform, windowWidth],
    );

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    return (
        <div className={cx('product-wrapper')}>
            <Container>
                <div className={cx('product-inner')}>
                    <div className={cx('product-heading')}>
                        <h3 className={`${cx('product-heading-title')} ${archivo.className}`}>{title}</h3>
                        {nextBtnLink !== '' && (
                            <div className={cx('product-heading-view-all')}>
                                <Link href={`${nextBtnLink}`}>
                                    Xem Tất Cả
                                    <FontAwesomeIcon icon={faArrowRight} className={cx('icon-arrow-right')} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Container>

            <Container>
                <div className={cx('scroll')}>
                    <div className={cx('scroll-inner')}>
                        <div className={cx('scroll-list')}>
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : windowWidth >= 1000 ? (
                                <>
                                    <div className={cx('flickity-viewport')} style={{ height: `${maxHeight}px` }}>
                                        <div
                                            className={cx('flickity-slider')}
                                            style={{ transform: `translateX(${currentTransform}%)` }}
                                        >
                                            {data?.map((item: any, index: any) => (
                                                <div
                                                    key={item?._id}
                                                    ref={(refItem) => (productRefs.current[index] = refItem)}
                                                    className={cx('product-item')}
                                                    style={
                                                        windowWidth >= 1440
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
                                                    <div className={cx('product-label-list')}>
                                                        {item?.price.discount !== null &&
                                                            item?.price.discount !== 0 && (
                                                                <DiscountCalculation
                                                                    price={item?.price.original}
                                                                    discountPrice={item?.price.discount}
                                                                />
                                                            )}
                                                    </div>
                                                    <div className={cx('product-image')}>
                                                        <Link
                                                            href={`/products/${handleSlugify(item?.name)}-${
                                                                item?._id
                                                            }.html`}
                                                        >
                                                            <div className={cx('aspect-ratio')}>
                                                                <CldImage
                                                                    width={400}
                                                                    height={600}
                                                                    alt={`${item?.name} | Dogotrieu.com`}
                                                                    src={item?.thumb}
                                                                    sizes={'(min-width: 0px) 100vw'}
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className={cx('product-info')}>
                                                        {item?.ship !== 0 && (
                                                            <p className={cx('product-tag')}>QUICK SHIP</p>
                                                        )}
                                                        <h3 className={cx('product-vendor', archivo.className)}>
                                                            {item?.material_id &&
                                                                item?.material_id?.map(
                                                                    (material: any, indexMaterial: number) => (
                                                                        <Link
                                                                            href={`/products/${handleSlugify(
                                                                                item?.name,
                                                                            )}-${item?._id}.html`}
                                                                            key={material.name}
                                                                        >
                                                                            {indexMaterial !== 0 && ', '}
                                                                            {material.name}
                                                                        </Link>
                                                                    ),
                                                                )}
                                                        </h3>
                                                        <Link
                                                            href={`/products/${handleSlugify(item?.name)}-${
                                                                item?._id
                                                            }.html`}
                                                        >
                                                            <h2 className={cx('product-name')}>{item?.name}</h2>
                                                        </Link>
                                                        <div
                                                            className={cx(
                                                                'product-price-wrapper',
                                                                item?.price.discount !== null &&
                                                                    item?.price.discount !== 0 &&
                                                                    'have-price-discount',
                                                            )}
                                                        >
                                                            {item?.price.discount !== null &&
                                                                item?.price.discount !== 0 && (
                                                                    <p className={cx('product-price-discount')}>
                                                                        <FormatPrice value={item?.price.discount} />
                                                                    </p>
                                                                )}
                                                            <p className={cx('product-price-real')}>
                                                                <FormatPrice value={item?.price.original} />
                                                            </p>
                                                        </div>

                                                        {item?.quantity > 0 ? (
                                                            <span className={cx('product-status', archivo.className)}>
                                                                CÒN HÀNG
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className={cx(
                                                                    'product-status',
                                                                    'out-stock',
                                                                    archivo.className,
                                                                )}
                                                            >
                                                                HẾT HÀNG
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cx('product-icon-navigate-wrapper')}>
                                        <div
                                            className={cx('prev-arrow-customer')}
                                            onClick={() => handleNavigation('prev')}
                                            style={arrowOpacity.prev === 0 ? { display: 'none' } : {}}
                                        >
                                            <ChervonLeft className={cx('icon-prev-customer')} />
                                        </div>

                                        <div
                                            className={cx('next-arrow-customer')}
                                            onClick={() => handleNavigation('next')}
                                            style={arrowOpacity.next === 0 ? { display: 'none' } : {}}
                                        >
                                            <ChervonRight className={cx('icon-next-customer')} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {data?.map((item: any) => (
                                        <div className={cx('product-item')} key={item?._id}>
                                            <div className={cx('product-label-list')}>
                                                {item?.price.discount !== null && item?.price.discount !== 0 && (
                                                    <DiscountCalculation
                                                        price={item?.price.original}
                                                        discountPrice={item?.price.discount}
                                                    />
                                                )}
                                            </div>
                                            <div className={cx('product-image')}>
                                                <Link href={`/products/${handleSlugify(item?.name)}-${item?._id}.html`}>
                                                    <div className={cx('aspect-ratio')}>
                                                        <CldImage
                                                            width={600}
                                                            height={900}
                                                            src={item?.thumb}
                                                            alt={`${item?.name} | Dogotrieu.com`}
                                                            sizes={'(min-width: 0px) 100vw'}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className={cx('product-info')}>
                                                {item?.ship !== 0 && <p className={cx('product-tag')}>QUICK SHIP</p>}
                                                <h3 className={cx('product-vendor', archivo.className)}>
                                                    {item?.material_id &&
                                                        item?.material_id?.map(
                                                            (material: any, indexMaterial: number) => (
                                                                <Link
                                                                    key={material.name}
                                                                    href={`/products/${handleSlugify(item?.name)}-${
                                                                        item?._id
                                                                    }.html`}
                                                                >
                                                                    {indexMaterial !== 0 && ', '}
                                                                    {material.name}
                                                                </Link>
                                                            ),
                                                        )}
                                                </h3>
                                                <Link href={`/products/${handleSlugify(item?.name)}-${item?._id}.html`}>
                                                    <h2 className={cx('product-name')}>{item?.name}</h2>
                                                </Link>
                                                <div
                                                    className={cx(
                                                        'product-price-wrapper',
                                                        item?.price.discount !== null &&
                                                            item?.price.discount !== 0 &&
                                                            'have-price-discount',
                                                    )}
                                                >
                                                    {item?.price.discount !== null && item?.price.discount !== 0 && (
                                                        <p className={cx('product-price-discount')}>
                                                            <FormatPrice value={item?.price.discount} />
                                                        </p>
                                                    )}
                                                    <p className={cx('product-price-real')}>
                                                        <FormatPrice value={item?.price.original} />
                                                    </p>
                                                </div>

                                                {item?.quantity > 0 ? (
                                                    <span className={cx('product-status', archivo.className)}>
                                                        CÒN HÀNG
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={cx('product-status', 'out-stock', archivo.className)}
                                                    >
                                                        HẾT HÀNG
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default ViewListProductAuto;
