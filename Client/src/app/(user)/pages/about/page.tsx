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
                            <h3 className={`${cx('heading')} ${playFairDisplay.className}`}>Về Chúng Tôi</h3>
                            <p className={lato.className}>
                                <span>
                                    <Link href="/" className={cx('link-color')}>
                                        Đồ Gỗ Triệu{' '}
                                    </Link>
                                    tự hào giới thiệu Nội Thất Đồ Gỗ Cũ. Những giá trị ban đầu của chúng tôi là bền
                                    vững, lâu dài, độc quyền và chất lượng. Chúng tôi không chỉ là một cửa hàng nội
                                    thất, mà còn là một điểm đến cho những người yêu thích vẻ đẹp và sự độc đáo của đồ
                                    gỗ cũ. Tại đây, chúng tôi tôn trọng và giữ gìn sự tinh tế của từng mảnh đồ gỗ cũ,
                                    mang lại cho không gian của bạn sự ấm áp và phong cách độc đáo. Hãy đến với chúng
                                    tôi để khám phá thế giới đầy mê hoặc của nội thất đồ gỗ cũ.
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
                                    <h3 className={`${cx('heading')} ${playFairDisplay.className}`}>
                                        Tình yêu với Thiết Kế
                                    </h3>
                                </div>
                                <div className={`${cx('description-wrapper')} ${lato.className}`}>
                                    <div className={cx('column-padding')}>
                                        <p>
                                            Chúng tôi yêu thiết kế và hành trình đi kèm từ quá trình sáng tạo ban đầu
                                            đến sản phẩm hoàn thiện, và cuối cùng là đến trái tim của ngôi nhà của bạn.
                                            Chúng tôi tự hào cung cấp dịch vụ thân thiện và cá nhân với mỗi lần mua hàng
                                            - trực tuyến hoặc tại cửa hàng. Nếu bạn cần sự trợ giúp hoặc có câu hỏi,
                                            <a>
                                                chúng tôi sẵn lòng hỗ trợ qua email, điện thoại hoặc trò chuyện trực
                                                tiếp để cung cấp lời khuyên và giải đáp mọi thắc mắc của bạn.
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
                                            Kiến thức chuyên môn
                                        </h3>
                                    </div>
                                    <div className={`${cx('description-wrapper')} ${lato.className}`}>
                                        <div className={cx('column-padding')}>
                                            <p>
                                                Chúng tôi có kinh nghiệm để giúp bạn biến ý tưởng của mình thành hiện
                                                thực. Cho dù bạn cần một Cuộc Tư vấn Thiết kế Miễn phí, chúng tôi luôn
                                                sẵn lòng.
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
                                        <h3 className={`${cx('heading')} ${playFairDisplay.className}`}>
                                            Chúng tôi Hướng Đến
                                        </h3>
                                    </div>
                                    <div className={`${cx('description-wrapper')} ${lato.className}`}>
                                        <div className={cx('column-padding')}>
                                            <p>
                                                Đội ngũ của chúng tôi luôn sẵn lòng hỗ trợ với mọi câu hỏi mà bạn có về
                                                thiết kế, thông số kỹ thuật, sự có sẵn, hoặc giá cả. Chúng tôi tự hào về
                                                sự minh bạch và chất lượng của dịch vụ khách hàng của chúng tôi. Đừng
                                                ngần ngại liên hệ với chúng tôi qua cuộc gọi, email hoặc trò chuyện.
                                                Chúng tôi sẽ rất vui lòng được hỗ trợ!
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
                    <a href="mailto:vuducanh22112004@gmail.com">dogotrieu@gmail.com</a>| 0348483612 (em Lan)
                </div>
            </div>
        </div>
    );
}

export default PageAboutUs;
