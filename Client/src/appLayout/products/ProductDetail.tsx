'use client';
import classNames from 'classnames/bind';
import styles from '@/styles/ProductDetail.module.scss';
import { Container } from 'react-bootstrap';
import ProductGallery from '@/components/ProductGallery';
import { DecreaseIcon, IncreaseIcon } from '@/components/Icons';
import ViewListProductAuto from '@/components/HomeComponents/ViewListProductAuto';
import Breadcrumb from '@/components/Breadcrumb';
import { archivo } from '@/assets/FontNext';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import MarkdownRender from '@/components/MarkdownRender';
import { productGetId } from '@/services/productServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '@/redux/cartSlice';
import FormatPrice from '@/components/FormatPrice';
import { useState, Fragment, ChangeEvent } from 'react';
import { AppDispatch, RootState } from '@/redux/store';
const cx = classNames.bind(styles);

function ProductDetail({ productId: id }: any) {
    const dispatch: AppDispatch = useDispatch();
    const [currentQuantity, setCurrentQuantity] = useState<string>('1');
    const { data, error, isLoading } = productGetId(id);
    const productInCart = useSelector((state: RootState) => state.cart.products?.find((p) => p._id === data?._id));

    //Handle Add To Cart
    const handleAddToCart = () => {
        if (!data) return;

        const totalQuantity = productInCart
            ? productInCart.quantityAddToCart + Number(currentQuantity)
            : Number(currentQuantity);

        if (totalQuantity <= data.quantity) {
            dispatch(addProductToCart({ ...data, quantityAddToCart: Number(currentQuantity) }));
        }
    };

    const handleIncreaseQuantity = () => {
        if (Number(currentQuantity) < data.quantity) {
            setCurrentQuantity(String(Number(currentQuantity) + 1));
        } else {
            return;
        }
    };

    const handleDecreaseQuantity = () => {
        if (Number(currentQuantity) > 1) {
            setCurrentQuantity(String(Number(currentQuantity) - 1));
        } else {
            setCurrentQuantity('1');
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setCurrentQuantity('');
        } else if (!isNaN(Number(value)) && Number(value) > 0 && Number(value) <= data.quantity) {
            setCurrentQuantity(value);
        } else if (Number(value) > data.quantity) {
            setCurrentQuantity('1');
        } else {
            setCurrentQuantity('1');
        }
    };

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <NotFound />;
    } else
        return (
            <>
                <Breadcrumb nameSlug={data.name} />
                <div className={cx('product-template-wrapper')}>
                    <section className={cx('section-product-template')}>
                        <Container className="container-flush">
                            <div className={cx('product-cover')}>
                                <div className={cx('product-inner')}>
                                    <div className={cx('product-block-list')}>
                                        <ProductGallery
                                            data={[data.thumb, ...data.product_type_id.images]}
                                            name={data.name}
                                        />
                                        <div className={cx('product-info-item')}>
                                            <div className={cx('card', 'card-info')}>
                                                <div className={cx('card-section')}>
                                                    <div className={cx('product-meta')}>
                                                        <h1
                                                            className={`${cx('product-meta-title')} h1 heading ${
                                                                archivo.className
                                                            }`}
                                                        >
                                                            {data.name}
                                                        </h1>

                                                        <div className={cx('product-meta-reference')}>
                                                            <span className={cx('product-meta-sku')}>
                                                                SKU:
                                                                <span>{data.product_type_id.sku}</span>
                                                            </span>
                                                            <div className={cx('product-sparate')}></div>
                                                            <div className={cx('product-meta-material-list')}>
                                                                {data.material_id &&
                                                                    data.material_id?.map(
                                                                        (material: any, index: number) => (
                                                                            <Fragment key={index}>
                                                                                <span
                                                                                    className={cx(
                                                                                        'product-meta-vendor',
                                                                                    )}
                                                                                >
                                                                                    {index !== 0 && ', '}
                                                                                    {material.name}
                                                                                </span>
                                                                            </Fragment>
                                                                        ),
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className={cx('card-separator')} />
                                                    <div className={cx('product-meta-info')}>
                                                        <div className={cx('product-meta-info-list')}>
                                                            <div className={cx('product-meta-info-item')}>
                                                                <span className={cx('product-meta-info-heading')}>
                                                                    Giá:
                                                                </span>
                                                                <div
                                                                    className={cx(
                                                                        'price-wrapper',
                                                                        data.price?.discount != null &&
                                                                            data.price?.discount !== 0 &&
                                                                            'discount-on',
                                                                    )}
                                                                >
                                                                    <div>
                                                                        <FormatPrice value={data.price?.original} />
                                                                    </div>
                                                                    {data.price?.discount != null &&
                                                                        data.price?.discount !== 0 && (
                                                                            <span>
                                                                                <FormatPrice
                                                                                    value={data.price?.discount}
                                                                                />
                                                                            </span>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            <div className={cx('product-meta-info-item')}>
                                                                <span className={cx('product-meta-info-heading')}>
                                                                    Còn Lại:
                                                                </span>
                                                                {data.quantity > 0 ? (
                                                                    <span className={cx('product-meta-status')}>
                                                                        CÒN HÀNG
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className={cx(
                                                                            'product-meta-status',
                                                                            'out-stock',
                                                                        )}
                                                                    >
                                                                        HẾT HÀNG
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className={cx('product-meta-info-item')}>
                                                                <span className={cx('product-meta-info-heading')}>
                                                                    Số Lượng:
                                                                </span>
                                                                <div
                                                                    className={cx('product-meta-info-selector-button')}
                                                                >
                                                                    <div className={cx('mini-cart-item-quantity')}>
                                                                        <div className={cx('quantity-selector')}>
                                                                            <button
                                                                                className={cx(
                                                                                    'quantity-selector-button',
                                                                                )}
                                                                                onClick={handleDecreaseQuantity}
                                                                                aria-label="Giảm Sản Phẩm"
                                                                            >
                                                                                <DecreaseIcon
                                                                                    className={cx('icon-decrease')}
                                                                                />
                                                                            </button>
                                                                            <input
                                                                                id="quantity-input"
                                                                                className={cx(
                                                                                    'quantity-selector-value',
                                                                                )}
                                                                                value={currentQuantity}
                                                                                onChange={(e) => handleInputChange(e)}
                                                                            />
                                                                            <button
                                                                                className={cx(
                                                                                    'quantity-selector-button',
                                                                                )}
                                                                                onClick={handleIncreaseQuantity}
                                                                                aria-label="Tăng Sản Phẩm"
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
                                                        <div
                                                            className={cx('product-meta-info-add-to-cart')}
                                                            onClick={handleAddToCart}
                                                        >
                                                            <button>Thêm Vào Giỏ</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('product-description-item')}>
                                            <div className={cx('card')}>
                                                <div className={cx('card-header')}>
                                                    <h2
                                                        className={`${cx('card-title ')} h3 heading ${
                                                            archivo.className
                                                        }`}
                                                    >
                                                        Mô Tả
                                                    </h2>
                                                </div>
                                                <div className={cx('card-section')}>
                                                    <div className={cx('product-description')}>
                                                        <div className={cx('product-mardown-text')}>
                                                            <MarkdownRender
                                                                content={data.product_type_id.description}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('product-content-item')}>
                                            <div className={cx('card')}>
                                                <div className={cx('card-header')}>
                                                    <h2
                                                        className={`${cx('card-title ')} h3 heading ${
                                                            archivo.className
                                                        }`}
                                                    >
                                                        Bảo hành sản phẩm
                                                    </h2>
                                                </div>
                                                <div className={cx('card-section')}>
                                                    <div className={cx('product-mardown-text')}>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    Chúng tôi cam kết bảo hành sản phẩm trong một khoảng
                                                                    thời gian cụ thể tính từ ngày mua hàng. Thời gian
                                                                    bảo hành có thể thay đổi tùy theo từng sản phẩm cụ
                                                                    thể và sẽ được chỉ rõ trong thông tin bảo hành cụ
                                                                    thể của sản phẩm đó.
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('product-content-item')}>
                                            <div className={cx('card')}>
                                                <div className={cx('card-header')}>
                                                    <h2
                                                        className={`${cx('card-title ')} h3 heading ${
                                                            archivo.className
                                                        }`}
                                                    >
                                                        Cam kết về chất lượng
                                                    </h2>
                                                </div>
                                                <div className={cx('card-section')}>
                                                    <div className={cx('product-mardown-text')}>
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    Chúng tôi tự hào cam kết rằng tất cả các sản phẩm
                                                                    của chúng tôi được sản xuất và bán ra là từ nguyên
                                                                    liệu chất lượng cao nhất và qua quy trình sản xuất
                                                                    nghiêm ngặt. Chúng tôi luôn đặt hàng đầu sự an toàn,
                                                                    độ bền và tính ổn định của sản phẩm, đảm bảo rằng
                                                                    mọi sản phẩm mà chúng tôi cung cấp đều đáp ứng được
                                                                    tiêu chuẩn chất lượng cao nhất và sẽ mang lại sự hài
                                                                    lòng tuyệt đối cho khách hàng.
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className={cx('product-shipping-item')}>
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
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </section>
                </div>
                <div className={cx('product-recommendations-wrapper')}>
                    <section className={cx('section-product-recommendations')}>
                        <ViewListProductAuto
                            query={'?category_id=66655754c3a93469c8e5a58a'}
                            nextBtnLink={'/category/all'}
                            title={'Bạn đang quan tâm'}
                        />
                    </section>
                </div>
            </>
        );
}

export default ProductDetail;
