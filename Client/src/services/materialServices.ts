import * as httpRequest from '@/utils/httpRequest';
import useSWR, { mutate } from 'swr';

//[POST]
export const materialAdd = async (data: {}) => {
    try {
        const res = await httpRequest.post(`api/v1/material`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
//[GET]
export const materialGet = () => {
    const url = `api/v1/material`;
    const { data, error, isLoading, mutate } = useSWR(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.error(error);
    }
    return { data, error, isLoading, mutate };
};

//[PATCH]
export const materialUpdate = async (data: any) => {
    try {
        const res = await httpRequest.patch(`api/v1/material`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
//[DELETE]
export const materialDelete = async (ids: {}) => {
    try {
        const res = await httpRequest.deleted(`api/v1/material`, {
            data: { ids },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
