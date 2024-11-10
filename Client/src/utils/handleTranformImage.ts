export const transformedImage = (imageUrl: string): any => {
    const transformedImage = imageUrl.replace('/upload/', '/upload/w_1900,h_800,c_fit/');
    return transformedImage;
};

export const transformedImageNews = (imageUrl: string): any => {
    const transformedImage = imageUrl.replace('/upload/', '/upload/w_1200,h_680,c_fit/');
    return transformedImage;
};
