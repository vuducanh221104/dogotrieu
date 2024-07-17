import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';

//[GET] ~ Dynamic filter
export const categoryFilterGet = (query: any) => {
    const url = `api/v1/category/${query}`;

    // Sử dụng SWR để lấy dữ liệu
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
//[POST]
export const categoryAdd = async (data: {}) => {
    try {
        const res = await httpRequest.post(`api/v1/category`, data);

        return res.data;
    } catch (error) {
        console.error(error);
    }
};

//[GET]
export const categoryGet = () => {
    const url = `api/v1/category`;
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
export const categoryUpdate = async (data: any) => {
    try {
        const res = await httpRequest.patch(`api/v1/category`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
//[DELETE]
export const categoryDelete = async (ids: {}) => {
    try {
        const res = await httpRequest.deleted(`api/v1/category`, {
            data: { ids },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
