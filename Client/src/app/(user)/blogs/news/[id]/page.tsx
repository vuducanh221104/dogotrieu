import NewsDetailContent from '@/appLayout/newsDetail/newsDetailContent';
import routes from '@/config/routes';
import { newsSEOGET } from '@/services/newsServices';
import { cleanMarkDownLimit } from '@/utils/cleanMarkDown';
import { handleSlugify } from '@/utils/handleSlutify';
import { handleSplitSlug } from '@/utils/handleSplitSlug';
import { Metadata } from 'next';
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id }: any = params;

    const idNews = handleSplitSlug(id);

    const news: any = await newsSEOGET(idNews);

    const title = news?.title;
    const description = cleanMarkDownLimit(news?.content);
    const image = news?.thumb;
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}${routes.user.news}/${handleSlugify(news.title)}-${news._id}.html`,
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
}

function PageNews() {
    return <NewsDetailContent />;
}

export default PageNews;
