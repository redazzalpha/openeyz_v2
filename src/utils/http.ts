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

};