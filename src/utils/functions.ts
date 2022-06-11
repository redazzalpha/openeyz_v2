import store from "@/store";
import { httpRequest } from "./http";
import { UserMap, VueResponse } from "./types";
import { DateTime } from "luxon";
import * as Defines from "./defines";

export async function getSimpleUsers(): Promise<void> {
  const res = await httpRequest.get(Defines.SERVER_USER_SIMPLE_URL);
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
export async function getAllPosts(): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    Defines.SERVER_PUBLICATION_URL
  );
  store.dispatch("updatePosts", JSON.parse(response.bodyText));
}
export async function getAllUserPosts(
  authorId: string
): Promise<void | VueResponse> {
  const response: VueResponse | void = await httpRequest.get(
    Defines.SERVER_PUBLICATION_URL,
    { params: { authorId } }
  );
  store.dispatch("updateUserPosts", JSON.parse(response.bodyText));
}
export async function getAllComments(postId: number): Promise<void | VueResponse> {
  const response: VueResponse = await httpRequest.get(
    Defines.SERVER_COMMENT_URL,
    { params: { postId } }
  );
  store.dispatch("updateComments", response.body);
}
export async function getAllNotifs(): Promise<void | VueResponse> {
  const response: VueResponse = await httpRequest.get(
    Defines.SERVER_USER_NOTIF_URL
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
