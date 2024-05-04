'use client';
import styles from '../styles/Home.module.scss';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperBanner from '@/components/Swiper/SwiperBanner';
import SwiperCustomer from '@/components/Swiper/SwiperCustomer';
import ViewListProductScroll from '@/components/HomeComponents/ViewListProductScroll';
import { dataBannerAndCustomer } from '@/services/mockApi';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';

const cx = classNames.bind(styles);

function Home() {
    const data = dataBannerAndCustomer;

    return (
        <>
            <>
                <div className={cx('slide-show-banner')}>
                    <SwiperBanner data={data} />
                </div>
                <div className={cx('slide-show-banner')}>
                    <SwiperCustomer
                        data={data.images_customer}
                        showImageCustomer={true}
                        propsColorBtn={'var(--color-hover)'}
                        backgroundColor={'#f9eae9'}
                    />
                </div>
                {/* Product List */}
                <ViewListProductScroll />
                {/* Specification */}
                <ViewSpecification />
            </>
        </>
    );
}

export default Home;
