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
import { newGetTaggedPagination } from '@/services/newsServices';
import slugify from 'slugify';
import Link from 'next/link';
import PaginationNews from '@/components/PaginationNews';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import NotFound from '@/components/NotFound';
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { dataTaggedNews } from '@/services/menuData/menuData';

const cx = classNames.bind(styles);

function News() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    const [pageParam, setPageParam] = useState<string>('1');
    const limitParam = '5';
    const { slug } = params;
    const query = `?page=${pageParam}&limit=${limitParam}`;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const page = searchParams.get('page') || '1';
            setPageParam(page);
        }
    }, [searchParams]);

    const { data, isLoading, error } = newGetTaggedPagination(slug, query);

    const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');

    const handlePageChange = (page: number) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', page.toString());
        router.push(`?${queryParams.toString()}`);
    };

    const dataTagged = dataTaggedNews;

    if (isLoading) {
        return <Loading />;
    }
    if (error || data?.data.length === 0) {
        return <NotFound />;
    } else {
        return (
            <>
                <div className={cx('news-wrapper')}>
                    <Container>
                        <header className={cx('news-header')}>
                            <h1 className={archivo.className}>TIN TỨC</h1>
                            <div className={cx('new-data-list')}>
                                <ul>
                                    {dataTagged.map((item: any) => (
                                        <li key={item.id} className={cx(slug === item.url && 'active')}>
                                            <Link href={`/blogs/news/tagged/${item.url}`}>{item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </header>
                        <div className={cx('news-body')}>
                            <section className={cx('section')} style={{ display: 'block' }}>
                                <div className={cx('news-content')}>
                                    <div className={cx('news-list')}>
                                        {data?.data.map((item: any) => (
                                            <div className={cx('news-item')} key={item._id}>
                                                <div className={cx('article-item')}>
                                                    <Link
                                                        href={`${config.routes.newsDetail}/${handleSlugify(
                                                            item.title,
                                                        )}-${item._id}.html`}
                                                        className={cx('news-item-link')}
                                                    >
                                                        <div className={cx('aspect-ratio')}>
                                                            <CldImage
                                                                width={1200}
                                                                height={678}
                                                                src={item.thumb}
                                                                alt={item.title}
                                                                className={cx('news-item-image-cover')}
                                                            />
                                                        </div>
                                                    </Link>
                                                    <h2 className={cx('news-item-title')}>
                                                        <Link
                                                            href={`${config.routes.newsDetail}/${handleSlugify(
                                                                item.title,
                                                            )}-${item._id}.html`}
                                                            className={cx(archivo.className)}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </h2>
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
                                                <a
                                                    href={config.routesSocial.facebook}
                                                    aria-label="Facebook Đồ Gỗ Triệu"
                                                >
                                                    <FacebookIcon className={cx('icon-social', 'facebook')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    href={config.routesSocial.instagram}
                                                    aria-label="Instagram Đồ Gỗ Triệu"
                                                >
                                                    <InstaIcon className={cx('icon-social', 'instagram')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    href={config.routesSocial.printerest}
                                                    aria-label="Printerest Đồ Gỗ Triệu"
                                                >
                                                    <PrinterestIcon className={cx('icon-social', 'pinterest')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a href={config.routesSocial.youtube} aria-label="Youtube Đồ Gỗ Triệu">
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

export default function NewsContent() {
    return (
        <Suspense fallback={<Loading />}>
            <News />
        </Suspense>
    );
}
