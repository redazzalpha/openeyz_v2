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
                    router.push(Defines.HOME_PAGE_RELATIVE_URL);
                }, 
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    
    post: function (url: string, body: FormData | string | object | null): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.post(url, body)
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
    get: function (url: string): Promise<VueResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.get(url)
            .then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => reject(error),
            );
        });
    }, 
};