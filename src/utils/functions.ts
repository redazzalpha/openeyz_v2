import router from '../router';
import store from "@/store";
import { UserMap, VueResponse, Post, Users, Item, Comment, Notif } from './types';
import { DateTime } from "luxon";
import * as defines from './defines';
import { httpRequest } from '@/utils/http';
import vuetify from '@/plugins/vuetify';
import { v4 as uuidv4 } from "uuid";
import { socketHandler } from '@/js/socket';
import { POST_GET_LIMIT } from './defines';

/**
 * logs the user in
 * @param {FormData} body - login input form 
 * @returns {Promise<void | VueResponse>}
 */
export function login(body: FormData): Promise<void | VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.post(defines.SERVER_ACCESS_URL, body).then(
      () => { router.push(defines.HOME_PAGE_URL); socketHandler.connect(); },
      (error: VueResponse) => { alert("error", error.bodyText); reject(error); },
    );
  });
}
/**
 * registers the user and logs in
 * @param {FormData} formElem - register input form 
 * @returns {Promise<void | VueResponse>}
 */
export function register(formElem: FormData): Promise<void | VueResponse> {
  return new Promise((resolve, reject) => {
    login(formElem).then(
      () => resolve(),
      (error: VueResponse) => { alert("error", error.bodyText); reject(error); },
    );
  });
}
/**
 * logs the user out 
 * @function
 * @async
 */
export async function logout(): Promise<void> {
  try {
    await httpRequest.post(defines.SERVER_LOGOUT_URL);
    socketHandler.disconnect();
    clearStorage();
    pushAccessUrl();
  }
  finally {
    // clearStorage();
    // pushAccessUrl();
    // socketHandler.disconnect();
  }
}


/**
 * Gets all users data as simple form
 * @function
 * @returns {Promise<VueResponse>} 
 */
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
/**
 *  Gets current user data
 * @function
 * @returns {Promise<VueResponse>}
 */
export function getUser(): Promise<VueResponse> {
  return new Promise((resolve, reject) => {
    httpRequest.get(defines.SERVER_USER_URL).then(
      (response: VueResponse) => resolve(response),
      (error: VueResponse) => {
        failed(error.bodyText);
        reject(error);
      },
    );
  });
}
/**
 * Gets user data from given username  
 * @function
 * @param {string} username - username to get data from
 * @returns {Promise<VueResponse>}
 */
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
/**
 * modify user account state on server from given username 
 * @function
 * @param {Object} user - represents user instance
 * @param {boolean} state - account state value  
 * @returns {Promise<Users>}
 */
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
/**
 * Modify and save user role from given username
 * @function
 * @param {Object}  user - represents user instance
 * @param {string} role - role name as string  
 * @returns 
 */
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
/**
 * Modify and save data for given api path 
 * according body data
 * @function
 * @param {string} url - server api path to modify  
 * @param {Object} body - body data to modify 
 * @returns {Promise<VueResponse>}
 */
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
/**
 * Modify user avatar image
 * @function
 * @param {HTMLInputElement} input - input form file  
 * @returns {Promise<VueResponse>}
 */
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
export function addPosts(limit: number, creation?: string, authorId?: string): Promise<VueResponse> {
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
    generateFiles().forEach(file => data.append("images", file));
    post = post.trim();
    data.append("post", post);

    httpRequest.post(defines.SERVER_PUBLICATION_URL, data).then(
      (response: VueResponse): void => {
        getPosts(defines.POST_GET_LIMIT),
          resolve(response);
      },
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
/**
 * Adds following publication to the list of threads of publications 
 * on scroll to bottom
 * @function
 * @param {number} postId - represents the post id  
 * @param {number} limit - limit of max publications to get  
 * @param {string} creation - creation date of last publication in the list of threads of publications
 * @returns {Promise<VueResponse>}
 */
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
      comment = comment.trim();
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

/**
 * Gets notifications from current user
 * @function
 * @returns {Promise<VueResponse>}
 */
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
/**
 * Reads notification from current user
 * @function
 * @param {Object} Notif - notification instance
 * @returns {Promise<VueResponse>}
 */
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
/**
 * Reads all notitications from current user
 * @function
 * @async
 * @returns {Promise<VueResponse>}
 */
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

// this function became useless due to the upload image update
/**
 * @function
 * @async
 * @param {File} file - file instance 
 * @returns {Promise<string>}
 */
export async function uploaderSend(file: File) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('file', file);

    httpRequest.post(defines.SERVER_IMG_URL, data).then(
      () => {

        // const body: Body = response.body as Body;
        resolve("");
        // resolve({ default: body.url });
      },
      error => reject(error.body.message),
    );
  });
}

