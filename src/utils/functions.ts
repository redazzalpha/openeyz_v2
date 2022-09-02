import router from '../router';
import store from "@/store";
import { UserMap, VueResponse, Post, Users, Item, Comment, Notif } from './types';
import { DateTime } from "luxon";
import * as defines from './defines';
import { httpRequest } from '@/utils/http';

export async function register(formElem: FormData): Promise<void> {
  await login(formElem);
}
export function login(body: FormData): Promise<void | VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.post(defines.SERVER_ACCESS_URL, body).then(
      () => router.push(defines.HOME_PAGE_URL),
      (error: VueResponse) => reject(error),
    );
  });
}
export async function logout(): Promise<void> {
  await httpRequest.post(defines.SERVER_LOGOUT_URL);
  clearStorage();
  pushAccessUrl();
}


export async function getSimpleUsers(): Promise<void> {
  const res = await httpRequest.get(defines.SERVER_USER_SIMPLE_URL);
  const userListObj = (res.body as UserMap).map((e: string[]) => {
    const [name, avatarSrc, role, username] = e;
    return {
      name: name,
      avatarSrc: avatarSrc,
      role: role,
      username: username,
    };
  });
  store.dispatch("updateUserListObj", userListObj);
  store.dispatch("updateUserCardList", userListObj);
}
export function getUserData(username: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(defines.SERVER_USER_DATA_URL, { params: { username } }).then(
      (response: VueResponse) => resolve(response),
      (error: VueResponse) => reject(error)
    );
  });

}
export async function updateUserState({ username }: Users, state: boolean): Promise<Users> {
  const body: FormData = new FormData();
  if (state) body.append("state", "true");
  else body.append("state", "false");
  body.append("username", username);
  const res: VueResponse = await httpRequest.patch(
    defines.SERVER_USER_STATE_URL,
    body
  );
  return res.body as Users;
}
export async function updateUserRole({ username }: Users, role: string): Promise<Users> {
  const body: FormData = new FormData();
  body.append("roleName", role);
  body.append("username", username);
  const res: VueResponse = await httpRequest.patch(
    defines.SERVER_USER_ROLE_URL,
    body
  );
  return res.body as Users;

}
export async function deleteUserAccount(): Promise<void> {
  await httpRequest.delete(defines.SERVER_USER_DELETE_URL);
  clearStorage();
  router.push(defines.ACCESS_PAGE_URL);
}
export async function modifyUserDescription(description: string): Promise<void> {
  const body: FormData = new FormData();
  body.append("description", description);
  await httpRequest.patch(defines.SERVER_USER_DESCRIPTION_URL, body);
}
export async function modifyUserField(url : string, body: FormData): Promise<void> {
  await httpRequest.patch(url, body);
}
export async function sendUserAvatar(input: HTMLInputElement): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    if(input.files) {
      const file = new FormData();
      file.append("file", input.files[0]);
      httpRequest.post(defines.SERVER_USER_AVATAR_URL, file).then(
        (response: VueResponse) => resolve(response),
        (error: VueResponse) => reject(error)
      );
    }
  });

}
export async function removeUserAvatar(): Promise<void> {
  await httpRequest.post(defines.SERVER_USER_AVATAR_URL);

}
export async function modifyUserTheme(darkMode: boolean): Promise<void> {
  const data: FormData = new FormData();
  data.append("dark", darkMode.toString());
  await httpRequest.patch(defines.SERVER_USER_THEME_URL, data);
}
export function modifyUserPassword(body: FormData): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.patch(defines.SERVER_USER_PASSWORD_URL, body).then(
      (response: VueResponse) => resolve(response),
      (error: VueResponse) => reject(error)
    );
  });

}


