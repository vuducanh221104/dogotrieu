'use client';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import classNames from 'classnames/bind';
import styles from './ProductGallery.module.scss';
import { FreeMode, Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
import { CldImage } from 'next-cloudinary';

const cx = classNames.bind(styles);
function ProductGallery({ data, name }: any) {
    const sliderRef = useRef<any>(null);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
        setCurrentIndex((prevIndex) => Math.min(data.length - 1, prevIndex + 1));
    }, []);

    const handleClickThumb = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className={cx('product-gallery-item')}>
            <div className={cx('card')}>
                <div className={cx('card-section')}>
                    <div className={cx('product-gallery')}>
                        <Swiper
                            ref={sliderRef}
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            className={cx('swiper-gallery-main')}
                        >
                            {data?.map((img: string, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className={cx('aspect-ratio')}>
                                        <CldImage
                                            width="500"
                                            height="750"
                                            src={img}
                                            alt={`${name} | Dogotrieu.com`}
                                            sizes={'(min-width: 0px) 100vw'}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className={cx('icon-navigate-wrapper')}>
                                <div className={cx('prev-arrow-customer')} onClick={handlePrev}>
                                    <ChervonLeft className={cx('icon-prev-customer')} />
                                </div>

                                <div className={cx('next-arrow-customer')} onClick={handleNext}>
                                    <ChervonRight className={cx('icon-next-customer')} />
                                </div>
                            </div>
                        </Swiper>

                        {/* SWIPER 2 */}
                        <div className={`scroll ${isTransitionEnabled ? 'active-transition' : ''}`}>
                            <div className={cx('scroll-inner')}>
                                <div className={cx('scroll-thumbnail-list')}>
                                    <Swiper
                                        onScroll={() => setIsTransitionEnabled(true)}
                                        onSliderFirstMove={() => setIsTransitionEnabled(false)}
                                        onSwiper={setThumbsSwiper}
                                        modules={[FreeMode, Navigation, Mousewheel, Thumbs]}
                                        spaceBetween={0}
                                        direction={'vertical'}
                                        freeMode={true}
                                        grabCursor={true}
                                        watchSlidesProgress={true}
                                        breakpoints={{
                                            0: {
                                                direction: 'horizontal',
                                                spaceBetween: 0,
                                                slidesPerView: 'auto',
                                                mousewheel: {
                                                    enabled: true,
                                                    sensitivity: 2,
                                                    forceToAxis: true,
                                                },
                                            },

                                            1000: {
                                                direction: 'vertical',
                                                slidesPerView: 4,
                                                mousewheel: {
                                                    enabled: true,
                                                    sensitivity: 2,
                                                    thresholdTime: 4,
                                                },
                                            },
                                        }}
                                        className={cx('swiper-thumbnail')}
                                    >
                                        {data?.map((img: string, index: number) => (
                                            <SwiperSlide
                                                key={index}
                                                className={currentIndex === index ? 'active' : ''}
                                                onClick={() => handleClickThumb(index)}
                                            >
                                                <div className={cx('aspect-ratio')}>
                                                    <CldImage
                                                        width="130"
                                                        height="195"
                                                        alt={`${name} | Dogotrieu.com`}
                                                        src={img}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductGallery;
