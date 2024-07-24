import slugify from 'slugify';

export const handleSlugify = (value: string) => (value ? slugify(value, { lower: true, locale: 'vi' }) : '');