/**
 * clears all variable values from state management 
 * @function
 */
export function clearVuex() {
  store.dispatch("clearVuex");
}

/**
 * clears all variable values from localstorage 
 * @function
 */
export function clearStorage() {
  store.dispatch("clearVuex");
  localStorage.removeItem("token");
  localStorage.removeItem("ws-user-name");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("vuex");
}

/**
 * Determines publish button size according screen size
 * @function 
 * @returns {string}
 */
export function btnSize(): string {
  return vuetify.framework.breakpoint.name == 'xs' ? '100%' : '50%';
}
/**
 * Translate ISO datetime string to human format string
 * @param {string} timestamp - date and time as ISO format 
 * @returns {string}
 */
export function translateDate(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("en").toFormat("DD 'at' HH:mm");
}
/**
 * Translate human datetime string to ISO format string
 * @param {string} timestamp - date and time as ISO format 
 * @returns {string}
 */
export function translateDateToISO(timestamp: string): string {
  return DateTime.fromISO(timestamp).setLocale("fr").toISO();
}
/**
 * unavailable server handler on http response 
 * @function
 * @param {VueResponse} response - http response
 */
export function unavailableServerHandler(response: VueResponse): void {
  response.bodyText = "server is unavailable";
}
/**
 * internal server error handler on http response 
 * @function
 * @param {VueResponse} response - http response
 */
export function internalServerErrorHandler(response: VueResponse): void {
  let message = "internal server error";
  const regexp = new RegExp(".*Maximum upload size.*", "gi");
  if (regexp.test(response.bodyText))
    message = "content exceeds max size 20mb";

  response.bodyText = message;
}
/**
 * bad request handler on http response 
 * @function
 * @param {VueResponse} response - http response
 */
export function badRequestHandler(): void {
  getPosts(POST_GET_LIMIT);
}
/**
 * default handler on http response 
 * @function
 * @param {VueResponse} param - http response
 * @param {Body} param.body 
 * @param {Headers} param.headers 
 */
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
/**
 * Redirects to access page
 * @function
 */
export function pushAccessUrl(): void {
  if (router.currentRoute.name != "access") {
    clearStorage();
    router.push(defines.ACCESS_PAGE_URL);
  }
}
/**
 * Redirects to team page user from given username
 * @function
 * @param {string} username - name of the user on page to redirects 
 */
export function pushTeamUrl(username: string): void {
  if (username && router.currentRoute.name != "teamId") {
    store.dispatch("updateCommentDialog", false);
    router.push("/team/" + username);
  }
}

/**
 * alert on success action
 * @function
 * @param {string} type - type of alerte  
 * @param {string} message - alerte message 
 */
export function alert(type: string, message: string): void {
  store.dispatch("updateAlertType", type);
  store.dispatch("updateAlertMessage", message);
  store.dispatch("updateAlert", true);
  setTimeout(() => {
    store.dispatch("updateAlert", false);
  }, 4000);
}
/**
 * Persistent alert on error action
 * @function
 * @param {string} type - type of alert 
 * @param {string} message - alert message 
 */
export function alertPersist(type: string, message: string): void {
  clearStorage();
  router.push('access');
  store.dispatch("updateLoader", false);
  store.dispatch("updateAlertType", type);
  store.dispatch("updateAlertMessage", message);
  store.dispatch("updateAlertPersist", true);
}
/**
 * Shows alert on success action
 * @function
 * @param {string} message - success alert message 
 */
export function success(message: string): void {
  alert("success", message);
}
/**
 * Selects type and shows alert on error
 * @function
 * @param {string} message - alert message  
 */
export function failed(message: string): void {
  const jwtError: boolean = new RegExp("(.*JWT.*)|(.*Unauthorized.*)", "gi").test(message);
  const forbiddenError: boolean = new RegExp(".*forbidden.*", "gi").test(message);
  const unavailableServerError: boolean = new RegExp(".*server is unavailable.*", "gi").test(message);
  const isAccesPage: boolean = router.currentRoute.name == "access";

  if (jwtError)
    alertPersist("error", "auth. error please connect !");
  else if (forbiddenError && !isAccesPage)
    alertPersist("error", "your account has been disabled");
  else if (unavailableServerError && !isAccesPage)
    alertPersist("error", message);
  else alert("error", message);
}
/**
 * Generates image files and filename and stores them into a list 
 * @returns {File[]} Returns list of file added in one publication
 */
