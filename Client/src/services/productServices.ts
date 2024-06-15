import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';
//[POST]
export const productAdd = async (data: {}) => {
    try {
        const res = await httpRequest.post(`api/v1/product/add`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//[GET]
export const productGetId = (id: string) => {
    const url = `api/v1/product/type/${id}`;
    const { data, error, isLoading } = useSWR(url, httpRequest.fetcher);

    if (error) {
        console.log(error);
    }
    return { data, error, isLoading };
};
//[GET]
export const productGetAll = () => {
    const url = `api/v1/product/get`;
    const { data, error, isLoading } = useSWR(url, httpRequest.fetcher);

    if (error) {
        console.log(error);
    }
    return { data, error, isLoading };
};
