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

    let news: any;
    try {
        news = await newsSEOGET(idNews);
    } catch (error) {
        news = null;
    }
    const title = news?.title ?? 'Tin Tức Đồ Gỗ Triệu';
    const description = cleanMarkDownLimit(news?.content) ?? 'Thông tin mới nhất về đồ gỗ và nội thất';
    const image =
        news?.thumb ??
        'https://console.cloudinary.com/console/c-e06757fb4929dbf754259ea7b1e297/media_library/folders/c817421c888927f483bed9409c4af0cb88/asset/bee343f71c34a8a65e04781c09433b78/manage?view_mode=mosaic&context=manage';
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url:
                `${routes.domain.name}${routes.user.news}/${handleSlugify(news?.title)}-${news?._id}.html` ??
                'Tin Tức Đồ Gỗ Triệu',
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

function PageNews({ params }: Props) {
    const { id }: any = params;
    return <NewsDetailContent />;
}

export default PageNews;
