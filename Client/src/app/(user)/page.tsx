import React from 'react';
import { Metadata } from 'next';
import Home from '@/appLayout/home';
import routes from '@/config/routes';

export const generateMetadata = (): Metadata => {
    const title = 'Đa dạng & độc đáo các sản phẩm nội thất đồ gỗ xưa cho đến hiện đại từ Châu Á và Châu Âu';
    const description =
        'Tìm kiếm những món đồ nội thất hiện đại, tự nhiên, mang đậm nét dân tộc và chân thực cho không gian của bạn. Khám phá bàn ghế, ghế sofa, đèn, tủ, kệ, phụ kiện trang trí ,... và nội thất bằng gỗ. Miễn phí vận chuyển tại Việt Nam. Chào mừng bạn';
    const image = 'https://res.cloudinary.com/do4zld720/image/upload/v1721573753/image-SEO-home_hajvj7.jpg';
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
