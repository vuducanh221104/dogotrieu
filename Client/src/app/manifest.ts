import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Đồ Gỗ Triệu',
        short_name: 'DOGOTRIEU',
        description:
            'Khám phá thế giới nội thất độc đáo, kết hợp giữa vẻ đẹp cổ điển và hiện đại, tự nhiên và tinh tế. Những món đồ mang đậm dấu ấn dân tộc, tạo nên không gian sống đậm chất nghệ thuật và chân thực. Từ bàn ghế, ghế sofa, đèn, tủ, kệ đến phụ kiện trang trí, tất cả đều sẵn sàng để tô điểm cho ngôi nhà của bạn. Đặc biệt, miễn phí vận chuyển toàn quốc. Chào mừng bạn đến với trải nghiệm mua sắm hoàn hảo!',
        icons: [
            {
                src: 'https://res.cloudinary.com/do4zld720/image/upload/v1727524140/Logo-Favicon_ldfkrx.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'https://res.cloudinary.com/do4zld720/image/upload/v1727524140/Logo-Favicon_ldfkrx.png',
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
