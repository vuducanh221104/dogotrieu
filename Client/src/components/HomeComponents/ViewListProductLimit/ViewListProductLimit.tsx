'use client';
import styles from './ViewListProductLimit.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
// import { useEffect, useState } from 'react';
// import SwiperBanner from '@/components/Swiper/SwiperBanner';
// import SwiperCustomer from '@/components/Swiper/SwiperCustomer';
// import { Col, Container, Row } from 'react-bootstrap';
// const cx = classNames.bind(styles);

// 6 Product View
function ViewListProductLimit() {
    // const data = {
    //     images_banner: [
    //         'https://woodfurniture.com/cdn/shop/files/Wood-Furniture-Rooted-in-Nature_4fa3ddde-6916-48cf-89c6-2301ce4211e1_1200x.jpg?v=1712742370',
    //         'https://woodfurniture.com/cdn/shop/files/Wood-Furniture-Earth-Day_2000x.jpg?v=1713773127',
    //         'https://woodfurniture.com/cdn/shop/files/Wood-Furniture-Outdoor-2024_1200x.jpg?v=1709652074',
    //     ],

    //     images_customer: [
    //         'https://minhtuanmobile.com/uploads/slide/231117042652-tienlinh.jpg',
    //         'https://minhtuanmobile.com/uploads/slide/231117042652-tienluat.jpg',
    //         'https://minhtuanmobile.com/uploads/slide/231117042653-tolam.jpg',
    //         'https://minhtuanmobile.com/uploads/slide/231117042653-truonggiang.jpg',
    //         'https://minhtuanmobile.com/uploads/slide/231117042653-truongloc.jpg',
    //         'https://minhtuanmobile.com/uploads/slide/231117042653-truongloc.jpg',
    //         'https://minhtuanmobile.com/uploads/slide/231117042653-truongthaonhi.jpg',
    //         'https://minhtuanmobile.com/uploads/slide/231117042653-vominhkhai.jpg',
    //     ],
    // };
    return (
        <>
            {/* <div className={cx('product-wrapper')}>
                <Container>
                    <div className={cx('product-inner')}>
                        <h3 className={cx('product-heading')}>Best Sellers</h3>
                        <Row md={12} xl={12} className={'guttersCustom'}>
                            {data.images_customer.map((item, index) => (
                                <Col xs={6} sm={6} md={4} lg={3} xl={3} xxl={3}>
                                    <a href="/">
                                        <div className={cx('product-item')}>
                                            <div className={cx('product-image')}>
                                                <div className={cx('aspect-ratio')}>
                                                    <img
                                                        src="https://woodfurniture.com/cdn/shop/files/BLA02-330-01_00326_300x.png?v=1712314476"
                                                        alt="image-product"
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('product-info')}>
                                                <h3 className={cx('product-vendor')}>BOLIA</h3>
                                                <h2 className={cx('product-name')}>
                                                    Oak Scandinavian Lounge Armchair | Bolia Bowie
                                                </h2>
                                                <div className={cx('product-price-wrapper')}>
                                                    <p className={cx('product-price-real')}>$4,555</p>
                                                    <p className={cx('product-price-discount')}>$5,555</p>
                                                </div>
                                                <span className={cx('product-status')}>IN STOCK</span>
                                            </div>
                                        </div>
                                    </a>
                                </Col>
                            ))}
                        </Row>
                        <div className={cx('button-see-all')}>
                            <button>
                                <a href="/">View All</a>
                            </button>
                        </div>
                    </div>
                </Container>
            </div> */}
        </>
    );
}

export default ViewListProductLimit;
