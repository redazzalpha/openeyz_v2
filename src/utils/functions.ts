import router from '../router';
import store from "@/store";
import { UserMap, VueResponse, Post, Users, Item, Comment, Notif, Body } from './types';
import { DateTime } from "luxon";
import * as defines from './defines';
import { httpRequest } from '@/utils/http';
import vuetify from '@/plugins/vuetify';

export function login(body: FormData): Promise<void | VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.post(defines.SERVER_ACCESS_URL, body).then(
      () => router.push(defines.HOME_PAGE_URL),
      (error: VueResponse) => { alert("error", error.bodyText); reject(error); },
    );
  });
}
export function register(formElem: FormData): Promise<void | VueResponse> {
  return new Promise((resolve, reject) => {
    login(formElem).then(
      () => resolve(),
      (error: VueResponse) => { alert("error", error.bodyText); reject(error); },
    );
  });
}
export async function logout(): Promise<void> {
  try {
    await httpRequest.post(defines.SERVER_LOGOUT_URL);
  }
  finally {
    clearStorage();
    pushAccessUrl();
  }
}


export function getSimpleUsers(): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(defines.SERVER_USER_SIMPLE_URL).then(
      (response: VueResponse) => {
        const userListObj = (response.body as UserMap).map((e: string[]) => {
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
        resolve(response);
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function getUserData(username: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(defines.SERVER_USER_DATA_URL, { params: { username } }).then(
      (response: VueResponse) => resolve(response),
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });

}
export function updateUserState({ username }: Users, state: boolean): Promise<Users> {
  return new Promise((resolve, reject) => {
    const body: FormData = new FormData();
    if (state) body.append("state", "true");
    else body.append("state", "false");
    body.append("username", username);
    httpRequest.patch(defines.SERVER_USER_STATE_URL, body).then(
      (response: VueResponse) => resolve(response.body as Users),
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function updateUserRole({ username }: Users, role: string): Promise<Users> {
  return new Promise((resolve, reject) => {
    const body: FormData = new FormData();
    body.append("roleName", role);
    body.append("username", username);
    httpRequest.patch(defines.SERVER_USER_ROLE_URL, body).then(
      (response: VueResponse) => resolve(response.body as Users),
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function modifyUserField(url: string, body: FormData): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.patch(url, body).then(
      (response: VueResponse) => { success("modification done"); resolve(response); },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function modifyUserDescription(description: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    const body: FormData = new FormData();
    body.append("description", description);
    httpRequest.patch(defines.SERVER_USER_DESCRIPTION_URL, body).then(
      (response: VueResponse) => { success("modification done"); resolve(response); },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function modifyUserTheme(darkMode: boolean): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    const data: FormData = new FormData();
    data.append("dark", darkMode.toString());
    httpRequest.patch(defines.SERVER_USER_THEME_URL, data).then(
      (response: VueResponse) => resolve(response),
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function modifyUserPassword(body: FormData): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.patch(defines.SERVER_USER_PASSWORD_URL, body).then(
      (response: VueResponse) => { success("modification done"); resolve(response); },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function sendUserAvatar(input: HTMLInputElement): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    if (input.files) {
      const file = new FormData();
      file.append("file", input.files[0]);
      httpRequest.post(defines.SERVER_USER_AVATAR_URL, file).then(
        (response: VueResponse) => resolve(response),
        (error: VueResponse) => {
          failed(error.bodyText);
          reject(error);
        },
      );
    }
  });
}
export function removeUserAvatar(): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.post(defines.SERVER_USER_AVATAR_URL).then(
      (response: VueResponse) => resolve(response),
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function deleteUserAccount(): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.delete(defines.SERVER_USER_DELETE_URL).then(
      (response: VueResponse) => {
        clearStorage();
        store.dispatch("updateLoader", false);
        success("account  successfully deleted");
        setTimeout(() => {
          store.dispatch("updateLoader", true);
        }, 4000);
        setTimeout(() => {
          pushAccessUrl();
          resolve(response);
        }, 8000);
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}

export function getPosts(limit: number, creation?: string, authorId?: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(
      defines.SERVER_PUBLICATION_LIMIT_URL,
      { params: { limit, creation, authorId } }
    ).then(
      (response: VueResponse) => { store.dispatch("updatePosts", JSON.parse(response.bodyText)); resolve(response); },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );

  });
}
export function   addPosts(limit: number, creation?: string, authorId?: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(
      defines.SERVER_PUBLICATION_LIMIT_URL,
      { params: { limit, creation, authorId } }
    ).then(
      (response: VueResponse) => {
        (response.body as []).forEach((e: Post) => { store.dispatch('addPosts', e); });
        resolve(response);
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function publishPost(post: string): Promise<void | VueResponse> {
  return new Promise((resolve, reject) => {
    const data: FormData = new FormData();
    post = post.trim();
    post = post.replace(/<img/g, "<img width=100% style='max-height: 465px; object-fit: cover'");
    data.append("post", post);

    httpRequest.post(defines.SERVER_PUBLICATION_URL, data).then(
      (response: VueResponse): void => { getPosts(defines.POST_GET_LIMIT), resolve(response); },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function deletePost({ post }: Item, posts: Post[]): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.delete(defines.SERVER_PUBLICATION_URL, {
      params: { postId: post?.id },
    }).then(
      () => {
        getPosts(defines.POST_GET_LIMIT, posts[posts.length - 1].creation).then(
          (response: VueResponse) => resolve(response),
          (error: VueResponse) => {
            failed(error.bodyText);
            reject(error);
          },
        );
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
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
            (error: VueResponse) => {
              failed(error.bodyText);
              reject(error);
            },
          );
        },
        (error: VueResponse) => {
          failed(error.bodyText);
          reject(error);
        },
      );
    }
  });
}


export function getAllComments({ post }: Item, limit: number, creation?: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(
      defines.SERVER_COMMENT_LIMIT_URL,
      { params: { postId: post?.id, limit, creation } }
    ).then(
      (response: VueResponse) => {
        store.dispatch("updateComments", response.body as []);
        resolve(response);
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function addAllComments(postId: number, limit: number, creation?: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(
      defines.SERVER_COMMENT_LIMIT_URL,
      { params: { postId, limit, creation } }
    ).then(
      (response: VueResponse) => {
        (response.body as []).forEach((e: Post) => { store.dispatch('addComments', e); });
        resolve(response);
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export function sendComment({ post }: Item, comment: string): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    if (post) {
      const data: FormData = new FormData();
      data.append("comment", comment);
      data.append("postId", post.id.toString());
      httpRequest.post(defines.SERVER_COMMENT_URL, data).then(
        (response: VueResponse) => {
          resolve(response);
        },
        (error: VueResponse) => {
          failed(error.bodyText);
          reject(error);
        },
      );
    }
    else reject("post is empty");
  });
}
export function deleteComment({ id }: Comment): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.delete(defines.SERVER_COMMENT_DELETE_URL, {
      params: { commentId: id },
    }).then(
      (response: VueResponse) => resolve(response),
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}


export function getNotifs(): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("token")) {
      httpRequest.get(
        defines.SERVER_USER_NOTIF_URL
      ).then(
        (response: VueResponse) => {
          store.dispatch("updateUserNotifs", response.body);
          resolve(response);
        },
        (error: VueResponse) => {
          failed(error.bodyText);
          reject(error);
        },
      );
    }
  });
}
export function readNotif({ read, id }: Notif): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    if (!read) {
      const notifId: FormData = new FormData();
      notifId.append("notifId", id.toString());
      httpRequest.patch(defines.SERVER_USER_NOTIF_ONE_URL, notifId).then(
        () => {
          getNotifs().then(
            (response: VueResponse) => resolve(response),
            (error: VueResponse) => {
              failed(error.bodyText);
              reject(error);
            },

          );
        },
        (error: VueResponse) => {
          failed(error.bodyText);
          reject(error);
        },
      );
    }
    else reject("notitfication is already read");
  });
}
export function deleteNotif({ id }: Notif): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.delete(defines.SERVER_USER_NOTIF_ONE_URL, {
      params: { notifId: id },
    }).then(
      () => {
        getNotifs().then(
          (response: VueResponse) => resolve(response),
          (error: VueResponse) => {
            failed(error.bodyText);
            reject(error);
          },
        );
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
export async function readNotifs(): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.patch(defines.SERVER_USER_NOTIF_URL).then(
      () => {
        getNotifs().then(
          (response: VueResponse) => resolve(response),
          (error: VueResponse) => {
            failed(error.bodyText);
            reject(error);
          },
        );
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });

}
export function deleteNotifs(): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.delete(defines.SERVER_USER_NOTIF_URL).then(
      () => {
        getNotifs().then(
          (response: VueResponse) => resolve(response),
          (error: VueResponse) => {
            failed(error.bodyText);
            reject(error);
          },

        );
      },
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });

}


export async function uploaderSend(file: File) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('file', file);

    httpRequest.post(defines.SERVER_IMG_URL, data).then(
      (response: VueResponse) => {

        const body: Body = response.body as Body;
        resolve({ default: body.url });
      },
      error => reject(error.body.message),
    );
  });
}


export function clearVuex() {
  store.dispatch("clearVuex");
}
export function clearStorage() {
  store.dispatch("clearVuex");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("vuex");
}

export function btnSize(): string {
  return vuetify.framework.breakpoint.name == 'xs' ? '100%' : '50%';
}

export function translateDate(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("en").toFormat("DD 'at' HH:mm");
}
export function translateDateToISO(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("fr").toISO();
}

export function unavailableServerHandler(response: VueResponse): void {
  response.bodyText = "server is unavailable";
}

export function defaultHandler({ body, headers }: VueResponse): void {
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
  if (router.currentRoute.name != "access") {
    clearStorage();
    router.push(defines.ACCESS_PAGE_URL);
  }
}

export function alert(type: string, message: string): void {
  store.dispatch("updateAlertType", type);
  store.dispatch("updateAlertMessage", message);
  store.dispatch("updateAlert", true);
  setTimeout(() => {
    store.dispatch("updateAlert", false);
  }, 4000);
}
export function alertPersist(type: string, message: string): void {
  clearStorage();
  store.dispatch("updateLoader", false);
  store.dispatch("updateAlertType", type);
  store.dispatch("updateAlertMessage", message);
  store.dispatch("updateAlertPersist", true);
}
export function success(message: string): void {
  alert("success", message);
}
export function failed(message: string): void {
  if (/^(.*JWT.*)|(.*Unauthorized.*)$/gi.test(message))
    alertPersist("error", "auth. error please connect !");
  else alert("error", message);
}
