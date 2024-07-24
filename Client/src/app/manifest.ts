import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Đồ Gỗ Triệu',
        short_name: 'DOGOTRIEU',
        description:
            'Tìm kiếm những món đồ nội thất hiện đại, tự nhiên, mang đậm nét dân tộc và chân thực cho không gian của bạn. Khám phá bàn ghế, ghế sofa, đèn, tủ, kệ, phụ kiện trang trí ,... và nội thất bằng gỗ. Miễn phí vận chuyển tại Việt Nam. Chào mừng bạn',
        icons: [
            {
                src: 'https://res.cloudinary.com/do4zld720/image/upload/v1721657135/images-favicon_mnkbjy.ico',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'https://res.cloudinary.com/do4zld720/image/upload/v1721657135/images-favicon_mnkbjy.ico',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        theme_color: '#1A94FF',
        background_color: '#1A94FF',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        related_applications: [
            {
                platform: 'play',
                url: 'https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid',
                id: 'vn.tiki.app.tikiandroid',
            },
            {
                platform: 'itunes',
                url: 'https://apps.apple.com/vn/app/tiki-shopping-fast-shipping/id958100553',
            },
            {
                platform: 'webapp',
                url: 'https://tiki.vn/manifest.json',
            },
        ],
        scope: '/',
    };
}
