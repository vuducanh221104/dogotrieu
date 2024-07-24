export const handleSplitSlug = (slug: string): string => {
    const temp = slug.split('.html') ?? [];
    const temp2 = temp[0]?.split('-');
    const id = temp2[temp2.length - 1];
    return id;
};
