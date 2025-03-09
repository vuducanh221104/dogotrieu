import routes from '@/config/routes';
import { Metadata } from 'next';
import AuthLogin from '@/appLayout/Auth/AuthLogin';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Đăng Nhập | Đồ Gỗ Triệu';
    const description = `Đăng nhập vào tài khoản Đồ Gỗ Triệu của bạn để trải nghiệm mua sắm trực tuyến an toàn và tiện lợi. Tận hưởng các ưu đãi độc quyền, theo dõi đơn hàng và quản lý thông tin cá nhân. Chúng tôi cam kết bảo mật thông tin với hệ thống xác thực hai lớp và mã hóa dữ liệu tiên tiến.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/login`,
            images: [
                {
                    url: image,
                    alt: 'Trang Đăng Nhập | DOGOTRIEU',
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
                    alt: 'Trang Đăng Nhập | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: [
            'đăng nhập đồ gỗ triệu',
            'tài khoản đồ gỗ triệu',
            'đồ gỗ triệu',
            'đăng nhập an toàn',
            'mua sắm trực tuyến',
            'đăng nhập bảo mật',
            'tài khoản khách hàng',
            'đăng nhập tài khoản',
            'xác thực tài khoản',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: true,
            follow: true,
        },
        verification: {
            google: 'verification_token',
        },
        alternates: {
            canonical: `${routes.domain.name}/auth/login`,
        },
    };
}

function PageLogin() {
    return <AuthLogin />;
}

export default PageLogin;
