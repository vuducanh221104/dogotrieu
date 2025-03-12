'use client';
import * as httpRequest from '@/utils/httpRequest';
import * as httpRequestAdmin from '@/utils/httpRequestAdmin';
import { AxiosError } from 'axios';
import useSWR from 'swr';

//[POST]
export const materialAdd = async (data: {}) => {
    try {
        const res = await httpRequestAdmin.adminPost<any>(`api/v1/material`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};
//[GET]
export const materialGet = () => {
    const url = `api/v1/material`;
    const { data, error, isLoading, mutate } = useSWR<any, AxiosError>(url, httpRequest.fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        errorRetryCount: 0,
    });

    if (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
    return { data, error, isLoading, mutate };
};

//[PATCH]
export const materialUpdate = async (data: any) => {
    try {
        const res = await httpRequestAdmin.adminPatch<any>(`api/v1/material`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};
//[DELETE]
export const materialDelete = async (ids: {}) => {
    try {
        const res = await httpRequestAdmin.adminDeleted<any>(`api/v1/material`, {
            data: { ids },
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        // console.error(err.response?.data);
    }
};
