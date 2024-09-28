import CategoryContent from '@/appLayout/category/Category';
import routes from '@/config/routes';
import { userBreadCumbs } from '@/services/menuData/breadCrumbData';
import { Metadata } from 'next';
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
    const { slug } = params;

    const title = userBreadCumbs[slug];
    if (!title) {
        return undefined;
    }
    const description = `Trải nghiệm sự thanh lịch và chân thực của Châu Âu và Châu Á của Đồ Gỗ Triệu. Mua sắm ngay để tận hưởng cuộc sống hiện đại đầy phong cách!`;
    const image =
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

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
