import * as httpRequest from '@/utils/httpRequest';
import useSWR from 'swr';
//[GET]
// export const search = (q: string, type: string = 'less') => {
//     const url = `api/v1/product/searchQuery?q=${q}&type=${type}`;
//     const { data, error, isLoading ,mutate} = useSWR(url, httpRequest.fetcher, {
//         revalidateIfStale: false,
//         revalidateOnFocus: false,
//         revalidateOnReconnect: false,
//     });

//     if (error) {
//         console.log(error);
//     }
//     return { data, error, isLoading,mutate };
// };

export const searchFilter = (query: string) => {
    const url = `api/v1/product/search/${query}`;
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
export const search = async (q: string, type: string = 'less') => {
    try {
        const res = await httpRequest.get(`api/v1/product/searchQuery?q=${q}&type=${type}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
