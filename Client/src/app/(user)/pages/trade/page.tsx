import classNames from 'classnames/bind';
import styles from '@/styles/Trade.module.scss';
import { DividerSymbol } from '@/components/Icons';
import Image from 'next/image';
import imagesPage from '@/assets/images-pages';
import { Metadata } from 'next';
import routes from '@/config/routes';

const cx = classNames.bind(styles);

export const generateMetadata = (): Metadata => {
    const title = 'KHÁM PHÁ | DOGOTRIEU';
    const description =
        'Khám phá những thiết kế nội thất độc đáo và tinh tế tại Đồ Gỗ Triệu. Rất nhiều sản phẩm chất lượng cao đang chờ đón bạn, không yêu cầu mua tối thiểu và giá tốt nhất trên thị trường.';
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/q_auto:best/v1741769745/dogotrieu_image_bjb0ga.jpg';
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
        </>
    );
}

export default PageTrade;
