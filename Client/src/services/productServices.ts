import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';

export const productGetId = (id: string) => {
    const url = `api/v1/product/type/${id}`;
    const { data, error, isLoading } = useSWR(url, httpRequest.fetcherGet);

    if (error) {
        console.log(error);
    }
    return { data, error, isLoading };
};

export const productGetAll = () => {
    const url = `api/v1/product/get`;
    const { data, error, isLoading } = useSWR(url, httpRequest.fetcherGet);

    if (error) {
        console.log(error);
    }
    return { data, error, isLoading };
};
