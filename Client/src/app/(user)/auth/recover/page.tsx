import routes from '@/config/routes';
import { Metadata } from 'next';
import AuthRecover from '@/appLayout/Auth/AuthRecover';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Quên Mật Khẩu | Đồ Gỗ Triệu';
    const description = `Quên mật khẩu? Không cần lo lắng! Hệ thống khôi phục mật khẩu an toàn của Đồ Gỗ Triệu sẽ giúp bạn lấy lại quyền truy cập tài khoản nhanh chóng. Chỉ cần nhập email hoặc tên đăng nhập, chúng tôi sẽ gửi hướng dẫn chi tiết để đặt lại mật khẩu qua email của bạn.`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/q_auto:best/v1741769745/dogotrieu_image_bjb0ga.jpg';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/auth/recover`,
            images: [
                {
                    url: image,
                    alt: 'Trang Quên Mật Khẩu | DOGOTRIEU',
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
                    alt: 'Trang Quên Mật Khẩu | DOGOTRIEU',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        keywords: [
            'quên mật khẩu đồ gỗ triệu',
            'khôi phục mật khẩu',
            'lấy lại mật khẩu',
            'đặt lại mật khẩu',
            'quên tài khoản đồ gỗ triệu',
            'reset mật khẩu',
            'bảo mật tài khoản',
            'đồ gỗ triệu',
            'hỗ trợ đăng nhập',
            'xác thực email',
        ],
        authors: [{ name: 'Đồ Gỗ Triệu' }],
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${routes.domain.name}/auth/recover`,
        },
    };
}

function PageRecover() {
    return <AuthRecover />;
}

export default PageRecover;
