import Vue from 'vue';
import router from '@/router/index';
import * as Defines from './defines';
import { VueResponse } from './types';
import { SERVER_REFRESH_TOKEN_URL } from './defines';
import { pushAccessUrl } from '../utils/functions';

export const httpRequest = {
    login: function (body: FormData): Promise<VueResponse> {
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
    post: function (url: string, body?: FormData | string | object | null): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.post(url, body).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    // const regexp = new RegExp("JWT expired");
                    // if (regexp.test(error.bodyText)) {
                    if (error.status == 401) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.post(url, body).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { pushAccessUrl(); reject(error); }
                        );
                    }
                    else reject(error);
                },
            );
        });
    },
    put: function (url: string, body?: FormData | string | object | null): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.put(url, body).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    // const regexp = new RegExp("JWT expired");
                    // if (regexp.test(error.bodyText)) {
                    if (error.status == 401) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.put(url, body).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { pushAccessUrl(); reject(error); }
                        );
                    }
                    else reject(error);
                },
            );
        });
    },
    patch: function (url: string, body?: FormData | string | object | null): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.patch(url, body).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    // const regexp = new RegExp("JWT expired");
                    // if (regexp.test(error.bodyText)) {
                    if (error.status == 401) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.patch(url, body).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { pushAccessUrl(); reject(error); }
                        );
                    }
                    else reject(error);
                },
            );
        });
    },
    get: function (url: string, config?: object): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.get(url, { ...config }).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    // const regexp = new RegExp("JWT expired");
                    // if (regexp.test(error.bodyText)) {
                    if (error.status == 401) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.get(url, { ...config }).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { pushAccessUrl(); reject(error); }
                        );
                    }
                    else reject(error);
                },
            );
        });
    },
    head: function (url: string, config?: object): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.head(url, { ...config }).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    // const regexp = new RegExp("JWT expired");
                    // if (regexp.test(error.bodyText)) {
                    if (error.status == 401) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.head(url, { ...config }).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { pushAccessUrl(); reject(error); }
                        );
                    }
                    else reject(error);
                },
            );
        });
    },
    delete: function (url: string, config?: object): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.delete(url, { ...config }).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    // const regexp = new RegExp("JWT expired");
                    // if (regexp.test(error.bodyText)) {
                    if (error.status == 401) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.delete(url, { ...config }).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { pushAccessUrl(); reject(error); }
                        );
                    }
                    else reject(error);
                },
            );
        });
    },
};