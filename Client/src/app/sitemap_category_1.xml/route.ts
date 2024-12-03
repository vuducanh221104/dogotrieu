import { categorySITEMAP } from '@/services/sitemapServices';

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://dogotrieu.com/';
    const data = await categorySITEMAP();

    const generateChildrenSitemap = (children: any[]) => {
        return children
            .map(
                (child) => `
                <url>
                    <loc>${domain}category/${child.slug}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                </url>
            `,
            )
            .join('');
    };

    const sitemapXML = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
            ${data
                ?.map(
                    (item: any) => `
                    <url>
                        <loc>${domain}category/${item.slug}</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>
                        <changefreq>daily</changefreq>
                    </url>
                    ${item.children.length > 0 ? generateChildrenSitemap(item.children) : ''}
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
