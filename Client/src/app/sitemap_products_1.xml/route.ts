import { productSITEMAP } from '@/services/sitemapServices';
import { handleSlugify } from '@/utils/handleSlutify';
import { getServerSideSitemap } from 'next-sitemap';

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://dogotrieu.com/';

    try {
        const data: any = await productSITEMAP();

        const post = data?.map((item: any) => {
            return {
                loc: `${domain}products/${handleSlugify(item.name)}-${item._id}.html`,
                lastmod: item.updated_at,
                changefreq: 'daily',
                images: [{ loc: { href: item.thumb }, title: item.name }],
            };
        });

        return getServerSideSitemap([...post]);
    } catch (error) {
        return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }
}
