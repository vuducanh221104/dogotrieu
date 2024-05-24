import classNames from 'classnames/bind';
import styles from '@/styles/Trade.module.scss';
import { DividerSymbol, InstaIcon } from '@/components/Icons';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
const cx = classNames.bind(styles);
function PageTrade() {
    return (
        <>
            <div className={cx('trade-wrapper')}>
                <div className={cx('trade-inner')}>
                    <header className={cx('trade-header')}>
                        <div className={cx('trade-heading')}>
                            <h3 className={cx('trade-h3')}>
                                Get Access to 28+ Furniture, Lighting & Decor Brands & 25K Designs
                            </h3>
                            <div className={cx('trade-separated')}>
                                <span>
                                    <DividerSymbol className={cx('icon-divider-symbol')} />
                                </span>
                            </div>
                        </div>
                        <div className={cx('trade-image-gobal')}>
                            <img
                                src="https://cdn.shopify.com/s/files/1/0285/8683/6027/files/graceful-swing-kari-fluire-forma-rheolog-una-1.jpg?v=1713525266"
                                alt="image"
                            />
                        </div>
                        <div className={cx('trade-des-1')}>
                            <div className={cx('trade-des-1-inner')}>
                                <h3 className={cx('des-1-heading')}>You asked, we delivered!</h3>
                                <h1 className={cx('des-1-heading2')}>The WOOD Trade Difference</h1>
                            </div>
                        </div>
                        <div className={cx('trade-des-2')}>
                            <div className={cx('trade-des-2-inner')}>
                                <p>
                                    Wood Furniture is part of the OROA Group: a distributor for several European brands
                                    in the US and the EU.{' '}
                                </p>
                                <p>
                                    We are happy to announce that our exclusive Trade Program for all our brands is now
                                    available in{' '}
                                </p>
                                <p>
                                    <a href="/">OROA Trade</a>, you get access to exclusive discounts, the latest
                                    collections, the best service from trade consultants, and access to some of the most
                                    unique brands from Europe!
                                </p>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
            <ViewSpecification />
        </>
    );
}

export default PageTrade;
