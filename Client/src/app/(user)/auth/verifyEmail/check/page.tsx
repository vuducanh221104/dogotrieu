import routes from '@/config/routes';
import { Metadata } from 'next';
import AuthVerifyEmailCheck from '@/appLayout/Auth/AuthVerifyEmailCheck';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Xác Thực Email | Đồ Gỗ Triệu';
    const description = `Xác thực địa chỉ email của bạn tại Đồ Gỗ Triệu. Hoàn tất quá trình xác thực để đảm bảo tài khoản của bạn an toàn và nhận được các thông báo quan trọng về đơn hàng, khuyến mãi đặc biệt từ chúng tôi.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/verifyEmail/check`,
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
            'xác minh email',
            'xác nhận địa chỉ email',
            'bảo mật tài khoản đồ gỗ triệu',
            'hoàn tất xác thực',
            'đồ gỗ triệu',
            'email verification',
            'xác thực tài khoản',
            'bảo mật email',
            'xác nhận email',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: false,
            follow: false,
        },
        alternates: {
            canonical: `${routes.domain.name}/auth/verifyEmail/check`,
        },
    };
}

function PageVerifyEmailCheck() {
    return <AuthVerifyEmailCheck />;
}

export default PageVerifyEmailCheck;
