import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';
//[POST]
export const categoryAdd = async (data: {}) => {
    try {
        const res = await httpRequest.post(`api/v1/category`, data);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//[GET]
export const categoryGet = () => {
    const url = `api/v1/category`;
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