export function generateFiles(): File[] {
  const fileList: Array<File> = new Array<File>();
  const imageTags: HTMLImageElement[] = document.querySelectorAll(
    "figure.image.ck-widget img, p img"
  ) as unknown as HTMLImageElement[];
  imageTags.forEach((img) => {
    const dataUrlTab = img.currentSrc.split(",");
    const match = dataUrlTab[0].match(/:(.*?);/);
    if (match) {
      const mimeType = match[1];
      const data = atob(dataUrlTab[1]);
      const dataSize = data.length;
      const buffer = new Uint8Array(dataSize);
      for (let i = 0; i < dataSize; i++) buffer[i] = data.charCodeAt(i);
      fileList.push(new File([buffer], uuidv4() + "." + mimeType.split("/")[1], { type: mimeType }));
    }
  });
  return fileList;
}
/**
 * Shorthand to get current user data from state management
 * @function
 * @param {string} value - param to get
 * @returns {string}
 */
export function getCurrent(value: string): string {
  return store.state.currentUser ? store.state.currentUser[value] : "";
}
/**
 * Shorthand to get current user role from state management
 * @function
 * @returns {string}
 */
export function getCurrentRole(): string {
  return store.state.currentUser ? (store.state.currentUser as Users).roles[0].roleName as string : "";
}
/**
 * Initializes pages when mounted on the DOM
 * @function
 * @param {function} callback - callback function
 * @returns {Promise<void>|void}
 */
export function initialize(callback?: () => void): Promise<VueResponse | void> {
  return new Promise((resolve, reject) => {

    if (!(socketHandler.isConnected()) && router.currentRoute.name != "access")
      socketHandler.connect();

    getUser().then(
      (response: VueResponse) => {
        store.dispatch("updateCurrentUser", response.body);
        getNotifs();
        resolve(response);
      },
      (error: VueResponse) => reject(error)
    );
    store.dispatch("updateLoader", false);
    store.dispatch("updateAlert", false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (callback) callback();
  });
}
/**
 * Handles the overflow when modal is shown
 * @function
 * @param {boolean} show - value of overflow visibility 
 */
export function overflow(show?: boolean): void {

  const hide = !show;

  const htmlTag: HTMLElement | null = document.querySelector("html");
  const teamSelectedTag: HTMLElement | null = document.querySelector(".team-selected-card");

  const isTSDialog = store.state.teamSelectedDialog;
  const isCommentDialog = store.state.commentDialog;

  htmlTag?.classList.remove("overflow-y-auto");
  htmlTag?.classList.remove("overflow-y-hidden");
  teamSelectedTag?.classList.remove("overflow-y-auto");
  teamSelectedTag?.classList.remove("overflow-y-hidden");

  if (hide) {
    if (htmlTag) htmlTag.style.overflow = "hidden";
    if (teamSelectedTag && isTSDialog && isCommentDialog) teamSelectedTag.style.overflow = "hidden";
  }

  else if (show) {
    if (htmlTag && !isTSDialog) htmlTag.style.overflow = "auto";
    if (teamSelectedTag && isTSDialog) teamSelectedTag.style.overflow = "auto";
  }
}
/**
 * Closes all dialogs 
 * @function
 */
export function closeDialogs() {
  store.dispatch("updateCommentDialog", false);
  store.dispatch("updateTeamSelectedDialog", false);
  store.dispatch("updateTeamSelectedUser", null);
  overflow(true);
}
/**
 * execute given action on press enter 
 * @function
 * @param {KeyboardEvent} param
 * @param {number} param.code
 * @param {function} action 
 */
export function enterPressed({ code }: KeyboardEvent, action: () => void) {
  const isEnter: boolean = code == "Enter" || code == "NumpadEnter";
  if (isEnter) action();

}
/**
 * execute given action on press escape
 * @function
 * @param {keyboardEvent} param 
 * @param {number} param.code 
 * @param {function} action 
 */
export function escapePressed({ code }: KeyboardEvent, action: () => void) {
  if (code.match("Escape")) action();
}

/**
 * returns number of unread notifications
 * @function
 * @returns {number}
 */
export function unreadNotif() {
  return store.state.userNotifs.filter((e: Notif) => {
    return !e.read;
  }).length;
}

export function reveal(): Promise<string> {
  return new Promise((resolve, reject) => {
    httpRequest.get(defines.SERVER_USER_REVEAL_URL).then(
      (response: VueResponse) => resolve(response.bodyText),
      (error: VueResponse) => { alert("error", error.bodyText); reject(error); },
    );
  });
}