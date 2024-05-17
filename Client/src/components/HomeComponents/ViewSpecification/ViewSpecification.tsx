'use client';
import styles from './ViewSpecification.module.scss';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container } from 'react-bootstrap';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
import images from '@/assets';
const cx = classNames.bind(styles);

function ViewSpecification() {
    const sliderRef = useRef<any>(null);

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const data = [
        {
            title: 'Quick Ship',
            img: 'https://woodfurniture.com/cdn/shop/files/icons-04_1_60x.png?v=1699958109',
            description: 'In stock & ready*',
            link: '/',
        },
        {
            title: 'Customer Care',
            img: 'https://woodfurniture.com/cdn/shop/files/icons-02_1_60x.png?v=1699958109',
            description: 'Customer Care',
        },
        {
            title: 'Free Delivery over $999',
            img: 'https://woodfurniture.com/cdn/shop/files/icons-01_1_60x.png?v=1699958108',
            description: 'In-Room Delivery Available',
        },
        {
            title: 'Return Policy',
            img: 'https://woodfurniture.com/cdn/shop/files/icons-03_1_60x.png?v=1699958108',
            description: '7 Days Easy Return*',
        },
    ];
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
                            modules={[Navigation, Mousewheel, Autoplay]}
                            spaceBetween={0}
                            loop={true}
                            freeMode={true}
                            mousewheel={true}
                            speed={400}
                        >
                            {data.map((item, index) => (
                                <SwiperSlide>
                                    <li className={cx('specification-item-scroll')}>
                                        <div className={cx('specification-item-scroll-icon')}>
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <div className={cx('specification-item-scroll-info')}>
                                            <p>{item.title}</p>
                                            {item.link ? (
                                                <a href={item.link}> {item.description}</a>
                                            ) : (
                                                <span> {item.description}</span>
                                            )}
                                        </div>
                                    </li>
                                </SwiperSlide>
                            ))}
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
                        {data.map((item, index) => (
                            <li className={cx('specification-item')} key={index}>
                                <div className={cx('specification-item-icon')}>
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className={cx('specification-item-info')}>
                                    <p>{item.title}</p>
                                    {item.link ? (
                                        <a href={item.link}> {item.description}</a>
                                    ) : (
                                        <span> {item.description}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Container>
        </div>
    );
}

export default ViewSpecification;
