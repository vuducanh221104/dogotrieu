'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/NewsDetail.module.scss';
import { Container } from 'react-bootstrap';
import { FacebookIcon, InstaIcon, PrinterestIcon, YoutubeIcon } from '@/components/Icons';
import MapMini from '@/components/MapMini';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import { useParams } from 'next/navigation';
import { newsGetById } from '@/services/newsServices';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import MarkdownRender from '@/components/MarkdownRender';
import { CldImage } from 'next-cloudinary';
const cx = classNames.bind(styles);

function NewsDetail() {
    const { id } = useParams() as { id: string };

    const handleSplitSlug = () => {
        const temp = id.split('.html') ?? [];
        const temp2 = temp[0]?.split('-');
        const idNews = temp2[temp2.length - 1];
        return idNews;
    };
    let idNews = handleSplitSlug();
    const { data, isLoading, error } = newsGetById(idNews);
    if (isLoading) {
        return <Loading />;
    } else if (error) {
        return <NotFound />;
    } else {
        return (
            <>
                <div className={cx('news-wrapper')}>
                    <Container>
                        <header className={cx('news-header')}>
                            <h1>{data.title}</h1>
                            <p>{data.description}</p>
                        </header>
                        <div className={cx('news-body')}>
                            {/* ROW 1 */}
                            <div className={cx('news-content')}>
                                <div className={cx('aspect-ratio')}>
                                    <CldImage width={'1200'} height="1000" src={data.thumb} alt={data.title} />
                                </div>
                                <div className={cx('news-description')}>
                                    <MarkdownRender content={data.content} />
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
}

export default NewsDetail;
