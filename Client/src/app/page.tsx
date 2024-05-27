'use client';
import styles from '@/styles/Home.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import SwiperBanner from '@/components/Swiper/SwiperBanner';
import SwiperCustomer from '@/components/Swiper/SwiperCustomer';
import { dataBannerAndCustomer } from '@/services/mockApi';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import News from '@/components/News';
import ViewListProductAuto from '@/components/HomeComponents/ViewListProductAuto';

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
                <ViewListProductAuto title={'BEST SELLER'} nextBtn={true} nextBtnLink={'/'} />
                {/* NEWS */}
                <News />
                {/* Specification */}
                <ViewSpecification />
            </>
        </>
    );
}

export default Home;
