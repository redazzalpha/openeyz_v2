// vue types
export interface VueFunction {
  validate(): boolean;
  resetValidation(): void;
  reset(): void;
}
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

// http types
export interface Body {
  token: string;
  refreshToken: string;
  user: object;
  url: string;
}

// model types
export enum RoleEnum { USER, ADMIN, SUPERADMIN }
export interface Role { roleName: RoleEnum | string; }
export type UserMap = [[]];
export class UserObj {
  name = "";
  avatarSrc = "";
  role = "";
  username = "";
}
export class Item {
  post: Post | null = null;
  commentCount = 0;
  likeCount = 0;
  userLike = false;

}

export class Users {
  username = "";
  lname = "";
  name = "";
  password = "";
  state = true;
  description = "";
  avatarSrc = "";
  dark = false;
  roles = Array<Role>();
}
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
export interface Notif {
  id: number,
  owner: Users,
  author: Users,
  comment: Comment,
  read: boolean,
}
export interface Likes {
  id: number,
  post: Post,
  author: Users,
}
export interface ComObj {
  item: { post: Post; },
  comment: string,
}

