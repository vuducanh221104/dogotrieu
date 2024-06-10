'use client';
import styles from './ViewListProductAuto.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import { Container } from 'react-bootstrap';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FormatPrice from '@/components/FormatPrice';
import { Archivo } from 'next/font/google';
import Link from 'next/link';
import slugify from 'slugify';
import { productGetAll } from '@/services/productServices';

const archivo = Archivo({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['italic', 'normal'],
});
const cx = classNames.bind(styles);

interface IProps {
    title: string;
    nextBtn?: boolean;
    nextBtnLink?: string;
}

function ViewListProductAuto({ title, nextBtn = false, nextBtnLink }: IProps) {
    const { data, error, isLoading } = productGetAll();
    const productRef = useRef<any>(null);
    const scrollRef = useRef<any>(null);
    const [currentHeight, setCurrentHeight] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [currentTransform, setCurrentTransform] = useState<number>(0);

    useEffect(() => {
        if (!isLoading && data && data.length > 0) {
            setCurrentHeight(scrollRef.current.offsetHeight);
            const handleResize = () => {
                if (productRef.current) {
                    const height = productRef.current.offsetHeight;
                    setCurrentHeight(height);
                }
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (windowWidth >= 1440) {
            if (currentTransform === -140) setCurrentTransform(-100);
            if (currentTransform === -200) setCurrentTransform(-100);
        } else if (windowWidth >= 1280 && windowWidth < 1440) {
            if (currentTransform === -200) setCurrentTransform(-140);
            if (currentTransform === -100) setCurrentTransform(-140);
        } else if (windowWidth < 1280) {
            if (currentTransform === -140) setCurrentTransform(-200);
            if (currentTransform === -100) setCurrentTransform(-200);
        }
    }, [windowWidth]);

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

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    return (
        <div className={cx('product-wrapper')}>
            <Container>
                <div className={cx('product-inner')}>
                    <div className={cx('product-heading')}>
                        <h3 className={`${cx('product-heading-title')} ${archivo.className}`}>{title}</h3>
                        {nextBtn && (
                            <div className={cx('product-heading-view-all')}>
                                <a href={nextBtnLink}>
                                    View All
                                    <FontAwesomeIcon icon={faArrowRight} className={cx('icon-arrow-right')} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </Container>

            <Container>
                <div className={cx('scroll')}>
                    <div className={cx('scroll-inner')}>
                        <div className={cx('scroll-list')} ref={scrollRef}>
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : windowWidth >= 1000 ? (
                                <>
                                    <div
                                        className={cx('flickity-viewport')}
                                        style={{ height: `${currentHeight || productRef.current?.offsetHeight}px` }}
                                    >
                                        <div
                                            className={cx('flickity-slider')}
                                            style={{ transform: `translateX(${currentTransform}%)` }}
                                        >
                                            {data?.map((item: any, index: any) => (
                                                <div
                                                    ref={index === 0 ? productRef : null}
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
                                                    <div className={cx('product-image')}>
                                                        <Link
                                                            href={`/products/${handleSlugify(item.name)}-${
                                                                item._id
                                                            }.html`}
                                                        >
                                                            <div className={cx('aspect-ratio')}>
                                                                <img src={item.thumb} alt="image-product" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className={cx('product-info')}>
                                                        {item.ship !== 0 && (
                                                            <p className={cx('product-tag')}>QUICK SHIP</p>
                                                        )}
                                                        <Link href="/">
                                                            <h3 className={cx('product-vendor')}>Gỗ Sồi</h3>
                                                        </Link>
                                                        <Link href="/">
                                                            <h2 className={cx('product-name')}>{item.name}</h2>
                                                        </Link>
                                                        <div
                                                            className={cx(
                                                                'product-price-wrapper',
                                                                item.price.discount !== null && 'have-price-discount',
                                                            )}
                                                        >
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
                                                            <span className={cx('product-status', 'out-stock')}>
                                                                OUT STOCK
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
                                            style={{ opacity: 1 }}
                                        >
                                            <ChervonLeft className={cx('icon-prev-customer')} />
                                        </div>

                                        <div
                                            className={cx('next-arrow-customer')}
                                            onClick={() => handleNavigation('next')}
                                            style={{ opacity: 1 }}
                                        >
                                            <ChervonRight className={cx('icon-next-customer')} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {data?.map((item: any, index: any) => (
                                        <div className={cx('product-item')} key={index}>
                                            <div className={cx('product-image')}>
                                                <Link href="/">
                                                    <div className={cx('aspect-ratio')}>
                                                        <img src={item.thumb} alt="image-product" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className={cx('product-info')}>
                                                {item.ship !== 0 && <p className={cx('product-tag')}>QUICK SHIP</p>}
                                                <Link href={`/products/${handleSlugify(item.name)}-${item._id}.html`}>
                                                    <h3 className={cx('product-vendor')}>Gỗ Sồi</h3>
                                                </Link>
                                                <Link href="/">
                                                    <h2 className={cx('product-name')}>{item.name}</h2>
                                                </Link>
                                                <div
                                                    className={cx(
                                                        'product-price-wrapper',
                                                        item.price.discount !== null && 'have-price-discount',
                                                    )}
                                                >
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
