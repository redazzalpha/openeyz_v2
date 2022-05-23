import Vue from 'vue';
import router from '../router/index';
import * as Defines from './defines';
import { HttpResponse } from './types';

export const httpRequest = {
    login: function (body: FormData): Promise<HttpResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.post(Defines.SERVER_ACCESS_URL, body)
            .then(
                (response: HttpResponse) => {
                    localStorage.setItem("token", response.bodyText)
                    router.push(Defines.HOME_PAGE_RELATIVE_URL);
                }, 
                (error: HttpResponse) => reject(error),
            );
        });
    }, 
    
    post: function (url: string, body: FormData | string | object | null): Promise<HttpResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.post(url, body)
            .then(
                (response: HttpResponse) => resolve(response),
                (error: HttpResponse) => reject(error),
            );
        });
    }, 
    get: function (url: string): Promise<HttpResponse>  {
        return new Promise((resolve, reject) => {
            Vue.http.get(url)
            .then(
                (response: HttpResponse) => resolve(response),
                (error: HttpResponse) => reject(error),
            );
        });
    }, 
};