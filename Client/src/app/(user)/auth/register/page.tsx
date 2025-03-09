import routes from '@/config/routes';
import { Metadata } from 'next';
import AuthRegister from '@/appLayout/Auth/AuthRegister';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Đăng Ký  | Đồ Gỗ Triệu';
    const description = `Tạo tài khoản mới tại Đồ Gỗ Triệu để trải nghiệm mua sắm nội thất gỗ cao cấp. Đăng ký nhanh chóng, an toàn với xác thực email và bảo mật thông tin cá nhân. Tham gia cùng chúng tôi để nhận những ưu đãi đặc biệt dành cho thành viên.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/register`,
            images: [
                {
                    url: image,
                    alt: 'Trang Đăng Ký | DOGOTRIEU',
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
                    alt: 'Trang Đăng Ký | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: [
            'đăng ký đồ gỗ triệu',
            'tạo tài khoản đồ gỗ triệu',
            'đăng ký thành viên',
            'tài khoản mới',
            'đăng ký mua sắm nội thất',
            'tạo tài khoản mua đồ gỗ',
            'đăng ký ưu đãi đồ gỗ',
            'đồ gỗ triệu',
            'đăng ký thành viên đồ gỗ',
            'tạo tài khoản mua nội thất',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${routes.domain.name}/auth/register`,
        },
    };
}

function PageRegister() {
    return <AuthRegister />;
}

export default PageRegister;
