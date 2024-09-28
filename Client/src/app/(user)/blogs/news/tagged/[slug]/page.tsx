import NewsContent from '@/appLayout/news/NewsContent';
import routes from '@/config/routes';
import { dataTaggedNews } from '@/services/menuData/menuData';
import { Metadata } from 'next';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
    const { slug } = params;
    const taggedItem = dataTaggedNews.find((item: any) => item.url === slug);

    if (!taggedItem) {
        return null;
    }

    let title = `Tin Tức - Tagged "${taggedItem.title}"`;
    if (taggedItem.url === 'all') {
        title = 'Tin Tức';
    }

    const description = `Xem các Tin Tức, Bài Đăng mới nhất của DOGOTRIEU`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

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
