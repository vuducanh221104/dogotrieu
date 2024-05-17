'use client';
import styles from './ViewListProductAuto.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

import { Container } from 'react-bootstrap';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { dataProduct } from '@/services/mockApi';
import FormatPrice from '@/components/FormatPrice';
import { Archivo } from 'next/font/google';
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
    // Nếu như muốn height của scroll giống web # thì cho ref={scrollRef} vào  <div className={cx('scroll')} ref={scrollRef} >
    const productRef = useRef<any>(null);
    const scrollRef = useRef<any>(null);
    const [currentHeight, setCurrentHeight] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [currentTransform, setCurrentTransform] = useState<number>(0);

    useEffect(() => {
        if (windowWidth >= 1440) {
            if (currentTransform === -140) {
                setCurrentTransform(-100);
            }
            if (currentTransform === -200) {
                setCurrentTransform(-100);
            }
        }
        if (windowWidth >= 1280 && windowWidth < 1440) {
            if (currentTransform === -200) {
                setCurrentTransform(-140);
            }
            if (currentTransform === -100) {
                setCurrentTransform(-140);
            }
            if (currentTransform === 0) {
            }
        }
        if (windowWidth < 1280) {
            if (currentTransform === -140) {
                setCurrentTransform(-200);
            }
            if (currentTransform === -100) {
                setCurrentTransform(-200);
            }
        }
    }, [windowWidth]);

    useEffect(() => {
        setCurrentHeight(scrollRef.current.clientHeight);
        const handleResize = () => {
            if (productRef.current) {
                const height = productRef.current.clientHeight;

                setCurrentHeight(height);
            }
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const data = dataProduct;
    // Handle Prev & Next
    const handleNavigation = (value: string) => {
        if (windowWidth < 1280 && value === 'next' && currentTransform !== -200) {
            setCurrentTransform((prev) => prev - 100);
        }
        if (windowWidth < 1280 && value === 'prev' && currentTransform !== 0) {
            setCurrentTransform((prev) => prev + 100);
        }
        if (windowWidth >= 1280 && windowWidth < 1440 && value === 'next' && currentTransform !== -140) {
            if (currentTransform === -100) {
                setCurrentTransform((prev) => prev - 40);
            } else {
                setCurrentTransform((prev) => prev - 100);
            }
            return;
        }
        if (windowWidth >= 1280 && windowWidth < 1440 && value === 'prev' && currentTransform !== 0) {
            if (currentTransform === -40) {
                setCurrentTransform((prev) => prev + 40);
            } else {
                setCurrentTransform((prev) => prev + 100);
            }

            return;
        }
        if (windowWidth >= 1440 && value === 'next' && currentTransform !== 100) {
            setCurrentTransform(-100);
            return;
        }
        if (windowWidth >= 1440 && value === 'prev' && currentTransform !== 0) {
            setCurrentTransform(0);
            return;
        }
    };
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
                            {windowWidth >= 1000 ? (
                                <>
                                    <div className={cx('flickity-viewport')} style={{ height: `${currentHeight}px` }}>
                                        <div
                                            className={cx('flickity-slider')}
                                            style={{ transform: `translateX(${currentTransform}%)` }}
                                        >
                                            {data.map((item: any, index: any) => (
                                                <div
                                                    ref={productRef}
                                                    className={cx('product-item')}
                                                    style={
                                                        windowWidth >= 1440
                                                            ? {
                                                                  position: 'absolute',
                                                                  left: `${index !== 0 ? index * 16.67 : 0}% `,
                                                              }
                                                            : windowWidth >= 1280
                                                            ? {
                                                                  position: 'absolute',
                                                                  left: `${index !== 0 ? index * 20 : 0}% `,
                                                              }
                                                            : {
                                                                  position: 'absolute',
                                                                  left: `${index !== 0 ? index * 25 : 0}% `,
                                                              }
                                                    }
                                                >
                                                    <div className={cx('product-image')}>
                                                        <div className={cx('aspect-ratio')}>
                                                            <img src={item.image} alt="image-product" />
                                                        </div>
                                                    </div>
                                                    <div className={cx('product-info')}>
                                                        <p className={cx('product-tag')}>{item.ship}</p>
                                                        <h3 className={cx('product-vendor')}>{item.wood_type}</h3>
                                                        <h2 className={cx('product-name')}>{item.name}</h2>

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

                                                        <span className={cx('product-status')}>{item.stock}</span>
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
                                    {data.map((item: any, index: any) => (
                                        <div className={cx('product-item')}>
                                            <div className={cx('product-image')}>
                                                <div className={cx('aspect-ratio')}>
                                                    <img src={item.image} alt="image-product" />
                                                </div>
                                            </div>
                                            <div className={cx('product-info')}>
                                                <p className={cx('product-tag')}>{item.ship}</p>
                                                <h3 className={cx('product-vendor')}>{item.wood_type}</h3>
                                                <h2 className={cx('product-name')}>{item.name}</h2>

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

                                                <span className={cx('product-status')}>{item.stock}</span>
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
