import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { KeyedMutator } from 'swr';
export interface APIResponseSWR<T> {
    data: T;
    error?: string | any;
    isLoading: boolean;
    mutate: KeyedMutator<any>;
}
axios.defaults.withCredentials = true;
const httpRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const get = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpRequest.get<T>(path, options);
    return res.data;
};

export const post = async <T>(
    path: string,
    data?: any,
    options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
    const res = await httpRequest.post<T>(path, data, options);
    return res;
};

export const patch = async <T>(
    path: string,
    data?: any,
    options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
    const res = await httpRequest.patch<T>(path, data, options);
    return res;
};

export const deleted = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    const res = await httpRequest.delete<T>(path, options);
    return res;
};

// SWR
export const fetcher = <T>(url: string) => httpRequest.get<T>(url).then((response) => response.data);

export default httpRequest;
