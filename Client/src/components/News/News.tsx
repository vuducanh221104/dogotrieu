'use client';
import classNames from 'classnames/bind';
import styles from './News.module.scss';
import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { dataNews } from '@/services/mockApi';
import config from '@/config';
import useWindowWidth from '@/hooks/useWindowWidth';
import { archivo, poppins } from '@/assets/FontNext';

const cx = classNames.bind(styles);
function News() {
    const data = dataNews;
    const windowWidth = useWindowWidth();

    return (
        <div className={`${cx('news-wrapper')} ${archivo.className}`}>
            <Container>
                <div className={cx('news-inner')}>
                    <h3 className={cx('news-heading')}>
                        <div className={cx('news-heading-title')}>NEWS & VIEWS</div>
                        <div className={cx('news-heading-view-all')}>
                            <a href="/" className={`${poppins.className}`}>
                                View All
                                <FontAwesomeIcon icon={faArrowRight} className={cx('icon-arrow-right')} />
                            </a>
                        </div>
                    </h3>

                    {windowWidth >= 1000 ? (
                        <div className={cx('block-list')}>
                            {data.map((item: any, index: any) => (
                                <div className={cx('block-list-item')}>
                                    <div className={cx('news-item')}>
                                        <a href={`${config.routes.news}/${item.slug}`} className={cx('news-item-link')}>
                                            <div className={cx('aspect-ratio')}>
                                                <img
                                                    src={item.image_cover}
                                                    alt={item.title}
                                                    className={cx('news-item-image-cover')}
                                                />
                                            </div>
                                        </a>
                                        <h3 className={cx('news-item-title')}>
                                            <a href={`${config.routes.news}/${item.slug}`}>{item.title}</a>
                                        </h3>
                                        <p className={`${cx('news-item-description')} ${poppins.className}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={cx('scroller')}>
                            <div className={cx('scroller-inner')}>
                                <div className={cx('block-list')}>
                                    {data.map((item: any, index: any) => (
                                        <div className={cx('block-list-item')}>
                                            <div className={cx('news-item')}>
                                                <a
                                                    href={`${config.routes.news}/${item.slug}`}
                                                    className={cx('news-item-link')}
                                                >
                                                    <div className={cx('aspect-ratio')}>
                                                        <img
                                                            src={item.image_cover}
                                                            alt={item.title}
                                                            className={cx('news-item-image-cover')}
                                                        />
                                                    </div>
                                                </a>
                                                <h3 className={cx('news-item-title')}>
                                                    <a href={`${config.routes.news}/${item.slug}`}>{item.title}</a>
                                                </h3>
                                                <p className={`${cx('news-item-description')} ${poppins.className}`}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default News;
