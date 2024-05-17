'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/ProductDetail.module.scss';
import { Container } from 'react-bootstrap';
import ProductGallery from '@/components/ProductGallery';
import { Archivo } from 'next/font/google';
import { Poppins } from 'next/font/google';
import { DecreaseIcon, IncreaseIcon } from '@/components/Icons';
import ViewListProductAuto from '@/components/HomeComponents/ViewListProductAuto';
import Breadcrumb from '@/components/Breadcrumb';

const archivo = Archivo({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['italic', 'normal'],
});
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700'],
    style: ['italic', 'normal'],
});
const cx = classNames.bind(styles);

function ProductDetail() {
    return (
        <>
            <Breadcrumb />
            <div className={cx('product-template-wrapper')}>
                <section className={cx('section-product-template')}>
                    <Container className="container-flush">
                        <div className={cx('product-cover')}>
                            <div className={cx('product-inner')}>
                                <div className={cx('product-block-list')}>
                                    <ProductGallery />
                                    <div className={cx('product-info-item')}>
                                        <div className={cx('card', 'card-info')}>
                                            <div className={cx('card-section')}>
                                                <div className={cx('product-meta')}>
                                                    <h1
                                                        className={`${cx('product-meta-title')} h1 heading ${
                                                            archivo.className
                                                        }`}
                                                    >
                                                        Clear Glass Dining Table | La Forma Burano
                                                    </h1>
                                                    <div className={cx('product-meta-reference')}>
                                                        <a className={cx('product-meta-vendor')}>Gỗ Sồi</a>
                                                        <span className={cx('product-meta-sku')}>
                                                            SKU:
                                                            <span>TKA51056</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <hr className={cx('card-separator')} />
                                                <div className={cx('product-meta-info')}>
                                                    <div className={cx('product-meta-info-list')}>
                                                        <div className={cx('product-meta-info-item')}>
                                                            <span className={cx('product-meta-info-heading')}>
                                                                Price:
                                                            </span>
                                                            <div className={cx('price-wrapper')}>
                                                                <h4>22,000,000đ</h4>
                                                                {/* <span>30.000.000</span> */}
                                                            </div>
                                                        </div>
                                                        <div className={cx('product-meta-info-item')}>
                                                            <span className={cx('product-meta-info-heading')}>
                                                                Stock:
                                                            </span>
                                                            <span className={cx('product-meta-status')}>IN STOCK</span>
                                                            {/* <span className={cx('product-meta-status', 'out-stock')}>
                                                            OUT STOCK
                                                        </span> */}
                                                        </div>
                                                        <div className={cx('product-meta-info-item')}>
                                                            <span className={cx('product-meta-info-heading')}>
                                                                Quantity:
                                                            </span>
                                                            <div className={cx('product-meta-info-selector-button')}>
                                                                <div className={cx('mini-cart-item-quantity')}>
                                                                    <div className={cx('quantity-selector')}>
                                                                        <button
                                                                            className={cx('quantity-selector-button')}
                                                                        >
                                                                            <DecreaseIcon
                                                                                className={cx('icon-decrease')}
                                                                            />
                                                                        </button>
                                                                        <input
                                                                            className={cx('quantity-selector-value')}
                                                                            value={'0'}
                                                                        />
                                                                        <button
                                                                            className={cx('quantity-selector-button')}
                                                                        >
                                                                            <IncreaseIcon
                                                                                className={cx('icon-increase')}
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('product-meta-info-add-to-cart')}>
                                                        <button>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('product-description-item')}>
                                        <div className={cx('card')}>
                                            <div className={cx('card-header')}>
                                                <h2 className={`${cx('card-title ')} h3 heading ${archivo.className}`}>
                                                    Description
                                                </h2>
                                            </div>
                                            <div className={cx('card-section')}>
                                                <div className={cx('product-description')}>
                                                    <div className={cx('product-mardown-text')}>
                                                        <p>
                                                            The Mina natural rattan varnished armchair has a cleverly
                                                            structured reclined sitting position which provides
                                                            excellent back support and a super relaxing sitting
                                                            experience. Made from woven vegetable fibers, this classic
                                                            Asian chair can give your living space a lift with its
                                                            natural materials and light colors.{' '}
                                                        </p>
                                                        <ul>
                                                            <li>W26 x D28 x H29 in | Weight 9lbs</li>
                                                            <li>W65 x D72 x H73 cm | Weight 4kgs</li>
                                                            <li>W26 x D28 x H29 in | Weight 9lbs</li>
                                                            <li>5-year warranty & exclusive French design</li>
                                                        </ul>
                                                        <p>
                                                            <a>Download Care Instructions</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('product-content-item')}>
                                        <div className={cx('card')}>
                                            <div className={cx('card-header')}>
                                                <h2 className={`${cx('card-title ')} h3 heading ${archivo.className}`}>
                                                    Basic Care Instructions
                                                </h2>
                                            </div>
                                            <div className={cx('card-section')}>
                                                <div className={cx('product-mardown-text')}>
                                                    <ul>
                                                        <li>
                                                            <span>
                                                                For regular dusting use a dry cloth. For cleaning or in
                                                                case of a spill, use a damp cloth and natural soap. Dry
                                                                with a soft clean cloth. Do not use abrasive products
                                                                when cleaning. For more information please download the
                                                                care instructions below.
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('product-shipping-item')}>
                                        <div className={cx('card')}>
                                            <div className={cx('card-header')}>
                                                <h2 className={`${cx('card-title ')} h3 heading ${archivo.className}`}>
                                                    Shipping & Return Policy
                                                </h2>
                                            </div>
                                            <div className={cx('card-section')}>
                                                <div className={cx('product-mardown-text', 'shipping')}>
                                                    <ul>
                                                        <li>FREE Shipping on all USA orders over $999.</li>
                                                        <li>
                                                            <a href="https://woodfurniture.com/collections/quick-ship">
                                                                Quick Ship{' '}
                                                            </a>
                                                            items ship within 10 - 14 business days.
                                                        </li>
                                                        <li>
                                                            Products in stock in EU ship in 4 - 8 weeks and are custom
                                                            ordered from Europe. For this reason, orders cannot be
                                                            cancelled after 24 hours.
                                                        </li>
                                                        <li>
                                                            You may request an order cancellation as long as it is
                                                            received within 24 hours of completing your purchase.
                                                        </li>
                                                        <li>
                                                            Read more about our{' '}
                                                            <a href="https://woodfurniture.com/pages/shipping-return-policy">
                                                                Shipping & Return Policy.
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
            <div className={cx('product-recommendations-wrapper')}>
                <section className={cx('section-product-recommendations')}>
                    <ViewListProductAuto title={'You may also like'} />
                </section>
            </div>
        </>
    );
}

export default ProductDetail;
