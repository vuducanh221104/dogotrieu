export async function GET() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://dogotrieu.com/';

    const data: {
        index?: number;
        name: string;
        date: string | Date;
    }[] = [
        {
            index: 0,
            name: 'register',
            date: '2024-12-03T09:35:00-05:00',
        },
        {
            index: 1,
            name: 'login',
            date: '2024-12-03T09:35:00-05:00',
        },
        {
            index: 2,
            name: 'recover',
            date: '2024-12-03T09:35:00-05:00',
        },
    ];

    const sitemapXML = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
            ${data
                ?.map(
                    (item) => `
                    <url>
                        <loc>${domain}pages/${item.name}</loc>
                        <lastmod>${item.date}</lastmod>
                        <changefreq>weekly</changefreq>
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
