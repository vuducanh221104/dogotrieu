import CategoryContent from '@/appLayout/category/Category';
import routes from '@/config/routes';
import { categorySEOGET } from '@/services/categoryServices';
import { Metadata } from 'next';
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;

    const searchData: any = await categorySEOGET(slug);

    const title = searchData?.name_category;
    const description = `Trải nghiệm sự thanh lịch và chân thực của Châu Âu và Châu Á của Đồ Gỗ Triệu. Mua sắm ngay để tận hưởng cuộc sống hiện đại đầy phong cách!`;
    const image = searchData?.image;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            url: `${routes.domain.name}/category/${slug}`,
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

function PageCategory() {
    return <CategoryContent />;
}

export default PageCategory;
