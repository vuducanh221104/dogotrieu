'use client';
import styles from './SwiperCustomer.module.scss';
import classNames from 'classnames/bind';
import { useRef, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ViewCustomer from '@/components/ViewCustomer';
import { Container } from 'react-bootstrap';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
import { CldImage } from 'next-cloudinary';
const cx = classNames.bind(styles);
function SwiperCustomer({ data, navigation = true }: any) {
    const sliderRef = useRef<any>(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectIndexImage, setSelectIndexImage] = useState(0);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    // Handle click on image ( will happen open Overlay and Set index to show)
    const handleImageClick = (index: any) => {
        setShowOverlay(true);
        setSelectIndexImage(index);
    };

    const dataBreakpoints = {
        0: {
            slidesPerView: 2,
            spaceBetween: 5,
        },
        300: {
            slidesPerView: 2,
            spaceBetween: 5,
        },
        765: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        995: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
    };
    return (
        <>
            {showOverlay && <ViewCustomer data={data} setShowOverlay={setShowOverlay} indexImage={selectIndexImage} />}
            <div className={cx('wrapper')}>
                <Container>
                    <img
                        src="https://lh3.googleusercontent.com/pw/AIL4fc_xW5iBF182Ojzi9prbjThb8sWWP2qxRwpXD5uUgKCcDx6G5RKYH00iE1JFGA0vF3I2B5TNaNBMuhk5PYdYNvBN6bZ7x0TfbRmgNTDCFslA4Y83MjX7R7PTZsLYAUiSK4jiZPFrNf2ZWIhUAp1ppeHG=w1380-h74-s-no?authuser=1"
                        className={cx('image-customer-header')}
                    />
                    <div className={cx('customer-background')}>
                        <Swiper
                            ref={sliderRef}
                            modules={[Navigation, Autoplay]}
                            spaceBetween={0}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                pauseOnMouseEnter: true,
                                disableOnInteraction: false,
                                waitForTransition: true,
                            }}
                            speed={400}
                            breakpoints={{ ...dataBreakpoints }}
                        >
                            {data.concat(data).map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <>
                                        <CldImage
                                            width={'500'}
                                            height={'500'}
                                            src={item}
                                            key={index}
                                            className={cx('image-home', 'lazyload')}
                                            onClick={() => handleImageClick(index)}
                                            alt={''}
                                        />
                                    </>
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
                    </div>
                </Container>
            </div>
        </>
    );
}

export default SwiperCustomer;
