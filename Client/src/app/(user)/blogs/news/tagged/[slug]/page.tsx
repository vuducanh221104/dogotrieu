import NewsContent from '@/appLayout/news/NewsContent';
import routes from '@/config/routes';
import { dataTaggedNews } from '@/services/menuData/menuData';
import { Metadata } from 'next';
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const taggedItem = dataTaggedNews.find((item: any) => item.url === slug);
    let title = `Tin Tức - Tagged "${taggedItem.title}"`;
    if (taggedItem.url === 'all') {
        title = 'Tin Tức';
    }
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
