import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '@/styles/Contact.module.scss';
import { DividerSymbol, InstaIcon } from '@/components/Icons';
import ViewSpecification from '@/components/HomeComponents/ViewSpecification';
import { archivo } from '@/assets/FontNext';
const cx = classNames.bind(styles);

function PageContact() {
    return (
        <>
            <Container className={'container--narrow'}>
                <div className={cx('page-header')}>
                    <h1 className={`${cx('page-header-heading')} ${archivo.className}`}>LIÊN HỆ</h1>
                    <div className={cx('page-description')}>
                        <div className={cx('page-img-wrapper')}>
                            <center>
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0285/8683/6027/files/11111_4fd5de6b-a245-41f7-8cc7-3a74da1a940e_2048x2048.jpg?v=1626441718"
                                    alt=""
                                />
                            </center>
                        </div>
                        <p>
                            {' '}
                            Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ với mọi yêu cầu về sản phẩm hoặc dịch vụ được đề
                            cập trên trang web của chúng tôi. Cho dù đó là câu hỏi về thiết kế, sự có sẵn, hoặc giá cả,
                            chúng tôi luôn sẵn lòng phục vụ bạn ngay lập tức. Chúng tôi tự hào với việc trở nên càng
                            minh bạch càng tốt với khách hàng của mình. Cho dù là qua email hay điện thoại, hãy sử dụng
                            mẫu dưới đây để liên hệ với chúng tôi!
                        </p>
                        <p>
                            Chúng tôi coi dịch vụ khách hàng như một cơ hội tốt để phục vụ bạn tốt hơn. Vì vậy, các câu
                            hỏi hoặc quan tâm của bạn là ưu tiên hàng đầu tại Đồ Gỗ Triệu của chúng tôi. Hãy liên hệ với
                            chúng tôi ngay hôm nay với bất kỳ câu hỏi, lo ngại hoặc yêu cầu nào.
                        </p>
                        <p>Thứ hai-Chủ Nhật 8h Sáng - 5h Chiều </p>
                        <p>
                            <a href="tel:0348483612">Tel: 0348483612</a>
                        </p>
                        <p>Cửa Hàng : 24 Lương Định Của , Trần Não ,TP.Thủ Đức</p>
                        <p>Kho,Xưởng :25/4 Xuân Thủy , Thảo Điền , TP.Thủ Đức</p>
                    </div>
                </div>
            </Container>
            <ViewSpecification />
        </>
    );
}

export default PageContact;
