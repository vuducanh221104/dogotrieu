import InfoChangePassword from '@/appLayout/Auth/Info/InfoChangePassword';
import routes from '@/config/routes';
import { Metadata } from 'next/types';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Đổi Mật Khẩu Tài Khoản | Đồ Gỗ Triệu';
    const description = `Thay đổi mật khẩu tài khoản của bạn tại Đồ Gỗ Triệu một cách an toàn và bảo mật. Chúng tôi sử dụng công nghệ mã hóa tiên tiến để bảo vệ thông tin cá nhân của bạn. Cập nhật mật khẩu định kỳ để tăng cường bảo mật cho tài khoản của bạn.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/info/changePassword`,
            images: [
                {
                    url: image,
                    alt: 'Trang Đổi Mật Khẩu | DOGOTRIEU',
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
                    alt: 'Trang Đổi Mật Khẩu | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: [
            'đổi mật khẩu',
            'bảo mật tài khoản',
            'cập nhật mật khẩu',
            'đồ gỗ triệu',
            'tài khoản an toàn',
            'bảo vệ tài khoản',
            'quản lý mật khẩu',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: false,
            follow: false,
        },
    };
}

function PageChangePasswordInfo() {
    return <InfoChangePassword />;
}

export default PageChangePasswordInfo;
