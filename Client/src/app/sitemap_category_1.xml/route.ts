import { categorySITEMAP } from '@/services/sitemapServices';
import { handleSlugify } from '@/utils/handleSlutify';
import { getServerSideSitemap } from 'next-sitemap';

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://dogotrieu.com/';

    try {
        const data: any = await categorySITEMAP();
        const returnXML = data?.map((item: any) => {
            return {
                loc: `${domain}category/${item.slug}`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
            };
        });

        return getServerSideSitemap([
            {
                loc: `${domain}`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
            },

            ...returnXML,
        ]);
    } catch (error) {
        return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }
}
