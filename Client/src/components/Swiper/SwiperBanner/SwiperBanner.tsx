'use client';
import styles from './SwiperBanner.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const cx = classNames.bind(styles);
function SwiperBanner({ data, backgroundColor, navigation = true }: any) {
    const sliderRef = useRef<any>(null);

    const [bannerImages, setBannerImages] = useState<any>([]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 640) {
                setBannerImages(data.images_banner_under_640);
            } else {
                setBannerImages(data.images_banner);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);

    const dataBreakpoints = {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    };

    return (
        <>
            <div className={cx('images-banner-background')} style={{ backgroundColor: backgroundColor }}>
                <Swiper
                    ref={sliderRef}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                        waitForTransition: true,
                    }}
                    speed={800}
                    breakpoints={{ ...dataBreakpoints }}
                >
                    {bannerImages?.map((item: any, index: any) => (
                        <SwiperSlide key={index}>
                            <a href="/">
                                <img src={item} key={index} className={cx('image-home', 'lazyload')} />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* NEXT-PREV */}
                {/* {navigation && (
                    <>
                        <div className="prev-arrow-customer" onClick={handlePrev}>
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className={cx('icon-prev-customer')}
                                style={{ color: propsColorBtn }}
                            />
                        </div>
                        <div className="next-arrow-customer" onClick={handleNext}>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className={cx('icon-next-customer')}
                                style={{ color: propsColorBtn }}
                            />
                        </div>
                    </>
                )} */}
            </div>
        </>
    );
}

export default SwiperBanner;
