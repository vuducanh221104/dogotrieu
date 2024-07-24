import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const url = process.env.NEXT_PUBLIC_CLIENT_URL;
    return [
        {
            url: `${url}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${url}products/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${url}category/all`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${url}search?q=`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${url}pages/about`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${url}pages/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${url}pages/trade`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${url}blogs/news`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${url}category/`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
    ];
}
