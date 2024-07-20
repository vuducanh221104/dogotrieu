import { APIResponseSWR, Category } from '@/types/client';
import * as httpRequest from '@/utils/httpRequest';
import { AxiosError } from 'axios';
import useSWR from 'swr';

interface CategoryData {
    data?: Category;
    nameCategory: string;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

//[GET] ~ Dynamic filter
export const categoryFilterGet = (query: string): APIResponseSWR<any> => {
    const url = `api/v1/category/${query}`;

    // Sử dụng SWR để lấy dữ liệu
    const { data, error, isLoading, mutate } = useSWR<CategoryData>(url, httpRequest.fetcher, {
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

//[GET]
export const categoryGet = (): APIResponseSWR<Category> => {
    const url = `api/v1/category`;
    const { data, error, isLoading, mutate } = useSWR(url, httpRequest.fetcher, {
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

//[POST]
export const categoryAdd = async (data: any): Promise<any> => {
    try {
        const res = await httpRequest.post(`api/v1/category`, data);
        return res.data;
    } catch (error: any) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};

//[PATCH]
export const categoryUpdate = async (data: any): Promise<any> => {
    try {
        const res = await httpRequest.patch(`api/v1/category`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};
//[DELETE]
export const categoryDelete = async (ids: {}): Promise<any> => {
    try {
        const res = await httpRequest.deleted(`api/v1/category`, {
            data: { ids },
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};
