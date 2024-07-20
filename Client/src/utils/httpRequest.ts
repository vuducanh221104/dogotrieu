import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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

export const patch = async (path: string, options: object | [] = {}): Promise<AxiosResponse<any>> => {
    const res = await httpRequest.patch(path, options);
    return res;
};

export const deleted = async (path: string, options: object = {}): Promise<AxiosResponse<any>> => {
    const res = await httpRequest.delete(path, options);
    return res;
};
//SWR
export const fetcher = (url: string) => httpRequest.get(url).then((response) => response.data);

export default httpRequest;
