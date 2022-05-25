export type VueFunction = { validate: () => boolean };
export type VueElement = undefined | Vue | Element | (Vue | Element)[];
export type Body = {
  token: string,
  user: object,
}
export type VueResponse = {
  body: object | Blob | string | Body, 
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
export type VueRequest = {
  url : string;
  body : any;
  headers : Headers;
  method : string;
  params : object;
  timeout : number;
  credentials : boolean;
  emulateHTTP : boolean;
  emulateJSON : boolean;
  before : (Request: Request) => (void);
  progress : (Request: Event) => (void);

  getUrl : () => (string);
  getBody : () => (any);
  respondWith : (body: any, config: object)  => (Response);
  abort : () => (void);

};
