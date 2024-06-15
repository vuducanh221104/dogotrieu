import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;
const httpRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const get = async (path: string, options = {}) => {
    const res = await httpRequest.get(path, options);
    return res.data;
};

export const post = async (path: string, options = {}) => {
    const res = await httpRequest.post(path, options);
    return res;
};

export const patch = async (path: string, options = {}) => {
    const res = await httpRequest.patch(path, options);
    return res;
};

export const deleted = async (path: string, options = {}) => {
    const res = await httpRequest.delete(path, options);
    return res;
};
//SWR
export const fetcher = (url: string) => httpRequest.get(url).then((response) => response.data);

export default httpRequest;
