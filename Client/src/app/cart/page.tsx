import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '@/styles/Cart.module.scss';
import { archivo } from '@/assets/FontNext';
import FormatPrice from '@/components/FormatPrice';
import { DecreaseIcon, IncreaseIcon } from '@/components/Icons';
import CartEmpty from '@/components/CartEmpty';
const cx = classNames.bind(styles);

function PageCart() {
    return (
        <div className={cx('page-cart')}>
            <section className={cx('page-cart-section')}>
                <Container>
                    <header className={cx('page-cart-header')}>
                        <h1 className={`${cx('page-cart-title')} heading h1 ${archivo.className}`}>My cart</h1>
                        <p className={cx('page-cart-description')}>You are eligible for free shipping!</p>
                    </header>
                </Container>
                <div className={cx('cart-wrapper')}>
                    <div className={cx('cart-wrapper-inner')}>
                        <div className={cx('cart-wrapper-inner-inner')}>
                            <Container className={'container-flush'}>
                                <div className={cx('card')}>
                                    <div className={cx('table-wrapper')}>
                                        <div className={cx('line-item-table')}>
                                            <thead className={cx('thead', 'hidden-phone')}>
                                                <tr>
                                                    <th>Product</th>
                                                    <th className={cx('table-cell-center')}>Quantity</th>
                                                    <th className={cx('table-cell-right')}>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className={cx('tbody')}>
                                                <tr>
                                                    <td className={cx('line-item-product-info')}>
                                                        <div className={cx('line-item-product-info-wrapper')}>
                                                            <div className={cx('line-item-image-wrapper')}>
                                                                <div className={cx('aspect-ratio')}>
                                                                    <img
                                                                        src="https://woodfurniture.com/cdn/shop/files/BLA02-330-01_00326_180x.png?v=1712314476"
                                                                        alt="img"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={cx('line-item-meta')}>
                                                                <a href="/" className={cx('line-item-vendor-link')}>
                                                                    Bolia
                                                                </a>
                                                                <a href="/" className={cx('line-item-title-link')}>
                                                                    Oak Scandinavian Lounge Armchair | Bolia Bowie -
                                                                    White pigmented oiled oak / Sand
                                                                </a>
                                                                <div className={cx('line-item-price-list')}>
                                                                    <div
                                                                        className={cx(
                                                                            'product-price-wrapper',
                                                                            true !== null && 'have-price-discount',
                                                                        )}
                                                                    >
                                                                        {true !== null && (
                                                                            <p className={cx('product-price-discount')}>
                                                                                <FormatPrice value={20000000} />
                                                                            </p>
                                                                        )}
                                                                        <p className={cx('product-price-real')}>
                                                                            <FormatPrice value={30000000} />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            'line-item-quantity',
                                                            'table-cell-center',
                                                            'hidden-phone',
                                                        )}
                                                    >
                                                        <div className={cx('mini-cart-item-quantity')}>
                                                            <div className={cx('quantity-selector')}>
                                                                <button className={cx('quantity-selector-button')}>
                                                                    <DecreaseIcon className={cx('icon-decrease')} />
                                                                </button>
                                                                <input
                                                                    className={cx('quantity-selector-value')}
                                                                    value={'2'}
                                                                />
                                                                <button className={cx('quantity-selector-button')}>
                                                                    <IncreaseIcon className={cx('icon-increase')} />
                                                                </button>
                                                            </div>
                                                            <button className={cx('btn-remove')}>Remove</button>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            'line-item-price',
                                                            'table-cell-right',
                                                            'hidden-phone',
                                                        )}
                                                    >
                                                        <span>22.000.00</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('cart-recap')}>
                                    <div className={cx('cart-recap-scroller')}>
                                        <div className={cx('card')}>
                                            <div className={cx('card-section')}>
                                                <div className={cx('cart-recap-price-line-list')}>
                                                    <div className={cx('cart-recap-price-label')}>Total</div>
                                                    <div className={cx('cart-recap-price-line')}>20,000,000đ</div>
                                                </div>
                                                <div className={cx('cart-notice-important')}>
                                                    <h2>Tạm Thời Bảo Trì Chức Năng Này</h2>
                                                </div>
                                                {/*<div className={cx('cart-recap-price-line-list')}>
                                                    <div className={cx('cart-recap-price-label')}>Total</div>
                                                    <div className={cx('cart-recap-price-line')}>20,000,000đ</div>
                                                </div>
                                                <div className={cx('cart-recap-note')}>
                                                    <button>
                                                        Order instructions
                                                        <ChervonDonwIcon className={cx('icon-chevorn-down')} />
                                                    </button>
                                                </div>
                                                <div className={cx('cart-recap-notices')}>
                                                    <p>Taxes and shipping calculated at checkout</p>
                                                </div>
                                                <button className={cx('btn-submit')}>Checkout</button>
                                                <div className={cx('shipping-terms-group')}>
                                                    By continuing with your purchase, you agree to our{' '}
                                                    <a href="/">shipping/return terms.</a>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        // <CartEmpty />
    );
}

export default PageCart;
