'use client';
import classNames from 'classnames/bind';
import styles from './News.module.scss';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Archivo } from 'next/font/google';
import { Poppins } from 'next/font/google';
import { dataNews } from '@/services/mockApi';
import { routesUser } from '@/config/routesUser/routesUser';

const archivo = Archivo({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['italic', 'normal'],
});
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700'],
    style: ['italic', 'normal'],
});
const cx = classNames.bind(styles);
function News() {
    const data = dataNews;

    // BREAKPOINT
    const dataBreakpoints = {
        0: {
            slidesPerView: 1,
            spaceBetween: 5,
        },
        300: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        765: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        995: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    };
    return (
        <div className={cx('news-wrapper')}>
            <div className={archivo.className}>
                <Container>
                    <div className={cx('news-inner')}>
                        <h3 className={cx('news-heading')}>
                            <div className={cx('news-heading-title')}>NEWS & VIEWS</div>
                            <div className={cx('news-heading-view-all')}>
                                <a href="/" className={`${poppins.className}`}>
                                    View All
                                    <FontAwesomeIcon icon={faArrowRight} className={cx('icon-arrow-right')} />
                                </a>
                            </div>
                        </h3>
                        <Swiper
                            modules={[Navigation, FreeMode, Autoplay]}
                            spaceBetween={0}
                            loop={false}
                            autoplay={false}
                            speed={800}
                            breakpoints={{ ...dataBreakpoints }}
                            freeMode={true}
                            simulateTouch={false}
                        >
                            {data.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <div className={cx('news-item')}>
                                        <a
                                            href={`${routesUser.blogsNews}/${item.slug}`}
                                            className={cx('news-item-link')}
                                        >
                                            <div className={cx('aspect-ratio')}>
                                                <img
                                                    src={item.image_cover}
                                                    alt={item.title}
                                                    className={cx('news-item-image-cover')}
                                                />
                                            </div>
                                        </a>
                                        <h3 className={cx('news-item-title')}>
                                            <a href={`${routesUser.blogsNews}/${item.slug}`}>{item.title}</a>
                                        </h3>
                                        <p className={`${cx('news-item-description')} ${poppins.className}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default News;
