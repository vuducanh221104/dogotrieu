//HANDLE FILTER DATA THUMB AND AFTER TO CHANGE
// export const resizeImage = (data: any) => {
//     if (!data) return [];
//     return data.map((item: any) => {
//         const thumbUrl = new URL(item.thumb);
//         const uploadIndex = thumbUrl.pathname.indexOf('/upload/') + 8;
//         const updatedThumbUrl = `${thumbUrl.origin}${thumbUrl.pathname.slice(
//             0,
//             uploadIndex,
//         )}w_300,h_450/${thumbUrl.pathname.slice(uploadIndex)}`;
//         return { ...item, thumb: updatedThumbUrl };
//     });
// };

export const resizeImageThumb = (url: string) => {
    const thumbUrl = new URL(url);
    const uploadIndex = thumbUrl.pathname.indexOf('/upload/') + 8;
    return `${thumbUrl.origin}${thumbUrl.pathname.slice(0, uploadIndex)}w_300,h_450/${thumbUrl.pathname.slice(
        uploadIndex,
    )}`;
};

export const resizeImageDetailThumb = (url: string) => {
    const thumbUrl = new URL(url);
    const uploadIndex = thumbUrl.pathname.indexOf('/upload/') + 8;
    return `${thumbUrl.origin}${thumbUrl.pathname.slice(0, uploadIndex)}w_800,h_1200/${thumbUrl.pathname.slice(
        uploadIndex,
    )}`;
};

export const resizeImageDetailImages = (url: string) => {
    const thumbUrl = new URL(url);
    const uploadIndex = thumbUrl.pathname.indexOf('/upload/') + 8;
    return `${thumbUrl.origin}${thumbUrl.pathname.slice(0, uploadIndex)}w_135,h_195/${thumbUrl.pathname.slice(
        uploadIndex,
    )}`;
};
