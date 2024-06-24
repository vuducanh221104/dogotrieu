import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';

//[GET]
export const homeGet = () => {
    const url = `api/v1/home`;
    const { data, error, isLoading, mutate } = useSWR(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.log(error);
    }
    return { data, error, isLoading, mutate };
};

//[PATCH]
export const homePatch = async (data: any) => {
    try {
        const res = await httpRequest.patch(`api/v1/home`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//[PATCH]
export const homePatchFeatProduct = async (idFeatProduct: string, data: any) => {
    try {
        const res = await httpRequest.patch(`api/v1/home/featProduct/${idFeatProduct}`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const homeDeleteFeatProduct = async (idFeatProduct: string) => {
    try {
        const res = await httpRequest.deleted(`api/v1/home/featProduct/${idFeatProduct}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
