import axios from 'axios';
import routes from '@/config/routes';
import { handleSplitSlug } from '@/utils/handleSplitSlug';
import dynamic from 'next/dynamic';
const ProductDetail = dynamic(() => import('@/appLayout/products'), { ssr: true });
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
    const { slug } = params;
    const id = handleSplitSlug(slug);

    // Sử dụng axios thay cho fetch
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL_ORI}api/v1/product/seo/${id}`);
    // const product = res.data;
    try {
        const product = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_ORI}api/v1/product/seo/${id}`).then((res) =>
            res.json(),
        );
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

async function ProductDetailPage({ params }: Props) {
    const { slug } = params;
    const id = handleSplitSlug(slug);
    let product;
    try {
        product = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_ORI}api/v1/product/seo/${id}`).then((res) =>
            res.json(),
        );
        if (!product || !product.name) {
            notFound(); // Gọi notFound nếu không có sản phẩm
        }
    } catch {
        notFound();
    }
    if (product) {
        return <>{<ProductDetail productId={id} />}</>;
    }
    return notFound();
}

export default ProductDetailPage;
