export type VueFunction = { validate: () => boolean };

export type VueElement = undefined | Vue | Element | (Vue | Element)[];

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
  url: string;
  body: Body;
  headers: Headers;
  method: string;
  params: object;
  timeout: number;
  credentials: boolean;
  emulateHTTP: boolean;
  emulateJSON: boolean;
  before: (Request: Request) => (void);
  progress: (Request: Event) => (void);

  getUrl: () => (string);
  getBody: () => (Body);
  respondWith: (body: Body, config: object) => (Response);
  abort: () => (void);

};

export type Users = {
  username: string;
  lname: string;
  name: string;
  password: string;
  state: boolean;
  description: string;
  avatarSrc: string;
  roles: Array<Role>;
};

export enum RoleEnum { USER, ADMIN, SUPERADMIN };

export type Role = {
  roleName: RoleEnum,
};

export type Body = {
  token: string,
  user: object,
};
