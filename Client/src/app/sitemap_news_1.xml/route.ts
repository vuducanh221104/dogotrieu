import { newsSITEMAP } from '@/services/sitemapServices';
import { handleSlugify } from '@/utils/handleSlutify';
import { getServerSideSitemap } from 'next-sitemap';

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://dogotrieu.com/';

    try {
        const data: any = await newsSITEMAP();

        const post = data?.map((item: any) => {
            return {
                loc: `${domain}blogs/news/${handleSlugify(item.title)}-${item._id}.html`,
                lastmod: item.updated_at,
                changefreq: 'weekly',
                images: [{ loc: { href: item.thumb }, title: item.title }],
            };
        });

        return getServerSideSitemap([
            {
                loc: `${domain}blogs/news/tagged/all`,
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
            },

            ...post,
        ]);
    } catch (error) {
        return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }
}
