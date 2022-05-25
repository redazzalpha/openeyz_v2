export type VueFunction = { validate: () => boolean };
export type VueElement = undefined | Vue | Element | (Vue | Element)[];
export type HttpResponse = { 
    body: object | Blob | string, 
    bodyText: string,
    url: string,
    headers: Headers,
    ok: boolean,
    status: number,
    statusText: string,
    text: () => Promise<string>,
    json: () => Promise<JSON>,
    blob: () => Promise<Blob>,
};
