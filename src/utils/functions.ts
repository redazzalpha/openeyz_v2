import store from "@/store";
import { httpRequest } from "./http";
import { UserMap, VueResponse, Post, Item } from "./types";
import { DateTime } from "luxon";
import { SERVER_PUBLICATION_LIMIT_URL, SERVER_COMMENT_URL, SERVER_USER_NOTIF_URL, SERVER_USER_SIMPLE_URL, HOME_PAGE_URL, POST_GET_LIMIT } from './defines';
import router from "@/router";

export async function getSimpleUsers(): Promise<void> {
  const res = await httpRequest.get(SERVER_USER_SIMPLE_URL);
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
export async function getAllPosts(limit: number, creation?: string): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    SERVER_PUBLICATION_LIMIT_URL,
    { params: { limit, creation } }
  );
  store.dispatch("updatePosts", JSON.parse(response.bodyText));
}
export async function addAllPosts(limit: number, creation?: string): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    SERVER_PUBLICATION_LIMIT_URL,
    { params: { limit, creation } }
  );
  (response.body as []).forEach((e: Post) => { store.dispatch('addPosts', e); });
}
export async function getAllUserPosts(
  authorId: string, limit: number
): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    SERVER_PUBLICATION_LIMIT_URL,
    { params: { authorId, limit } }
  );
  store.dispatch("updateUserPosts", JSON.parse(response.bodyText));
}
export async function addAllUserPosts(authorId: string, limit: number, creation?: string): Promise<void | VueResponse> {


  console.log("before request")
  const response: VueResponse | void = await httpRequest.get(
    SERVER_PUBLICATION_LIMIT_URL,
    { params: { authorId, limit, creation } }
  );
  (response.body as []).forEach((e: Post) => { store.dispatch('addUserPosts', e); });
}

export async function getAllComments(postId: number): Promise<void | VueResponse> {
  const response: VueResponse = await httpRequest.get(
    SERVER_COMMENT_URL,
    { params: { postId } }
  );
  store.dispatch("updateComments", response.body);
}
export async function getAllNotifs(): Promise<void | VueResponse> {
  const response: VueResponse = await httpRequest.get(
    SERVER_USER_NOTIF_URL
  );
  store.dispatch("updateUserNotifs", response.body);
}

export function clearVuex() {
  store.dispatch("clearVuex");
}
export function clearStorage() {
  store.dispatch("clearVuex"), localStorage.removeItem("token");
  localStorage.removeItem("vuex");
}

export function translateDate(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("en").toFormat("DD 'at' HH:mm");
}
export function translateDateToISO(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("fr").toISO();
}
