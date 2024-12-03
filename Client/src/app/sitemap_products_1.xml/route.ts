import { productSITEMAP } from '@/services/sitemapServices';
import { handleSlugify } from '@/utils/handleSlutify';

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://dogotrieu.com/';
    const data = await productSITEMAP();

    const sitemapXML = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
            ${data
                ?.map(
                    (item) => `
                    <url>
                        <loc>${domain}products/${handleSlugify(item.name)}-${item._id}.html</loc>
                        <lastmod>${item.updated_at}</lastmod>
                        <changefreq>daily</changefreq>
                        <image:image>
                            <image:loc>${item.thumb}</image:loc>
                            <image:title>${item.name}</image:title>
                        </image:image>
                    </url>
                `,
                )
                .join('')}
        </urlset>
    `;

    return new Response(sitemapXML.trim(), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
