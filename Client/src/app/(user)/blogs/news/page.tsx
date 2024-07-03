'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/NewsHome.module.scss';
import { Container } from 'react-bootstrap';
import { ChervonRight, FacebookIcon, InstaIcon, PrinterestIcon, YoutubeIcon } from '@/components/Icons';
import MapMini from '@/components/MapMini';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import { dataNews } from '@/services/mockApi';
import { archivo, poppins } from '@/assets/FontNext';
import config from '@/config';
import Loading from '@/components/Loading';

const cx = classNames.bind(styles);
function NewsHome() {
    const data = dataNews;
    // if(isLoading){
    //     return <Loading/>
    // }
    // else{

    // }
    return (
        <>
            <div className={cx('news-wrapper')}>
                <Container>
                    <header className={cx('news-header')}>
                        <h1>News</h1>
                    </header>
                    <div className={cx('news-body')}>
                        <section className={cx('section')} style={{ display: 'block' }}>
                            {/* ROW 1 */}
                            <div className={cx('news-content')}>
                                <div className={cx('news-list')}>
                                    {data.map((item, index) => (
                                        <div className={cx('news-item')}>
                                            <div className={cx('article-item')}>
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
                                                    <a href="/" className={cx(archivo.className)}>
                                                        {item.title}
                                                    </a>
                                                </h3>
                                                <p className={`${cx('news-item-description')} ${poppins.className}`}>
                                                    {item.meta}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('news-pagination')}>
                                <div className={cx('news-pagination-inner')}>
                                    <div className={cx('news-pagination-nav')}>
                                        <a href="/" className={cx('news-pagination-nav-item', 'active')}>
                                            1
                                        </a>
                                        <a href="/" className={cx('news-pagination-nav-item')}>
                                            2
                                        </a>
                                        <a href="/" className={cx('news-pagination-nav-item')}>
                                            3
                                        </a>
                                    </div>
                                    <a href="/" className={cx('news-pagination-next')}>
                                        Next
                                        <ChervonRight className={cx('news-pagination-next-icon')} />
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* ROW 2 */}
                        <div className={cx('news-content-extra')}>
                            <div className={cx('news-content-extra-wrapper')}>
                                <MapMini />
                                <div className={cx('news-content-extra-inner')}>
                                    <h4>Follow Us</h4>
                                    <ul className={cx('news-content-extra-list')}>
                                        <li className={cx('news-content-extra-item')}>
                                            <a href="/">
                                                <FacebookIcon className={cx('icon-social', 'facebook')} />
                                            </a>
                                        </li>
                                        <li className={cx('news-content-extra-item')}>
                                            <a href="/">
                                                <InstaIcon className={cx('icon-social', 'instagram')} />
                                            </a>
                                        </li>
                                        <li className={cx('news-content-extra-item')}>
                                            <a href="/">
                                                <PrinterestIcon className={cx('icon-social', 'pinterest')} />
                                            </a>
                                        </li>
                                        <li className={cx('news-content-extra-item')}>
                                            <a href="/">
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

export default NewsHome;
