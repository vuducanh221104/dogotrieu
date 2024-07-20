'use client';
import styles from './ViewCustomer.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CldImage } from 'next-cloudinary';

const cx = classNames.bind(styles);

interface PropsViewCustomer {
    data: any;
    setShowOverlay: any;
    indexImage: number;
}
function ViewCustomer({ data, setShowOverlay, indexImage }: PropsViewCustomer) {
    // Connect 2 swiper to use
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        // ESC TO CLOSE OVERLAY
        const handleKeyPress = (event: any) => {
            if (event.key === 'Escape') {
                setShowOverlay(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [setShowOverlay]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}>
                <div className={cx('btn-close')} onClick={() => setShowOverlay()}>
                    <FontAwesomeIcon icon={faXmark} className={cx('icon-close')} />
                </div>
                <div className={cx('content')}>
                    <div className={cx('container')}>
                        <Swiper
                            loop={true}
                            initialSlide={indexImage}
                            spaceBetween={0}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className={cx('mySwiper2')}
                        >
                            {data?.concat(data).map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <div className={cx('img-container')}>
                                        <CldImage width={'500'} height={'500'} src={item} alt="" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className={cx('swiper-footer')}>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                freeMode={true}
                                watchSlidesProgress={true}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 5,
                                    },
                                    460: {
                                        slidesPerView: 6,
                                    },
                                    540: {
                                        slidesPerView: 7,
                                    },
                                    620: {
                                        slidesPerView: 8,
                                    },
                                    690: {
                                        slidesPerView: 9,
                                    },
                                    840: {
                                        slidesPerView: 11,
                                    },

                                    915: {
                                        slidesPerView: 12,
                                    },
                                    1070: {
                                        slidesPerView: 13,
                                    },
                                    1110: {
                                        slidesPerView: 14,
                                    },
                                    1200: {
                                        slidesPerView: 16,
                                    },
                                }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className={cx('mySwiper')}
                            >
                                {data.concat(data).map((item: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className={cx('footer-swiper-img')}>
                                            <CldImage width={'500'} height={'500'} src={item} alt="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ViewCustomer;
