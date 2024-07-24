import { searchSEOGET } from '@/services/searchServices';
import { Metadata } from 'next';
import PageSearchWrapper from '@/appLayout/search/Search';
import routes from '@/config/routes';
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { q } = searchParams;
    const searchData: any = await searchSEOGET(q);

    const title = `${searchData?.name_query} - DOGOTRIEU.COM`;
    const description =
        'Khám phá những món đồ nội thất mới, xưa, tự nhiên, dân tộc và đậm chất bản xứ cho không gian sống của bạn. Tham khảo bàn, ghế, sofa, đèn chiếu sáng, tủ, kệ, phụ kiện, đồ trang trí và nội thất bằng gỗ.';
    const image = 'https://res.cloudinary.com/do4zld720/image/upload/v1721573753/image-SEO-home_hajvj7.jpg';
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/search?${q}`,
            images: [
                {
                    url: image,
                    alt: 'DOGOTRIEU.COM',
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
                    alt: 'DOGOTRIEU.COM',
                },
            ],
        },
    };
}

function PageSearch() {
    return (
        <>
            <PageSearchWrapper />
        </>
    );
}
export default PageSearch;
