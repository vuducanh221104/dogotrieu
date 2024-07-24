import routes from '@/config/routes';

const imageThumb = 'https://res.cloudinary.com/do4zld720/image/upload/v1721658548/logo_lrp6uu.png';

export const jsonWebsite = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    '@id': `${routes.domain.name}/#website`,
    url: routes.domain.name,
    name: 'Đồ Gỗ Triêu',
    description: 'Khám phá bàn ghế, ghế sofa, đèn, tủ, kệ, phụ kiện trang trí, tượng, tranh,... và nội thất bằng gỗ',
    inLanguage: 'vi',
};
export const jsonLdStore = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Đồ Gỗ Triệu',
    image: {
        '@type': 'ImageObject',
        url: '',
        width: 1080,
        height: 1080,
    },
    url: routes.domain.name,
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ho Chi Minh',
        addressLocality: 'Ho Chi Minh',
        postalCode: '100000',
        addressRegion: 'Ho CHi Minh',
        addressCountry: 'VN',
    },
    priceRange: '1000 - 1000000000',
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '23:00',
        },
    ],
    geo: {
        '@type': 'GeoCoordinates',
        latitude: '10.762622',
        longitude: '106.660172',
    },
};
export const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${routes.domain.name}/#organization`,
    name: 'Hỏi Dân IT',
    url: routes.domain.name,
    sameAs: [routes.social.facebook, routes.social.instagram, routes.social.youtube],
    logo: {
        '@type': 'ImageObject',
        '@id': `${imageThumb}/#logo`,
        inLanguage: 'vi',
        url: imageThumb,
        contentUrl: imageThumb,
        width: 1080,
        height: 1080,
        caption: 'Đồ Gỗ Triệu',
    },
    image: {
        '@id': `${imageThumb}/#logo`,
    },
};
