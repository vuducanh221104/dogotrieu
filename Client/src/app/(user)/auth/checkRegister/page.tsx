import routes from '@/config/routes';
import { Metadata } from 'next';
import AuthCheckRegister from '@/appLayout/Auth/AuthCheckRegister';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Xác Nhận Đăng Ký | Đồ Gỗ Triệu';
    const description = `Xác nhận đăng ký tài khoản của bạn tại Đồ Gỗ Triệu. Hoàn tất quá trình đăng ký để trải nghiệm mua sắm nội thất gỗ cao cấp với nhiều ưu đãi hấp dẫn. Chúng tôi cam kết bảo mật thông tin và mang đến trải nghiệm mua sắm tốt nhất.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/checkRegister`,
            images: [
                {
                    url: image,
                    alt: 'Trang Xác Nhận Đăng Ký | DOGOTRIEU',
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
                    alt: 'Trang Xác Nhận Đăng Ký | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: [
            'xác nhận đăng ký đồ gỗ triệu',
            'hoàn tất đăng ký',
            'đăng ký thành viên',
            'tạo tài khoản đồ gỗ triệu',
            'xác thực đăng ký',
            'bảo mật tài khoản',
            'đồ gỗ triệu',
            'đăng ký mua sắm',
            'tài khoản mới',
            'xác nhận tài khoản',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: false,
            follow: false,
        },
        alternates: {
            canonical: `${routes.domain.name}/auth/checkRegister`,
        },
    };
}

function PageCheckRegister() {
    return <AuthCheckRegister />;
}

export default PageCheckRegister;
