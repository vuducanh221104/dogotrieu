'use client';
import styles from '@/styles/Home.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import SwiperBanner from '@/components/Swiper/SwiperBanner';
import SwiperCustomer from '@/components/Swiper/SwiperCustomer';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import News from '@/components/News';
import ViewListProductAuto from '@/components/HomeComponents/ViewListProductAuto';
import { homeGet } from '@/services/homeServices';
import Loading from '@/components/Loading';

const cx = classNames.bind(styles);

function Home() {
    const { data, error, isLoading } = homeGet();

    const dataHome = data && data.length > 0 ? data[0] : null;
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <>
                <>
                    {/* Image Banner */}
                    <div className={cx('slide-show-banner')}>
                        <SwiperBanner data={dataHome} isLoading={isLoading} />
                    </div>

                    {/* Image Customer */}
                    <div className={cx('slide-show-banner')}>
                        <SwiperCustomer
                            data={dataHome?.images_customer}
                            showImageCustomer={true}
                            propsColorBtn={'var(--color-hover)'}
                            backgroundColor={'#f9eae9'}
                        />
                    </div>

                    {/* Product List */}
                    {dataHome?.featured_product.map((item: any, index: number) => (
                        <ViewListProductAuto
                            key={index}
                            query={item.query}
                            isLoading={isLoading}
                            title={item.title}
                            nextBtnLink={item.link_view_all}
                        />
                    ))}

                    {/* NEWS */}
                    <News />

                    {/* Specification */}
                    <ViewSpecification />
                </>
            </>
        );
    }
}

export default Home;
