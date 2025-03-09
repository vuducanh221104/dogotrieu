import { Metadata } from 'next';
import AuthResetPassword from '@/appLayout/Auth/AuthResetPassword';
import routes from '@/config/routes';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Đặt Lại Mật Khẩu | Đồ Gỗ Triệu';
    const description = `Đặt lại mật khẩu cho tài khoản Đồ Gỗ Triệu của bạn một cách an toàn và bảo mật. Chúng tôi sử dụng công nghệ mã hóa tiên tiến để bảo vệ thông tin của bạn. Hãy chọn một mật khẩu mạnh để bảo vệ tài khoản của bạn tốt hơn.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/resetPassword`,
            images: [
                {
                    url: image,
                    alt: 'Trang Đặt Lại Mật Khẩu | DOGOTRIEU',
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
                    alt: 'Trang Đặt Lại Mật Khẩu | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: [
            'đặt lại mật khẩu đồ gỗ triệu',
            'reset mật khẩu',
            'thay đổi mật khẩu',
            'mật khẩu mới đồ gỗ triệu',
            'quên mật khẩu',
            'bảo mật tài khoản',
            'đồ gỗ triệu',
            'cập nhật mật khẩu',
            'khôi phục tài khoản',
            'xác thực tài khoản',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: false,
            follow: false,
        },
        alternates: {
            canonical: `${routes.domain.name}/auth/resetPassword`,
        },
    };
}

function PageResetPassword() {
    return <AuthResetPassword />;
}

export default PageResetPassword;
