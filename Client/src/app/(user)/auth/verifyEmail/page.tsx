import routes from '@/config/routes';
import { Metadata } from 'next';
import AuthVerifyEmail from '@/appLayout/Auth/AuthVerifyEmail';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Xác Thực Email | Đồ Gỗ Triệu';
    const description = `Xác thực địa chỉ email của bạn để hoàn tất đăng ký tài khoản tại Đồ Gỗ Triệu. Quá trình xác thực đơn giản và nhanh chóng giúp bảo vệ tài khoản của bạn và đảm bảo bạn nhận được các thông báo quan trọng từ chúng tôi.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/verifyEmail`,
            images: [
                {
                    url: image,
                    alt: 'Trang Xác Thực Email | DOGOTRIEU',
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
                    alt: 'Trang Xác Thực Email | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: [
            'xác thực email đồ gỗ triệu',
            'verify email',
            'xác nhận tài khoản',
            'kích hoạt tài khoản',
            'đăng ký đồ gỗ triệu',
            'bảo mật tài khoản',
            'đồ gỗ triệu',
            'xác minh email',
            'hoàn tất đăng ký',
            'email verification',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: false,
            follow: false,
        },
        alternates: {
            canonical: `${routes.domain.name}/auth/verifyEmail`,
        },
    };
}

function PageVerifyEmail() {
    return <AuthVerifyEmail />;
}

export default PageVerifyEmail;
