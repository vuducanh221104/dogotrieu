import Cart from '@/appLayout/Cart';
import routes from '@/config/routes';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata | undefined> {
    const title = 'Giỏ Hàng Của Tôi';
    const description = `Giỏ hàng của bạn tại Đồ Gỗ Triệu đang chờ đón những thiết kế đỉnh cao, kết hợp chất lượng bền vững và phong cách độc đáo. Hoàn thiện không gian sống đẳng cấp của bạn ngay hôm nay!
    `;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/cart`,
            images: [
                {
                    url: image,
                    alt: `${title} | DOGOTRIEU`,
                },
            ],
        },
        twitter: {
            title: title,
            description: description,
            card: 'summary_large_image',
            site: `${routes.domain.nameCamel}$`,
            images: [
                {
                    url: image,
                    alt: `${title} | DOGOTRIEU`,
                },
            ],
        },
    };
}

function PageCart() {
    return <Cart />;
}

export default PageCart;
