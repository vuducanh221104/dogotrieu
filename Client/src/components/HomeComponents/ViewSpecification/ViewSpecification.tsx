'use client';
import styles from './ViewSpecification.module.scss';
import classNames from 'classnames/bind';
import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container } from 'react-bootstrap';
import { ChervonLeft, ChervonRight } from '@/components/Icons';
import icons from '@/assets/images-icon';
import Image from 'next/image';
import routes from '@/config/routes';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWIndowSize';
const cx = classNames.bind(styles);

function ViewSpecification() {
    const sliderRef = useRef<any>(null);

    const { width: windowWidth } = useWindowSize();

    const data = [
        {
            title: 'Vận chuyển nhanh',
            img: icons.iconCartPlus,
            description: 'Còn hàng & sẵn sàng*',
            link: routes.user.home,
        },
        {
            title: 'Chăm sóc khách hàng',
            img: icons.iconUserChat,
            description: 'Qua Trò chuyện, Email hoặc Gọi điện',
        },
        {
            title: 'Giao hàng toàn quốc',
            img: icons.iconShipping,
            description: 'Vận chuyển đến mọi tỉnh thành trên cả nước',
        },
        {
            title: 'Đổi trả miễn phí',
            img: icons.iconGuarantee,
            description: 'Đổi trả hàng miễn phí trong vòng 7 ngày',
        },
    ];

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
                                <SwiperSlide key={index}>
                                    <li className={cx('specification-item-scroll')}>
                                        <div className={cx('specification-item-scroll-icon')}>
                                            <Image src={item.img} alt={item.title} />
                                        </div>
                                        <div className={cx('specification-item-scroll-info')}>
                                            <p>{item.title}</p>
                                            {item.link ? (
                                                <Link href={item.link}> {item.description}</Link>
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
                                    <Image src={item.img} alt={item.title} />
                                </div>
                                <div className={cx('specification-item-info')}>
                                    <p>{item.title}</p>
                                    {item.link ? (
                                        <Link href={item.link}> {item.description}</Link>
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
