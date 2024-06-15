import * as httpRequest from '@/utils/httpRequest';
import useSWR, { mutate } from 'swr';

//[POST]
export const materialAdd = async (data: {}) => {
    try {
        const res = await httpRequest.post(`api/v1/material`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
//[GET]
export const materialGet = () => {
    const url = `api/v1/material`;
    const { data, error, isLoading } = useSWR(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.log(error);
    }
    return { data, error, isLoading };
};
