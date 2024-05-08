'use client';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { FacebookIcon, InstaIcon, PrinterestIcon, YoutubeIcon } from '@/components/Icons';
import styles from './NewsDetail.module.scss';
import MapMini from '@/components/MapMini';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
const cx = classNames.bind(styles);
function NewsDetail() {
    return (
        <>
            <div className={cx('news-wrapper')}>
                <Container>
                    <header className={cx('news-header')}>
                        <h1>Discover Sustainable Luxury With Bolia</h1>
                    </header>
                    <div className={cx('news-body')}>
                        {/* ROW 1 */}
                        <div className={cx('news-content')}>
                            <div className={cx('aspect-ratio')}>
                                <img
                                    src="https://woodfurniture.com/cdn/shop/articles/BOLIA-WOOD-FURNITURE_ba487202-85a2-4da7-ab74-10c1983ccfd2_1200x.jpg?v=1714398844"
                                    alt="image"
                                />
                            </div>
                            <div className={cx('news-description')}>
                                <strong>
                                    Elevate your space with furniture that's as eco-conscious as it is stylish.
                                    Introducing the latest brand addition to Wood Furniture: <a href="/">Bolia</a>. This
                                    international design company was established in 2000, creating beautiful areas at
                                    home, at work, and in the space in between. Inspired by modern Scandinavian design,
                                    the brand showcases quality pieces crafted from sustainable materials and
                                    personalized designs.
                                </strong>
                                <br />
                                <br />
                                <br />
                                <strong>How Bolia Redefines Home Décor?</strong>
                                <br />
                                <br />
                                <br />

                                <p>
                                    <strong>1. Sustainability:</strong>
                                    Bolia is committed to crafting furniture from sustainable materials, prioritizing
                                    eco-conscious practices without compromising on quality or style. Each piece
                                    reflects our dedication to environmental responsibility.
                                </p>
                                <p>
                                    <strong>2. Personalization:</strong>
                                    Explore personalized designs that reflect your individual taste and elevate your
                                    space to new heights. Bolia offers bespoke solutions to meet your unique needs,
                                    whether at home or in the office.
                                </p>
                                <p>
                                    <strong>3. Inclusivity:</strong>
                                    At Bolia, we celebrate honesty, trust, and diversity. Our culture fosters
                                    inclusivity and empowerment, inspiring personal growth and innovation among our team
                                    members.
                                </p>
                                <p>
                                    <strong>4. Creativity:</strong>
                                    Our furniture is designed to inspire creativity and blur the boundaries between work
                                    and home. Each piece is carefully crafted to create beautiful and functional spaces
                                    that rejuvenate and inspire.
                                </p>
                                <p>
                                    <strong></strong>
                                    5. Scandinavian Aesthetics: Drawing inspiration from Scandinavian design principles,
                                    Bolia furniture combines timeless elegance with modern functionality. Experience the
                                    harmonious blend of form and function in every piece.
                                </p>
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

export default NewsDetail;
