import React from 'react';
import { Metadata } from 'next';
import Home from '@/appLayout/home';
import routes from '@/config/routes';

export const generateMetadata = (): Metadata => {
    const title = 'ĐỒ GỖ TRIỆU | Nội Thất Gỗ Cổ Xưa - Tinh Hoa Văn Hóa & Nghệ Thuật';
    const description =
        'Khám phá thế giới nội thất độc đáo, kết hợp giữa vẻ đẹp cổ điển và hiện đại, tự nhiên và tinh tế. Những món đồ thủ công mang đậm dấu ấn dân tộc, tạo nên không gian sống đậm chất nghệ thuật và chân thực. Từ bàn ghế, ghế sofa, đèn, tủ, kệ đến phụ kiện trang trí, tất cả đều sẵn sàng để tô điểm cho ngôi nhà của bạn. Đặc biệt, miễn phí vận chuyển toàn quốc. Chào mừng bạn đến với trải nghiệm mua sắm hoàn hảo!';
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}`,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
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
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
};

function PageHome() {
    return <Home />;
}

export default PageHome;
