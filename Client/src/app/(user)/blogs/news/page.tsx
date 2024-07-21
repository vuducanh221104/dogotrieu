'use client';
import { Suspense } from 'react';
import classNames from 'classnames/bind';
import styles from '@/styles/NewsHome.module.scss';
import { Container } from 'react-bootstrap';
import { FacebookIcon, InstaIcon, PrinterestIcon, YoutubeIcon } from '@/components/Icons';
import MapMini from '@/components/MapMini';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import { archivo, poppins } from '@/assets/FontNext';
import config from '@/config';
import Loading from '@/components/Loading';
import { newGetAllLimit } from '@/services/newsServices';
import slugify from 'slugify';
import Link from 'next/link';
import PaginationNews from '@/components/PaginationNews';
import { useRouter, useSearchParams } from 'next/navigation';
import NotFound from '@/components/NotFound';
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function NewsHome() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [pageParam, setPageParam] = useState('1');
    const limitParam = '5';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const page = searchParams.get('page') || '1';
            setPageParam(page);
        }
    }, [searchParams]);

    const { data, isLoading, error } = newGetAllLimit(`?page=${pageParam}&limit=${limitParam}`);

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    const handlePageChange = (page: number) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', page.toString());
        router.push(`?${queryParams.toString()}`);
    };

    if (isLoading) {
        return <Loading />;
    }
    if (error || data.data.length === 0) {
        return <NotFound />;
    } else {
        return (
            <>
                <div className={cx('news-wrapper')}>
                    <Container>
                        <header className={cx('news-header')}>
                            <h1>News</h1>
                        </header>
                        <div className={cx('news-body')}>
                            <section className={cx('section')} style={{ display: 'block' }}>
                                <div className={cx('news-content')}>
                                    <div className={cx('news-list')}>
                                        {data?.data.map((item: any) => (
                                            <div className={cx('news-item')} key={item._id}>
                                                <div className={cx('article-item')}>
                                                    <Link
                                                        href={`${config.routes.news}/${handleSlugify(item.title)}-${
                                                            item._id
                                                        }.html`}
                                                        className={cx('news-item-link')}
                                                    >
                                                        <div className={cx('aspect-ratio')}>
                                                            <CldImage
                                                                width={'1000'}
                                                                height={'562'}
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
                                                            className={cx(archivo.className)}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </h3>
                                                    <p
                                                        className={`${cx('news-item-description')} ${
                                                            poppins.className
                                                        }`}
                                                    >
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <PaginationNews
                                    totalPages={data?.totalPages}
                                    currentPage={parseInt(pageParam, 10)}
                                    onPageChange={handlePageChange}
                                />
                            </section>

                            <div className={cx('news-content-extra')}>
                                <div className={cx('news-content-extra-wrapper')}>
                                    <MapMini />
                                    <div className={cx('news-content-extra-inner')}>
                                        <h4>Follow Us</h4>
                                        <ul className={cx('news-content-extra-list')}>
                                            <li className={cx('news-content-extra-item')}>
                                                <a href={config.routesSocial.facebook}>
                                                    <FacebookIcon className={cx('icon-social', 'facebook')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a href={config.routesSocial.instagram}>
                                                    <InstaIcon className={cx('icon-social', 'instagram')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a href={config.routesSocial.printerest}>
                                                    <PrinterestIcon className={cx('icon-social', 'pinterest')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a href={config.routesSocial.youtube}>
                                                    <YoutubeIcon className={cx('icon-social', 'youtube')} />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <ViewSpecification />
            </>
        );
    }
}

export default function NewsHomeWrapper() {
    return (
        <Suspense fallback={<Loading />}>
            <NewsHome />
        </Suspense>
    );
}
