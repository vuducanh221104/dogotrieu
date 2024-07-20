import { APIResponseSWR, Product } from '@/types/client';
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
export const searchFilter = (query: string): APIResponseSWR<SearchData> => {
    const url = `api/v1/product/search/${query}`;
    const { data, error, isLoading, mutate } = useSWR<SearchData>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.error(error.response?.data);
    }

    return {
        data: data ?? { data: [], totalPages: 0, totalItems: 0, itemsPerPage: 0, currentPage: 0, searchTerm: '' },
        error,
        isLoading: isLoading,
        mutate,
    };
};
//GET
export const search = async (q: string, type: string = 'less'): Promise<Product[]> => {
    try {
        const res = await httpRequest.get<Product[]>(`api/v1/product/searchQuery?q=${q}&type=${type}`);
        return res;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
        return [];
        // throw new Error('Failed Search Not Found');
    }
};
