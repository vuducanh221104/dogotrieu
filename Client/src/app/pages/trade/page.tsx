import classNames from 'classnames/bind';
import styles from '@/styles/Trade.module.scss';
import { DividerSymbol } from '@/components/Icons';
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
                            <img
                                src="https://cdn.shopify.com/s/files/1/0285/8683/6027/files/graceful-swing-kari-fluire-forma-rheolog-una-1.jpg?v=1713525266"
                                alt="image"
                            />
                        </div>
                        <div className={cx('trade-des-1')}>
                            <div className={cx('trade-des-1-inner')}>
                                <h3 className={cx('des-1-heading')}>Bạn đã yêu cầu, chúng tôi đã đáp ứng!</h3>
                                <h1 className={cx('des-1-heading2')}>Chúng Tôi Tạo Ra Sự Khác Biệt</h1>
                            </div>
                        </div>
                        <div className={cx('trade-des-2')}>
                            <div className={cx('trade-des-2-inner')}>
                                <p>
                                    chúng tôi cung cấp một loạt các sản phẩm nội thất , bàn & ghế , tủ , kệ , giường ,
                                    tượng & tranh , các đồ trang trí...
                                </p>
                                <p>
                                    <a href="/">Đồ Gỗ Triệu </a>
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
