'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/NewsDetail.module.scss';
import { Container } from 'react-bootstrap';
import { FacebookIcon, InstaIcon, PrinterestIcon, YoutubeIcon } from '@/components/Icons';
import MapMini from '@/components/MapMini';
import { notFound, useParams } from 'next/navigation';
import { newsGetById } from '@/services/newsServices';
import Loading from '@/components/Loading';
import MarkdownRender from '@/components/MarkdownRender';
import { CldImage } from 'next-cloudinary';
import { Suspense } from 'react';
import { handleSplitSlug } from '@/utils/handleSplitSlug';
import { archivo } from '@/assets/FontNext';
import config from '@/config';
const cx = classNames.bind(styles);

function NewsDetailContent() {
    const { id } = useParams() as { id: string };

    const idNews = handleSplitSlug(id);
    const { data, isLoading, error } = newsGetById(idNews);
    if (isLoading) {
        return <Loading />;
    } else if (error || !data) {
        notFound();
    } else {
        return (
            <>
                <div className={cx('news-wrapper')}>
                    <Container>
                        <header className={cx('news-header', archivo.className)}>
                            <h1>{data.title}</h1>
                            <p>{data.description}</p>
                        </header>
                        <div className={cx('news-body', archivo.className)}>
                            {/* ROW 1 */}
                            <div className={cx('news-content')}>
                                <div className={cx('aspect-ratio')}>
                                    <CldImage width={1200} height={870} src={data.thumb} alt={data.title} />
                                </div>
                                <div className={cx('news-description')}>
                                    <MarkdownRender content={data.content} />
                                </div>
                                <div className={cx('news-footer')}>
                                    <div className={cx('aspect-ratio')}>
                                        <CldImage
                                            width={1000}
                                            height={700}
                                            src="https://res.cloudinary.com/do4zld720/image/upload/v1726669926/cp0wpj6dixakireei57x?_a=BAVAZGDW0"
                                            alt="Banner DOGOTRIEU.COM"
                                        />
                                    </div>

                                    <h4 className={cx('text-footer-header')}>ĐỒ GỖ TRIỆU</h4>
                                    <h4>
                                        <strong>Cửa Hàng : </strong>
                                        24 Lương Định Của, Trần Não, TP.Thủ Đức, TP.HCM
                                    </h4>
                                    <h4>
                                        <strong>Kho, Xưởng : </strong>
                                        25/4 Xuân Thủy, Thảo Điền, TP.Thủ Đức, TP.HCM
                                    </h4>
                                    <h4>
                                        <strong>Email : </strong>
                                        dogotrieu@gmail.com
                                    </h4>
                                    <p className={cx('text-red')}>Hotline/Zalo: 0348483612 (Em Lan)</p>
                                </div>
                            </div>
                            {/* ROW 2 */}
                            <div className={cx('news-content-extra')}>
                                <div className={cx('news-content-extra-wrapper')}>
                                    <MapMini />
                                    <div className={cx('news-content-extra-inner')}>
                                        <h4>Follow Us</h4>
                                        <ul className={cx('news-content-extra-list')}>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    href={config.routesSocial.facebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Facebook Đồ Gỗ Triệu"
                                                >
                                                    <FacebookIcon className={cx('icon-social', 'facebook')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    href={config.routesSocial.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Instagram Đồ Gỗ Triệu"
                                                >
                                                    <InstaIcon className={cx('icon-social', 'instagram')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    href={config.routesSocial.printerest}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Printerest Đồ Gỗ Triệu"
                                                >
                                                    <PrinterestIcon className={cx('icon-social', 'pinterest')} />
                                                </a>
                                            </li>
                                            <li className={cx('news-content-extra-item')}>
                                                <a
                                                    href={config.routesSocial.youtube}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
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

export default function NewsDetail() {
    return (
        <Suspense fallback={<Loading />}>
            <NewsDetailContent />
        </Suspense>
    );
}
