import Vue from 'vue';
import router from '../router/index';
import * as Defines from './defines';

export const httpRequest = {
    login: function (body: FormData): Promise<JSON>  {
        return new Promise((resolve, reject) => {
            Vue.http.post(Defines.SERVER_ACCESS_URL, body, {credentials: true})
            .then(
                (response: JSON) => {
                    resolve(response);
                    router.push(Defines.HOME_PAGE_RELATIVE_URL)
                },
                (error: JSON) => reject(error),
            );
        });
    }, 
    
    post: function (url: string, body: FormData | string | object | null): Promise<JSON>  {
        return new Promise((resolve, reject) => {
            Vue.http.post(url, body, {credentials: true})
            .then(
                (response: JSON) => resolve(response),
                (error: JSON) => reject(error),
            );
        });
    }, 
    get: function (url: string): Promise<JSON>  {
        return new Promise((resolve, reject) => {
            Vue.http.get(url, {credentials: true})
            .then(
                (response: JSON) => resolve(response),
                (error: JSON) => reject(error),
            );
        });
    }, 
};