export async function getPosts(limit: number, creation?: string, authorId?: string): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    defines.SERVER_PUBLICATION_LIMIT_URL,
    { params: { limit, creation, authorId } }
  );
  store.dispatch("updatePosts", JSON.parse(response.bodyText));
}
export async function addPosts(limit: number, creation?: string, authorId?: string): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    defines.SERVER_PUBLICATION_LIMIT_URL,
    { params: { limit, creation, authorId } }
  );
  (response.body as []).forEach((e: Post) => { store.dispatch('addPosts', e); });
}
export async function publishPost(post: string): Promise<void | VueResponse> {
  return new Promise((resolve, reject) => {
    const data: FormData = new FormData();
    post = post.trim();
    post = post.replace(/<img/g, "<img width=100% style='max-height: 465px; object-fit: cover'");
    data.append("post", post);

    httpRequest.post(defines.SERVER_PUBLICATION_URL, data).then(
      (): void => { getPosts(defines.POST_GET_LIMIT), resolve(); },
      (error: VueResponse) => reject(error)
    );
  });
}
export async function deletePost({ post }: Item, posts: Post[]): Promise<void> {
  await httpRequest.delete(defines.SERVER_PUBLICATION_URL, {
    params: { postId: post?.id },
  });
  await getPosts(defines.POST_GET_LIMIT, posts[posts.length - 1].creation);
}
export function likePost({ post }: Item): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    if (post) {
      const postId: FormData = new FormData();
      postId.append("postId", post.id.toString());
      httpRequest.post(defines.SERVER_LIKE_URL, postId).then(
        () => {
          httpRequest.get(defines.SERVER_LIKE_COUNT_URL, { params: { postId: post?.id } }).then(
            (response: VueResponse) => resolve(response),
            (error: VueResponse) => reject(error),
          );
        },
        (error: VueResponse) => reject(error)
      );
    }
  });
}


export async function getAllComments({ post }: Item, limit: number, creation?: string): Promise<void | VueResponse> {
  const response: VueResponse = await httpRequest.get(
    defines.SERVER_COMMENT_LIMIT_URL,
    { params: { postId: post?.id, limit, creation } }
  );
  store.dispatch("updateComments", response.body as []);

}
export async function addAllComments(postId: number, limit: number, creation?: string): Promise<void | VueResponse> {

  const response: VueResponse | void = await httpRequest.get(
    defines.SERVER_COMMENT_LIMIT_URL,
    { params: { postId, limit, creation } }
  );
  (response.body as []).forEach((e: Post) => { store.dispatch('addComments', e); });
}
export async function sendComment({ post }: Item, comment: string): Promise<void> {

  if (post) {
    const data: FormData = new FormData();
    data.append("comment", comment);
    data.append("postId", post.id.toString());
    await httpRequest.post(defines.SERVER_COMMENT_URL, data);
  }

}
export async function deleteComment({ id }: Comment): Promise<void> {
  await httpRequest.delete(defines.SERVER_COMMENT_DELETE_URL, {
    params: { commentId: id },
  });

}


export async function getNotifs(): Promise<void | VueResponse> {
  if(localStorage.getItem("token")) {
    const response: VueResponse = await httpRequest.get(
      defines.SERVER_USER_NOTIF_URL
    );
    store.dispatch("updateUserNotifs", response.body);
  }
}
export async function readNotif({read, id}: Notif): Promise<void> {
  if (!read) {
    const notifId: FormData = new FormData();
    notifId.append("notifId", id.toString());
    await httpRequest.patch(defines.SERVER_USER_NOTIF_ONE_URL, notifId);
    await getNotifs();
  }
}
export async function deleteNotif({id}: Notif): Promise<void> {
  await httpRequest.delete(defines.SERVER_USER_NOTIF_ONE_URL, {
    params: { notifId: id },
  });
  await getNotifs();
}
export async function readNotifs() : Promise<void> {
  await httpRequest.patch(defines.SERVER_USER_NOTIF_URL);
  await getNotifs();

}
export async function deleteNotifs() : Promise<void> {
  await httpRequest.delete(defines.SERVER_USER_NOTIF_URL);
  await getNotifs();

}


export async function uploaderSend(file: File) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('file', file);

    httpRequest.post(defines.SERVER_IMG_URL, data).then(
      (response: VueResponse) => {
        resolve({ default: (response.body as any).url });
      },
      error => reject(error.body.message),
    );
  });
}


export function clearVuex() {
  store.dispatch("clearVuex");
}
export function clearStorage() {
  store.dispatch("clearVuex"),
    localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("vuex");
}


export function translateDate(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("en").toFormat("DD 'at' HH:mm");
}
export function translateDateToISO(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("fr").toISO();
}


export function unavailableServerHandler(response: VueResponse): void {
  response.bodyText = "server is unavailable";
  pushAccessUrl();
}
export function internalServerErrorHandler(response: VueResponse): void {
  response.bodyText = "internal server error";
  pushAccessUrl();
}
export function defaulHandler({ body, headers }: VueResponse): void {
  const token: string | null = headers.get("x-auth-token");
  const refreshToken: string | null = headers.get("x-refresh-token");
  const user: Users = body as Users;

  if (token && refreshToken && user) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    store.dispatch('updateCurrentUser', user);
  }
}


export function pushAccessUrl(): void {
  clearStorage();
  if (router.currentRoute.path !== "/access")
    router.push(defines.ACCESS_PAGE_URL);
}
