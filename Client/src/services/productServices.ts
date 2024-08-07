import { Product, ProductDetail, ProductType } from '@/types/client';
import * as httpRequest from '@/utils/httpRequest';
import { AxiosError } from 'axios';
import useSWR from 'swr';

//GET ~ GET SSR SEO
export const productSEOGET = async (id: string): Promise<ProductDetail | undefined> => {
    try {
        const res = await httpRequest.get<any>(`api/v1/product/type/${id}`);
        return res;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};

//[POST]
export const productAdd = async (data: any): Promise<ProductDetail | undefined> => {
    try {
        const res = await httpRequest.post<any>(`api/v1/product`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};
//[GET]
export const productGetId = (id: string) => {
    const url = `api/v1/product/type/${id}`;
    const { data, error, isLoading } = useSWR<any, AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.error(error.response?.data);
    }
    return { data, error, isLoading };
};
//[GET]
export const productGetOnly = () => {
    const url = `api/v1/product/only`;
    const { data, error, isLoading, mutate } = useSWR<any, AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.error(error);
    }
    return { data, error, isLoading, mutate };
};
//[GET]
export const productGetAll = () => {
    const url = `api/v1/product/list`;
    const { data, error, isLoading, mutate } = useSWR<any, AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        console.error(error.response?.data);
    }
    return { data, error, isLoading, mutate };
};

//[DELETE]
export const productDelete = async (product_id: string, product_type_id: string): Promise<void> => {
    try {
        const res = await httpRequest.deleted<void>(`api/v1/product`, { data: { product_id, product_type_id } });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};
//[PATCH]
export const productPatch = async (
    id: string,
    product_data: Partial<Product>,
    product_type_data: Partial<ProductType>,
): Promise<Product | undefined> => {
    try {
        const res = await httpRequest.patch<any>(`api/v1/product/${id}`, {
            ...product_data,
            product_type_id: product_type_data,
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data);
    }
};

//[GET]~Get Featured Product
export const featuredProductGet = (query: string) => {
    const url = `api/v1/product/category/featured/byCate${query}`;
    const { data, error, isLoading } = useSWR<Product[], AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        throw error;
    }
    return { data, error, isLoading };
};
//[GET]
export const featuredProductGetById = (query: string) => {
    const url = `api/v1/product/category/featured/byId${query}`;
    const { data, error, isLoading } = useSWR<any, AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        throw error;
    }
    return { data, error, isLoading };
};
