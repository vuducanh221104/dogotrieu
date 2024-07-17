import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';

//[POST]
export const newsAdd = async (data: {}) => {
    try {
        const res = await httpRequest.post(`api/v1/news`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

//[GET]
export const newsGetAll = () => {
    const url = `api/v1/news`;
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

//[GET]
export const newGetAllLimit = (query: string) => {
    const url = `api/v1/news/all${query}`;
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
//[GET]
export const newsGetById = (id: string) => {
    const url = `api/v1/news/${id}`;
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

//[GET]
export const newsFeaturedGet = (queryString: any) => {
    const url = `/api/v1/news/featuredNews?${queryString}`;
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
export const newsPatchById = async (id: string, data: any) => {
    try {
        const res = await httpRequest.patch(`api/v1/news/${id}`, {
            ...data,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
//[DELETE]
export const newsDelete = async (idNews: string) => {
    try {
        const res = await httpRequest.deleted(`api/v1/news/${idNews}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
