'use client';
import classNames from 'classnames/bind';
import styles from './NewsArticle.module.scss';
import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { newsFeaturedGet } from '@/services/newsServices';
import config from '@/config';
import useWindowWidth from '@/hooks/useWindowWidth';
import { archivo, poppins } from '@/assets/FontNext';
import { homeGet } from '@/services/homeServices';
import Link from 'next/link';
import slugify from 'slugify';
import { CldImage } from 'next-cloudinary';

const cx = classNames.bind(styles);
function NewsArticle() {
    const { data: homeData } = homeGet();
    const windowWidth = useWindowWidth();
    const featuredData = homeData && homeData[0]?.featured_news.map((id: string) => `ids=${id}`).join('&');
    const { data: news } = newsFeaturedGet(featuredData || []);
    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    //isloading ,error
    return (
        <div className={`${cx('news-wrapper')} ${archivo.className}`}>
            <Container>
                <div className={cx('news-inner')}>
                    <h3 className={cx('news-heading')}>
                        <div className={cx('news-heading-title')}>NEWS & VIEWS</div>
                        <div className={cx('news-heading-view-all')}>
                            <Link href={config.routes.news} className={`${poppins.className}`}>
                                View All
                                <FontAwesomeIcon icon={faArrowRight} className={cx('icon-arrow-right')} />
                            </Link>
                        </div>
                    </h3>

                    {windowWidth >= 1000 ? (
                        <div className={cx('block-list')}>
                            {news?.map((item: any, index: any) => (
                                <div className={cx('block-list-item')} key={item._id}>
                                    <div className={cx('news-item')}>
                                        <Link
                                            href={`${config.routes.newsDetail}/${handleSlugify(item.title)}-${
                                                item._id
                                            }.html`}
                                            className={cx('news-item-link')}
                                        >
                                            <div className={cx('aspect-ratio')}>
                                                <CldImage
                                                    width={600}
                                                    height={344}
                                                    src={item.thumb}
                                                    alt={item.title}
                                                    className={cx('news-item-image-cover')}
                                                />
                                            </div>
                                        </Link>
                                        <h3 className={cx('news-item-title')}>
                                            <Link
                                                href={`${config.routes.newsDetail}/${handleSlugify(item.title)}-${
                                                    item._id
                                                }.html`}
                                            >
                                                {item.title}
                                            </Link>
                                        </h3>
                                        {/* <p className={`${cx('news-item-description')} ${poppins.className}`}>
                                            <MarkdownRender content={cleanMarkDown(item.content)} />
                                        </p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={cx('scroller')}>
                            <div className={cx('scroller-inner')}>
                                <div className={cx('block-list')}>
                                    {news?.map((item: any, index: any) => (
                                        <div className={cx('block-list-item')} key={item._id}>
                                            <div className={cx('news-item')}>
                                                <Link
                                                    href={`${config.routes.news}/${handleSlugify(item.title)}-${
                                                        item._id
                                                    }.html`}
                                                    className={cx('news-item-link')}
                                                >
                                                    <div className={cx('aspect-ratio')}>
                                                        <CldImage
                                                            width={700}
                                                            height={400}
                                                            src={item.thumb}
                                                            alt={item.title}
                                                            className={cx('news-item-image-cover')}
                                                        />
                                                    </div>
                                                </Link>
                                                <h3 className={cx('news-item-title')}>
                                                    <Link
                                                        href={`${config.routes.news}/${handleSlugify(item.title)}-${
                                                            item._id
                                                        }.html`}
                                                    >
                                                        {item.title}
                                                    </Link>
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

export default NewsArticle;
