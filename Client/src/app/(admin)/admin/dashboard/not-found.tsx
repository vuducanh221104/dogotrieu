import routes from '@/config/routes';
import { Metadata } from 'next/types';

export const generateMetadata = (): Metadata => {
    const title = 'Không tìm thấy trang';
    const description =
        'Hãy thử tải lại trang, sự cố này có thể chỉ là tạm thời. Nếu bạn nhập địa chỉ theo cách thủ công, hãy kiểm tra lại xem...';
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/q_auto:best/v1741769745/dogotrieu_image_bjb0ga.jpg';
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.nameCamel}$`,
            images: [
                {
                    url: image,
                    alt: title,
                },
            ],
        },
        robots: {
            index: false, // Ngăn bot lập chỉ mục
            follow: false, // Ngăn bot theo liên kết trên trang
        },
    };
};
export default function NotFound1() {
    return <>NOTFOUND</>;
}
