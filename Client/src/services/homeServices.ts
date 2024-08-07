import * as httpRequest from '@/utils/httpRequest';
import { AxiosError } from 'axios';
import useSWR from 'swr';

//[GET]
export const homeGet = () => {
    const url = `api/v1/home`;
    const { data, error, isLoading, mutate } = useSWR<any, AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
    return { data, error, isLoading, mutate };
};

//[PATCH]
export const homePatch = async (data: any) => {
    try {
        const res = await httpRequest.patch<any>(`api/v1/home`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};

//[PATCH]
export const homePatchFeatProduct = async (idFeatProduct: string, data: any) => {
    try {
        const res = await httpRequest.patch<any>(`api/v1/home/featProduct/${idFeatProduct}`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};
//[DELETE]

export const homeDeleteFeatProduct = async (idFeatProduct: string) => {
    try {
        const res = await httpRequest.deleted<any>(`api/v1/home/featProduct/${idFeatProduct}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};
