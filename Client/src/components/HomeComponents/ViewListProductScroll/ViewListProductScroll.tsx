'use client';
import styles from './ViewListProductScroll.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
// import { useRef, useCallback, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import { Container } from 'react-bootstrap';
// import { ChervonLeft, ChervonRight } from '@/components/Icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { dataProduct } from '@/services/mockApi';
// import FormatPrice from '@/components/FormatPrice';

const cx = classNames.bind(styles);

// 6 Product View
function ViewListProductScroll() {
    // const sliderRef = useRef<any>(null);
    // const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
    // const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
    // const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(() => {
    //     return window.innerWidth <= 992 ? 2 : 4;
    // });

    // const data = dataProduct;

    // // LOGIC
    // useEffect(() => {
    //     function handleResize() {
    //         setCurrentSlidesPerView(window.innerWidth <= 992 ? 2 : 4);
    //     }

    //     handleResize();

    //     const swiperInstance = sliderRef.current.swiper;
    //     swiperInstance.on('slideChange', () => {
    //         const activeIndex = swiperInstance.activeIndex;
    //         setIsFirstSlide(activeIndex === 0);
    //         setIsLastSlide(activeIndex + currentSlidesPerView >= swiperInstance.slides.length);
    //     });

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [currentSlidesPerView]);

    // // HANDLE PREV-NEXT
    // const handlePrev = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     const swiperInstance = sliderRef.current.swiper;
    //     const currentIndex = swiperInstance.activeIndex;
    //     const newIndex = currentIndex - currentSlidesPerView;
    //     swiperInstance.slideTo(newIndex, 800);
    // }, [currentSlidesPerView]);

    // const handleNext = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     const swiperInstance = sliderRef.current.swiper;
    //     const currentIndex = swiperInstance.activeIndex;
    //     const newIndex = currentIndex + currentSlidesPerView;
    //     swiperInstance.slideTo(newIndex, 800);
    // }, [currentSlidesPerView]);

    // // BREAKPOINT
    // const dataBreakpoints = {
    //     0: {
    //         slidesPerView: 1,
    //         spaceBetween: 5,
    //     },
    //     300: {
    //         slidesPerView: 2,
    //         spaceBetween: 5,
    //     },
    //     765: {
    //         slidesPerView: 3,
    //         spaceBetween: 10,
    //     },
    //     995: {
    //         slidesPerView: 4,
    //         spaceBetween: 10,
    //     },
    //     1200: {
    //         slidesPerView: 4,
    //         spaceBetween: 10,
    //     },
    // };
    return (
        <>
            {/* <div className={cx('product-wrapper')}>
            <Container>
                <div className={cx('product-inner')}>
                    <h3 className={cx('product-heading')}>
                        <div className={cx('product-heading-title')}>Best Sellers</div>
                        <div className={cx('product-heading-view-all')}>
                            <a href="/">
                                View All
                                <FontAwesomeIcon icon={faArrowRight} className={cx('icon-arrow-right')} />
                            </a>
                        </div>
                    </h3>
                    <Swiper
                        ref={sliderRef}
                        modules={[Navigation, Autoplay]}
                        spaceBetween={0}
                        loop={false}
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                            waitForTransition: true,
                        }}
                        speed={800}
                        breakpoints={{ ...dataBreakpoints }}
                    >
                        {data.map((item: any, index: any) => (
                            <SwiperSlide key={index}>
                                <a href="/">
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
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {window.innerWidth <= 300 ? (
                        <div className={cx('product-icon-navigate-wrapper')}>
                            <div className={cx('prev-arrow-customer')} onClick={handlePrev} style={{ opacity: 1 }}>
                                <ChervonLeft className={cx('icon-prev-customer')} />
                            </div>

                            <div className={cx('next-arrow-customer')} onClick={handleNext} style={{ opacity: 1 }}>
                                <ChervonRight className={cx('icon-next-customer')} />
                            </div>
                        </div>
                    ) : (
                        <div className={cx('product-icon-navigate-wrapper')}>
                            {!isFirstSlide && (
                                <div className={cx('prev-arrow-customer')} onClick={handlePrev}>
                                    <ChervonLeft className={cx('icon-prev-customer')} />
                                </div>
                            )}
                            {!isLastSlide && (
                                <div className={cx('next-arrow-customer')} onClick={handleNext}>
                                    <ChervonRight className={cx('icon-next-customer')} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </div> */}
        </>
    );
}

export default ViewListProductScroll;
