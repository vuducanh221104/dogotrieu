import routes from '@/config/routes';
import { handleSplitSlug } from '@/utils/handleSplitSlug';
import dynamic from 'next/dynamic';
const ProductDetail = dynamic(() => import('@/appLayout/products'), { ssr: true });
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productSEOGET } from '@/services/productServices';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
    const { slug } = params;
    const id = handleSplitSlug(slug);

    try {
        const product = await productSEOGET(id);
        if (!product || !product.name) {
            notFound();
        }

        const name = product.name;
        const description = `Mua sản phẩm ${name} hiện đang có sẵn tại Dogotrieu.com!`;
        const url = `${routes.domain.name}/products/${slug}`;
        const image = product?.thumb;

        return {
            title: name,
            description: description,
            openGraph: {
                title: name,
                description: description,
                type: 'website',
                url: url,
                images: [
                    {
                        url: image,
                        alt: name,
                    },
                ],
            },
            twitter: {
                title: name,
                description: description,
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
    } catch (error) {
        notFound();
    }
}

const ProductDetailPage = async ({ params }: Props) => {
    const { slug } = params;
    const id = handleSplitSlug(slug);

    return <ProductDetail productId={id} />;
};

export default ProductDetailPage;
