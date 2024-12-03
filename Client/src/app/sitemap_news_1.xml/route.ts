import { newsSITEMAP } from '@/services/sitemapServices';
import { handleSlugify } from '@/utils/handleSlutify';

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://dogotrieu.com/';
    const data = await newsSITEMAP();

    const sitemapXML = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
                <url>
                     <loc>${domain}blogs/news/tagged/all</loc>
                     <lastmod>2024-11-28T03:30:28.830Z</lastmod>
                     <changefreq>weekly</changefreq>
                </url>
            ${data
                ?.map(
                    (item) => `
                    <url>
                        <loc>${domain}blogs/news/${handleSlugify(item.title)}-${item._id}.html</loc>
                        <lastmod>${item.updated_at}</lastmod>
                        <changefreq>weekly</changefreq>
                        <image:image>
                            <image:loc>${item.thumb}</image:loc>
                            <image:title>${item.title}</image:title>
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
