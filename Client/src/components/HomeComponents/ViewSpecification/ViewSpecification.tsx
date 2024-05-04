'use client';
import styles from './ViewSpecification.module.scss';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container } from 'react-bootstrap';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
const cx = classNames.bind(styles);

function ViewSpecification() {
    const sliderRef = useRef<any>(null);

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className={cx('specification-wrapper')}>
            <Container>
                {windowWidth <= 640 ? (
                    <>
                        <Swiper
                            ref={sliderRef}
                            modules={[Navigation, Autoplay]}
                            spaceBetween={0}
                            loop={true}
                            speed={800}
                        >
                            <SwiperSlide>
                                <li className={cx('specification-item-scroll')}>
                                    <div className={cx('specification-item-scroll-icon')}>
                                        <img
                                            src={
                                                'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('specification-item-scroll-info')}>
                                        <p>Quick Ship</p>
                                        <a href="/"> In stock & ready*</a>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={cx('specification-item-scroll')}>
                                    <div className={cx('specification-item-scroll-icon')}>
                                        <img
                                            src={
                                                'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('specification-item-scroll-info')}>
                                        <p>Quick Ship</p>
                                        <span> In stock & ready*</span>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={cx('specification-item-scroll')}>
                                    <div className={cx('specification-item-scroll-icon')}>
                                        <img
                                            src={
                                                'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('specification-item-scroll-info')}>
                                        <p>Quick Ship</p>
                                        <a href="/"> In stock & ready*</a>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={cx('specification-item-scroll')}>
                                    <div className={cx('specification-item-scroll-icon')}>
                                        <img
                                            src={
                                                'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('specification-item-scroll-info')}>
                                        <p>Quick Ship</p>
                                        <a href="/"> In stock & ready*</a>
                                    </div>
                                </li>
                            </SwiperSlide>
                        </Swiper>
                        <div className={cx('product-icon-navigate-wrapper')}>
                            <div className={cx('prev-arrow-customer')} onClick={handlePrev}>
                                <ChervonLeft className={cx('icon-prev-customer')} />
                            </div>

                            <div className={cx('next-arrow-customer')} onClick={handleNext}>
                                <ChervonRight className={cx('icon-next-customer')} />
                            </div>
                        </div>
                    </>
                ) : (
                    <ul className={cx('specification-list')}>
                        <li className={cx('specification-item')}>
                            <div className={cx('specification-item-icon')}>
                                <img
                                    src={'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'}
                                    alt=""
                                />
                            </div>
                            <div className={cx('specification-item-info')}>
                                <p>Quick Ship</p>
                                <a href="/"> In stock & ready*</a>
                            </div>
                        </li>
                        <li className={cx('specification-item')}>
                            <div className={cx('specification-item-icon')}>
                                <img
                                    src={'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'}
                                    alt=""
                                />
                            </div>
                            <div className={cx('specification-item-info')}>
                                <p>Quick Ship</p>
                                <a href="/"> In stock & ready*</a>
                            </div>
                        </li>
                        <li className={cx('specification-item')}>
                            <div className={cx('specification-item-icon')}>
                                <img
                                    src={'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'}
                                    alt=""
                                />
                            </div>
                            <div className={cx('specification-item-info')}>
                                <p>Quick Ship</p>
                                <a href="/"> In stock & ready*</a>
                            </div>
                        </li>
                        <li className={cx('specification-item')}>
                            <div className={cx('specification-item-icon')}>
                                <img
                                    src={'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109'}
                                    alt=""
                                />
                            </div>
                            <div className={cx('specification-item-info')}>
                                <p>Quick Ship</p>
                                <a href="/"> In stock & ready*</a>
                            </div>
                        </li>
                    </ul>
                )}
            </Container>
        </div>
    );
}

export default ViewSpecification;
