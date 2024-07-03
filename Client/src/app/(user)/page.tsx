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
    console.log(data);
    // Kiểm tra nếu data tồn tại và có ít nhất một phần tử
    const dataHome = data && data.length > 0 ? data[0] : null;
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <>
                <>
                    <div className={cx('slide-show-banner')}>
                        <SwiperBanner data={dataHome} isLoading={isLoading} />
                    </div>
                    <div className={cx('slide-show-banner')}>
                        <SwiperCustomer
                            data={dataHome.images_customer}
                            showImageCustomer={true}
                            propsColorBtn={'var(--color-hover)'}
                            backgroundColor={'#f9eae9'}
                        />
                    </div>

                    {/* Product List */}
                    {dataHome?.featured_product.map((item: any) => (
                        <ViewListProductAuto
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
