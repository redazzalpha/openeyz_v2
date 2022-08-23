import Vue from 'vue';
import router from '@/router/index';
import * as Defines from './defines';
import { VueResponse } from './types';

export const httpRequest = {
    login: function (body: FormData): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.post(Defines.SERVER_ACCESS_URL, body)
            .then(
                () => {
                    router.push(Defines.HOME_PAGE_URL);
                }, 
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    post: function (url: string, body?: FormData | string | object | null): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.post(url, body)
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    put: function (url: string, body?: FormData | string | object | null): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.put(url, body)
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    patch: function (url: string, body?: FormData | string | object | null): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.patch(url, body)
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    get: function (url: string, config?: object): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.get(url, {...config})
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    head: function (url: string, config?: object): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.head(url, {...config})
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    delete: function (url: string, config?: object): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.delete(url, {...config})
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
};