import NewsDetailContent from '@/appLayout/NewsDetail';
import routes from '@/config/routes';
import { newsSEOGET } from '@/services/newsServices';

import { cleanMarkDownLimit } from '@/utils/cleanMarkDown';
import { handleSlugify } from '@/utils/handleSlutify';
import { handleSplitSlug } from '@/utils/handleSplitSlug';
import { transformedImageNews } from '@/utils/handleTranformImage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
    const { id }: any = params;
    const idNews = handleSplitSlug(id);

    try {
        // const news: any = await newsSEOGET(idNews);
        const news = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_ORI}api/v1/news/seo/${idNews}`).then((res) =>
            res.json(),
        );
        if (!news || !news.title) {
            notFound();
        }

        const title = news?.title;
        const description = cleanMarkDownLimit(news?.content);
        const url = `${routes.domain.name}${routes.user.newsDetail}/${handleSlugify(news?.title)}-${news?._id}.html`;
        const image = transformedImageNews(news?.thumb);
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
                        alt: `${title}`,
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
                        alt: `${title}`,
                    },
                ],
            },
        };
    } catch (error) {
        notFound();
    }
}

function PageNews({ params }: Props) {
    return <NewsDetailContent />;
}

export default PageNews;
