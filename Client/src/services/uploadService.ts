import * as httpRequest from '@/utils/httpRequest';
import useSWR, { mutate } from 'swr';

//mutate (hiện ảnh ngay thì thêm )
// export const uploadCloud = async (arrayImage: any) => {
//     const url = 'http://localhost:4000/api/v1/upload/uploadCloud';

//     try {
//         const data = await httpRequest.fetcherPost(url, arrayImage);
//         mutate(url, data, false);
//         return { data, error: null };
//     } catch (error) {
//         return { data: null, error };
//     }
// };

export const uploadCloud = async (arrayImage: any) => {
    const res = await httpRequest.post('api/v1/upload', arrayImage);
    return res.data;
};
