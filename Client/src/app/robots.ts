import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const url = process.env.NEXT_PUBLIC_CLIENT_URL;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${url}sitemap.xml`,
    };
}
