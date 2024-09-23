export const handleSplitSlug = (slug: string): string => {
    const temp = slug.split('.html') ?? [];
    const temp2 = temp[0]?.split('-');
    const id = temp2[temp2.length - 1];
    return id;
};

// export const handleSplitSlug = (slug: string): string => {
//     if (!slug || typeof slug !== 'string') {
//         console.error('Invalid slug:', slug);
//         return ''; // Trả về một giá trị mặc định nếu slug không hợp lệ
//     }
//     const temp = slug.split('.html') ?? [];
//     const temp2 = temp[0]?.split('-');
//     const id = temp2[temp2.length - 1];
//     return id;
// };
