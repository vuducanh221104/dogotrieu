import InfoUser from '@/appLayout/Auth/Info';
import routes from '@/config/routes';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Thông Tin Tài Khoản | Đồ Gỗ Triệu';
    const description = `Quản lý thông tin cá nhân của bạn tại Đồ Gỗ Triệu - Cập nhật hồ sơ, theo dõi đơn hàng và tùy chỉnh trải nghiệm mua sắm của bạn. Chúng tôi cam kết bảo mật thông tin và mang đến dịch vụ khách hàng tốt nhất.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/q_auto:best/v1741769745/dogotrieu_image_bjb0ga.jpg';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/info`,
            images: [
                {
                    url: image,
                    alt: 'Trang Thông Tin Tài Khoản | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
            siteName: 'Đồ Gỗ Triệu',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            site: `${routes.domain.nameCamel}`,
            images: [
                {
                    url: image,
                    alt: 'Trang Thông Tin Tài Khoản | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: ['thông tin tài khoản', 'hồ sơ khách hàng', 'đồ gỗ triệu', 'quản lý tài khoản', 'cập nhật thông tin'],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: false,
            follow: false,
        },
    };
}

function PageInfoUser() {
    return <InfoUser />;
}

export default PageInfoUser;
