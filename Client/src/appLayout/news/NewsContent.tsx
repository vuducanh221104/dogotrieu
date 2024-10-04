'use client';
import { MutableRefObject, Suspense } from 'react';
import classNames from 'classnames/bind';
import styles from '@/styles/NewsHome.module.scss';
import { Container } from 'react-bootstrap';
import { FacebookIcon, IconCheckCategory, InstaIcon, PrinterestIcon, XmarkIcon, YoutubeIcon } from '@/components/Icons';
import MapMini from '@/components/MapMini';
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
import { useClickAway } from '@uidotdev/usehooks';

const cx = classNames.bind(styles);

function News() {
    const [showOption, setShowOption] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    const [pageParam, setPageParam] = useState<string>('1');
    const limitParam = '5';
    const { slug } = params;
    const query = `?page=${pageParam}&limit=${limitParam}`;

    const refClickOutSide: MutableRefObject<any> = useClickAway(() => {
        setShowOption(false);
    });

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
    const taggedItem = dataTaggedNews.find((item: any) => item.url === slug);

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
                            <div className={cx('sort-by')}>
                                <div className={cx('wrapper-category-tippy')}>
                                    <div
                                        className={cx('globo-sort-options')}
                                        onClick={() => setShowOption(!showOption)}
                                        role="button"
                                        aria-label="Chọn Phương Thức Sắp Xếp"
                                    >
                                        <span> {taggedItem.title}</span>
                                    </div>
                                    <div
                                        className={cx('wrapper-tippy', showOption && 'onhide')}
                                        // onClick={()=>setShowOption(false)}
                                    >
                                        <div
                                            className={cx('value-picker-inner', showOption && 'onhide-mobile')}
                                            ref={refClickOutSide}
                                        >
                                            <div className={cx('value-picker-header')}>
                                                <span className={cx('value-picker-header-title')}>Danh Mục</span>
                                                <button className={cx('value-picker-button-close')}>
                                                    <XmarkIcon
                                                        width="17"
                                                        height="17"
                                                        onClick={() => setShowOption(false)}
                                                    />
                                                </button>
                                            </div>

                                            <div className={cx('value-picker-choice-list')}>
                                                {dataTagged.map((item: any) => (
                                                    <Link
                                                        key={item.id}
                                                        className={cx('filter-item', slug === item.url && 'active')}
                                                        href={`/blogs/news/tagged/${item.url}`}
                                                    >
                                                        {item.title}
                                                        <IconCheckCategory
                                                            width="18"
                                                            height="14"
                                                            className={cx(
                                                                'value-picker-icon-check',
                                                                slug === item.url && 'active',
                                                            )}
                                                        />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={config.routesSocial.facebook}
                                                    aria-label="Facebook Đồ Gỗ Triệu"
                                                >
                                                    <FacebookIcon className={cx('icon-social', 'facebook')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={config.routesSocial.instagram}
                                                    aria-label="Instagram Đồ Gỗ Triệu"
                                                >
                                                    <InstaIcon className={cx('icon-social', 'instagram')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={config.routesSocial.printerest}
                                                    aria-label="Printerest Đồ Gỗ Triệu"
                                                >
                                                    <PrinterestIcon className={cx('icon-social', 'pinterest')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={config.routesSocial.youtube}
                                                    aria-label="Youtube Đồ Gỗ Triệu"
                                                >
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
