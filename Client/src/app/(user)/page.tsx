'use client';
import styles from '@/styles/Home.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import SwiperBanner from '@/components/Swiper/SwiperBanner';
import SwiperCustomer from '@/components/Swiper/SwiperCustomer';
import { dataBannerAndCustomer as mockDataBannerAndCustomer } from '@/services/mockApi';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import News from '@/components/News';
import ViewListProductAuto from '@/components/HomeComponents/ViewListProductAuto';
import { productGetOnly } from '@/services/productServices';

const cx = classNames.bind(styles);

function Home() {
    const dataBannerAndCustomer = mockDataBannerAndCustomer;
    const { data: dataTable, error: errorTable, isLoading: isLoadingTable } = productGetOnly();

    return (
        <>
            <>
                <div className={cx('slide-show-banner')}>
                    <SwiperBanner data={dataBannerAndCustomer} />
                </div>
                <div className={cx('slide-show-banner')}>
                    <SwiperCustomer
                        data={dataBannerAndCustomer.images_customer}
                        showImageCustomer={true}
                        propsColorBtn={'var(--color-hover)'}
                        backgroundColor={'#f9eae9'}
                    />
                </div>

                {/* Product List */}
                <ViewListProductAuto
                    data={dataTable}
                    isLoading={isLoadingTable}
                    title={'BEST SELLER'}
                    nextBtnLink={'/123'}
                />
                {/* NEWS */}
                <News />
                {/* Specification */}
                <ViewSpecification />
            </>
        </>
    );
}

export default Home;
