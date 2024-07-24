import ProductDetail from '@/appLayout/products';
import routes from '@/config/routes';
import { productSEOGET } from '@/services/productServices';
import { handleSlugify } from '@/utils/handleSlutify';
import { handleSplitSlug } from '@/utils/handleSplitSlug';
import type { Metadata } from 'next';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;

    const id = handleSplitSlug(slug);

    const product: any = await productSEOGET(id);

    return {
        title: product?.name,
        description: `Shop This ${product?.name} Available now online at Dogotrieu.com!`,
        openGraph: {
            title: product?.name,
            description: `Shop This ${product?.name} Available now online at Dogotrieu.com!`,
            type: 'website',
            url: `${routes.domain.name}/products/${slug}`,
            images: [
                {
                    url: product?.thumb,
                    alt: product?.name,
                },
            ],
        },
        twitter: {
            title: product?.name,
            description: `Shop This ${product?.name} Available now online at Dogotrieu.com!`,
            card: 'summary_large_image',
            site: `${routes.domain.nameCamel}$`,

            images: [
                {
                    url: product?.thumb,
                    alt: product?.name,
                },
            ],
        },
    };
}

function ProductDetailPage({ params }: Props) {
    const { slug } = params;

    const id = handleSplitSlug(slug);

    return <>{<ProductDetail productId={id} />}</>;
}

export default ProductDetailPage;
