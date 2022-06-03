// vue types
export type VueFunction = { validate: () => boolean };
export type VueElement = undefined | Vue | Element | (Vue | Element)[];
export interface VueResponse {
  body: object | Blob | string | Body | object[];
  bodyText: string;
  url: string;
  headers: Headers;
  ok: boolean;
  status: number;
  statusText: string;

  text: () => Promise<string>;
  json: () => Promise<JSON>;
  blob: () => Promise<Blob>;
}
export interface VueRequest {
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

}

// model types
export enum RoleEnum { USER, ADMIN, SUPERADMIN }
export interface Role {
  roleName: RoleEnum | string;
}
// export type Users = {
//   username: string,
//   lname: string,
//   name: string,
//   password: string,
//   state: boolean,
//   description: string,
//   avatarSrc: string,
//   roles: Array<Role>;
// }
export class Users{
  username = "";
  lname = "";
  name = "";
  password = "";
  state = true;
  description = "";
  avatarSrc = "";
  roles: Array<Role> = [];
}

export type UserMap = [[]];

export interface Post {
  id: number;
  content: string;
  creation: string;
  author: Users;
}
export interface Comment {
  id: number;
  content: string;
  creation: string;
  author: Users;
  post: Post;
}
export interface Item {
  post?: Post;
  creation?: string;
  commentCount?: number;
  likeCount?: number;
  userLike?: boolean;

}
// export type Item = {
//   post:Post,
// }

// http types
export interface Body {
  token: string;
  user: object;
}
