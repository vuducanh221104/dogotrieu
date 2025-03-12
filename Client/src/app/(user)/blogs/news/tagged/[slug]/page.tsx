import NewsContent from '@/appLayout/NewsTagged';
import routes from '@/config/routes';
import { dataTaggedNews } from '@/services/menuData/menuData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
    const { slug } = params;
    const taggedItem = dataTaggedNews.find((item: any) => item.url === slug);

    if (!taggedItem) {
        notFound();
    }

    let title = `Tin Tức - Tagged "${taggedItem.title}"`;

    if (taggedItem?.url === 'all') {
        title = 'Tin Tức';
    }

    const description = `Xem các Tin Tức, Bài Đăng mới nhất của DOGOTRIEU`;
    const url = `${routes.domain.name}${routes.user.newsTaggedOnly}/${slug}`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/q_auto:best/v1741769745/dogotrieu_image_bjb0ga.jpg';

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: url,
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
