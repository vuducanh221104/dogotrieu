import classNames from 'classnames/bind';
import styles from '@/styles/About.module.scss';
import { lato, playFairDisplay } from '@/assets/FontNext';
import Link from 'next/link';
const cx = classNames.bind(styles);

function PageAboutUs() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-inner')}>
                <div className={cx('wrapper-content', 'first')}>
                    <div className={cx('wrapper-content-bonus')}>
                        <div className={cx('column')}>
                            <h3 className={`${cx('heading')} ${playFairDisplay.className}`}>ABOUT US</h3>
                            <p className={lato.className}>
                                <span>
                                    <Link href="/" className={cx('link-color')}>
                                        Woodfurniture{' '}
                                    </Link>
                                    presents a distinctive assortment of European wood furniture, lighting & decor
                                    brands. Our founding values are sustainability, longevity, exclusivity, and quality.
                                    Our brands offer a refreshing aesthetic and help you revamp your space or simply
                                    make a lovely addition to your home! Explore a variety of brands like and much more.
                                    Discover beautiful premium pieces, and create an ethically conscious combination of
                                    comfort and style.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-content', 'second')}>
                    <div className={cx('wrapper-content-bonus')}>
                        <div className={cx('column')}>
                            <img
                                src="https://cdn.shopify.com/s/files/1/0285/8683/6027/t/12/assets/woodf-1673283754975.jpg?v=1673283756"
                                alt="?"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-content', 'third')}>
                    <div className={cx('config-flex')}>
                        <div className={cx('wrapper-image-right')}>
                            <div className={cx('wrapper-image-right-content')}>
                                <div className={cx('column')}>
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0285/8683/6027/t/12/assets/wood-furniture-1673524804364.png?v=1673524808"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('wrapper-content-bonus')}>
                            <div className={cx('column')}>
                                <div className={cx('heading-wrapper')}>
                                    <h3 className={`${cx('heading')} ${playFairDisplay.className}`}>LOVE FOR DESIGN</h3>
                                </div>
                                <div className={`${cx('description-wrapper')} ${lato.className}`}>
                                    <div className={cx('column-padding')}>
                                        <p>
                                            We love the design and the journey that comes with it from the creative
                                            inception process to the premium finished product in the showroom, and
                                            finally to the heart of your home. Our wonderful partnered brands
                                            collaborate with designers from across the world to create original
                                            captivating designs. We genuinely love the brands that we sell and are proud
                                            to deliver a personal, friendly service with every purchase - online or
                                            in-store. Our International team of professional specialists brings WOOD
                                            FURNITURE to life each day with their inspiration, dedication, and talent.
                                            If you need help or have questions,
                                            <a>
                                                we are available via email, phone, or live chat to offer advice and
                                                answer questions.
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-content', 'fourth')}>
                    <div className={cx('wrapper-content-bonus')}>
                        <div className={cx('config-flex')}>
                            <div className={cx('wrapper-content-bonus')}>
                                <div className={cx('column-padding')}>
                                    <div className={cx('heading-wrapper')}>
                                        <h3 className={`${cx('heading')} ${playFairDisplay.className}`}>
                                            KNOWLEDGE IN THE FIELD
                                        </h3>
                                    </div>
                                    <div className={`${cx('description-wrapper')} ${lato.className}`}>
                                        <div className={cx('column-padding')}>
                                            <p>
                                                Our experts have the experience to help you bring your vision to life.
                                                Whether you need a Free Design Consultation or you are an industry
                                                professional looking to join our Trade Program.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('wrapper-image-right')}>
                                <div className={cx('wrapper-image-right-content')}>
                                    <div className={cx('column-padding')}>
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0285/8683/6027/t/12/assets/wood-dining-1673524934922.png?v=1673524939"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('wrapper-content-bonus')}>
                                <div className={cx('column-padding')}>
                                    <div className={cx('heading-wrapper')}>
                                        <h3 className={`${cx('heading')} ${playFairDisplay.className}`}>WE AIM HIGH</h3>
                                    </div>
                                    <div className={`${cx('description-wrapper')} ${lato.className}`}>
                                        <div className={cx('column-padding')}>
                                            <p>
                                                Our team is always ready to assist with any questions you may have about
                                                design, specifications, availability, or price. We pride ourselves on
                                                our transparency and quality of customer service. Don’t hesitate to
                                                contact us via call, email, or chat. We would be happy to help!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper-content', 'five')}>
                    <div className={cx('wrapper-content-bonus')}>
                        <div className={cx('column')}>
                            <img
                                src="https://cdn.shopify.com/s/files/1/0285/8683/6027/t/12/assets/ethnicraft-copia-1673282645219_1000x.jpg?v=1673282646"
                                alt="?"
                            />
                        </div>
                    </div>
                </div>
                <div className={`${cx('footer')} ${lato.className}`}>
                    <a href="/">info@woodfurniture.com </a>| 844+ 443-WOOD|
                </div>
            </div>
        </div>
    );
}

export default PageAboutUs;
