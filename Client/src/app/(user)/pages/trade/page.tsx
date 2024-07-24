import classNames from 'classnames/bind';
import styles from '@/styles/Trade.module.scss';
import { DividerSymbol } from '@/components/Icons';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import Image from 'next/image';
import imagesPage from '@/assets/images-pages';
import { Metadata } from 'next';
import routes from '@/config/routes';

const cx = classNames.bind(styles);

export const generateMetadata = (): Metadata => {
    const title = 'THƯƠNG MẠI | DOGOTRIEU';
    const description =
        'Nhận giá độc quyền. Không yêu cầu mua tối thiểu. Giá thương mại đã được áp dụng cho hơn 10.000 thiết kế đồ nội thất & trang trí.';
    const image = 'https://res.cloudinary.com/do4zld720/image/upload/v1721573753/image-SEO-home_hajvj7.jpg';
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}${routes.pageCompany.tradeIn}`,
            images: [
                {
                    url: image,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: `${routes.domain.nameCamel}$`,
            title: title,
            description: description,
            images: [
                {
                    url: image,
                    alt: title,
                },
            ],
        },
    };
};

function PageTrade() {
    return (
        <>
            <div className={cx('trade-wrapper')}>
                <div className={cx('trade-inner')}>
                    <header className={cx('trade-header')}>
                        <div className={cx('trade-heading')}>
                            <h3 className={cx('trade-h3')}>
                                Khám phá một thế giới của sự đa dạng với Rất Nhiều Kiểu Mẫu Khác Nhau Cho Ngôi Nhà Của
                                Bạn
                            </h3>
                            <div className={cx('trade-separated')}>
                                <span>
                                    <DividerSymbol className={cx('icon-divider-symbol')} />
                                </span>
                            </div>
                        </div>
                        <div className={cx('trade-image-gobal')}>
                            <Image src={imagesPage.transaction} alt="image" />
                        </div>
                        <div className={cx('trade-des-1')}>
                            <div className={cx('trade-des-1-inner')}>
                                <h3 className={cx('des-1-heading')}>Bạn đã yêu cầu, chúng tôi đáp ứng!</h3>
                                <h1 className={cx('des-1-heading2')}>Chúng Tôi Tạo Ra Sự Khác Biệt</h1>
                            </div>
                        </div>
                        <div className={cx('trade-des-2')}>
                            <div className={cx('trade-des-2-inner')}>
                                <p>
                                    Chúng tôi cung cấp các Sản Phẩm Nội Thất Cũ & Mới: Bàn & Ghế, Tủ, Kệ, Giường, Tượng
                                    & Tranh, Các Đồ Trang Trí...
                                </p>
                                <p>
                                    Chúng tôi hân hạnh thông báo rằng chương trình đặc biệt dành riêng cho các đối tác
                                    thương mại của chúng tôi hiện đã có sẵn trên mọi cổng thông tin.
                                </p>
                                <p>
                                    <a>Đồ Gỗ Triệu </a>
                                    Cam Kết tự hào cam kết với bạn rằng mọi sản phẩm gỗ mà chúng tôi cung cấp đều được
                                    xây dựng trên nền tảng uy tín và chất lượng tối đa. Chúng tôi không chỉ là một cửa
                                    hàng, mà còn là một niềm tin, một sự đảm bảo về sự an tâm và hài lòng cho quý khách
                                    hàng.
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
