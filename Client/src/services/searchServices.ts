import { Product } from '@/types/client';
import * as httpRequest from '@/utils/httpRequest';
import { AxiosError } from 'axios';
import useSWR from 'swr';

export interface SearchData {
    data: Product[];
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    searchTerm: string;
}

//[GET]
export const searchSEOGET = async (q: string | any) => {
    try {
        const res = await httpRequest.get<any>(`api/v1/product/searchSeo?q=${q}`);
        return res;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};

//[GET]
export const searchFilter = (query: string) => {
    const url = `api/v1/product/search/${query}`;
    const { data, error, isLoading, mutate } = useSWR<any, AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.error(error.response?.data);
        // throw error
    }

    return {
        data: data ?? { data: [], totalPages: 0, totalItems: 0, itemsPerPage: 0, currentPage: 0, searchTerm: '' },
        error,
        isLoading: isLoading,
        mutate,
    };
};
//GET
export const search = async (q: string, type: string = 'less'): Promise<any> => {
    try {
        const res = await httpRequest.get<any>(`api/v1/product/searchQuery?q=${q}&type=${type}`);
        return res;
    } catch (error) {
        return [];
    }
};
