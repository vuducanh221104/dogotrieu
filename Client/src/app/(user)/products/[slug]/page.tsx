import routes from '@/config/routes';
import { productSEOGET } from '@/services/productServices';
import { handleSplitSlug } from '@/utils/handleSplitSlug';
// import ProductDetail from '@/appLayout/products';
import dynamic from 'next/dynamic';
const ProductDetail = dynamic(() => import('@/appLayout/products'), { ssr: true });
import type { Metadata } from 'next';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
    const { slug } = params;

    const id = handleSplitSlug(slug);

    // const product: any = await productSEOGET(id);
    let product: any;
    try {
        product = await productSEOGET(id);
    } catch (error) {
        product = undefined;
    }
    if (!product) {
        return undefined;
    }

    const name = product?.name ?? 'Đồ Gỗ Cũ';
    const image =
        product?.thumb ??
        'https://res.cloudinary.com/do4zld720/image/upload/v1727272176/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_1_q39ljx.png';

    return {
        title: name,
        description: `Mua sản phẩm ${name} hiện đang có sẵn tại Dogotrieu.com!`,
        openGraph: {
            title: name,
            description: `Mua sản phẩm ${name} hiện đang có sẵn tại Dogotrieu.com!`,
            type: 'website',
            url: `${routes.domain.name}/products/${slug}`,
            images: [
                {
                    url: image,
                    alt: name,
                },
            ],
        },
        twitter: {
            title: name,
            description: `Mua sản phẩm ${name} hiện đang có sẵn tại Dogotrieu.com!`,
            card: 'summary_large_image',
            site: `${routes.domain.nameCamel}$`,

            images: [
                {
                    url: image,
                    alt: name,
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
