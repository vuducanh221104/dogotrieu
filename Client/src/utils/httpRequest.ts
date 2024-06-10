import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;
const httpRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const fetcherGet = (url: string) => httpRequest.get(url).then((response) => response.data);
export const fetcherPost = (url: string) => httpRequest.post(url).then((response) => response.data);
export const fetcherPatch = (url: string) => httpRequest.patch(url).then((response) => response.data);
export const fetcherDeleted = (url: string) => httpRequest.delete(url).then((response) => response.data);

export default httpRequest;
