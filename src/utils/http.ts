import Vue from 'vue';
import { VueResponse } from './types';
import { SERVER_REFRESH_TOKEN_URL } from './defines';

const tokenExpired = new RegExp("JWT expired");

export const httpRequest = {
    post: function (url: string, body?: FormData | string | object | null): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.post(url, body).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    if (error.status == 401 && tokenExpired.test(error.bodyText)) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.post(url, body).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { reject(error); }
                        );
                    }
                    else {
                        reject(error);
                    }
                },
            );
        });
    },
    put: function (url: string, body?: FormData | string | object | null): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.put(url, body).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    if (error.status == 401 && tokenExpired.test(error.bodyText)) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.put(url, body).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { reject(error); }
                        );
                    }
                    else {
                        reject(error);
                    }
                },
            );
        });
    },
    patch: function (url: string, body?: FormData | string | object | null): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.patch(url, body).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    if (error.status == 401 && tokenExpired.test(error.bodyText)) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.patch(url, body).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { reject(error); }
                        );
                    }
                    else {
                        reject(error);
                    }
                },
            );
        });
    },
    get: function (url: string, config?: object): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.get(url, { ...config }).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    if (error.status == 401 && tokenExpired.test(error.bodyText)) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.get(url, { ...config }).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { reject(error); }
                        );
                    }
                    else {
                        reject(error);
                    }
                },
            );
        });
    },
    head: function (url: string, config?: object): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.head(url, { ...config }).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    if (error.status == 401 && tokenExpired.test(error.bodyText)) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.head(url, { ...config }).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { reject(error); }
                        );
                    }
                    else {
                        reject(error);
                    }
                },
            );
        });
    },
    delete: function (url: string, config?: object): Promise<VueResponse> {
        return new Promise((resolve, reject) => {
            Vue.http.delete(url, { ...config }).then(
                (response: VueResponse) => resolve(response),
                (error: VueResponse) => {
                    if (error.status == 401 && tokenExpired.test(error.bodyText)) {
                        const refreshTokenForm: FormData = new FormData();
                        refreshTokenForm.append("refreshToken", localStorage.getItem("refreshToken") as string);
                        httpRequest.post(SERVER_REFRESH_TOKEN_URL, refreshTokenForm).then(
                            () => {
                                Vue.http.delete(url, { ...config }).then(
                                    (response: VueResponse) => resolve(response),
                                    (error: VueResponse) => reject(error)
                                );
                            },
                            (error: VueResponse) => { reject(error); }
                        );
                    }
                    else {
                        reject(error);
                    }
                },
            );
        });
    },
};