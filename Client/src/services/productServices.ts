import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';
//[POST]
export const productAdd = async (data: {}) => {
    try {
        const res = await httpRequest.post(`api/v1/product`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//[GET]
export const productGetId = (id: string) => {
    const url = `api/v1/product/type/${id}`;
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
//[GET]
export const productGetOnly = () => {
    const url = `api/v1/product/only`;
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
//[GET]
export const productGetAll = () => {
    const url = `api/v1/product/list`;
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
//[DELETE]
export const productDelete = async (product_id: string, product_type_id: string) => {
    try {
        const res = await httpRequest.deleted(`api/v1/product`, { data: { product_id, product_type_id } });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
//[PATCH]
export const productPatch = async (id: string, product_data: any, product_type_data: any) => {
    try {
        const res = await httpRequest.patch(`api/v1/product/${id}`, {
            ...product_data,
            product_type_id: product_type_data,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//[GET]~Get Featured Product
export const featuredProductGet = (query: string) => {
    const url = `api/v1/product/category/featured/byCate${query}`;
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
