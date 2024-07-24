import NewsContent from '@/appLayout/news/NewsContent';
import routes from '@/config/routes';

export async function generateMetadata() {
    const title = 'Tin Tức';
    const description = `Xem các Tin Tức, Bài Đăng mới nhất của DOGOTRIEU`;
    const image = 'https://res.cloudinary.com/do4zld720/image/upload/v1721573753/image-SEO-home_hajvj7.jpg';
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}${routes.user.news}`,
            images: [
                {
                    url: image,
                    alt: `${title} | DOGOTRIEU`,
                },
            ],
        },
        twitter: {
            title: title,
            description: description,
            card: 'summary_large_image',
            site: `${routes.domain.nameCamel}$`,
            images: [
                {
                    url: image,
                    alt: `${title} | DOGOTRIEU`,
                },
            ],
        },
    };
}

function PageNews() {
    return <NewsContent />;
}

export default PageNews;
