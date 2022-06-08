import { Post } from '../utils/types';
import { UserObj, Notif } from './../utils/types';
import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';
import { httpRequest } from './../utils/http';
import * as Defines from './../utils/defines';
import { Users, VueResponse } from "../utils/types";
import VuexPersistence from 'vuex-persist';


const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

// FIXME:  try to fix bug on persistant vuex cause when server is off or empty data still remains and looks like working

export default new Vuex.Store({
  state: {
    userListObj : [] as UserObj[],
    userLOSecondary : [] as UserObj[],
    posts: [] as Post[],
    userPosts: [] as Post[],
    comments: [] as Comment[],
    userNotifs: [] as Notif[],

    currentUser: Users,

    teamSelectedUser: UserObj,
    teamSelectDialog: false,

    drawer: null,

    tabAccess: 0,
    tabProfile: 0,
  },
  getters: {
    btnSize(): string {
      return Vuetify.framework.breakpoint.name == 'xs' ? '100%' : '50%';
    },
  },
  mutations: {
    UPDATE_CURRENT_USER(state, payload): void {
      state.currentUser = payload;
    },
    UPDATE_USER_LIST_OBJ(state, payload): void {
      state.userListObj = payload;
    },
    UPDATE_USER_LO_SECONDARY(state, payload): void {
      state.userLOSecondary = payload;
    },
    UPDATE_POSTS(state, payload): void {
      state.posts = payload;
    },
    UPDATE_USER_POSTS(state, payload): void {
      state.userPosts = payload;
    },
    UPDATE_COMMENTS(state, payload): void {
      state.comments = payload;
    },
    UPDATE_USER_NOTIFS(state, payload): void {
      state.userNotifs = payload;
    },


    UPDATE_TEAM_SELECTED_USER(state, payload): void {
      state.teamSelectedUser = payload;
    },
    UPDATE_TEAM_SELECT_DIALOG(state, payload: boolean): void {
      state.teamSelectDialog = payload;
    },


    UPDATE_DRAWER(state, payload): void {
      state.drawer = payload;
    },


    UPDATE_TAB_ACCESS(state, payload: number): void {
      state.tabAccess = payload;
    },
    UPDATE_TAB_PROFILE(state, payload: number): void {
      state.tabProfile = payload;
    },


    CLEAR_VUEX(state) {
      state.currentUser = Users;
      state.userListObj = [] as UserObj[];
      state.userLOSecondary = [] as UserObj[];
      state.userNotifs = [] as Notif[],


      state.teamSelectedUser = UserObj,
      state.teamSelectDialog = false;

      state.drawer = null;
  
      state.tabAccess = 0;
      state.tabProfile = 0;
  
      state.posts = [];
      state.userPosts = [];
      state.comments = [];
    }
  },
  actions: {
    updateCurrentUser(context, payload): void {
      context.commit("UPDATE_CURRENT_USER", payload);
    },
    updateUserListObj(context, payload): void {
      context.commit("UPDATE_USER_LIST_OBJ", payload);
    },
    updateUserLOSecondary(context, payload): void {
      context.commit("UPDATE_USER_LO_SECONDARY", payload);
    },
    updatePosts(context, payload): void {
      context.commit('UPDATE_POSTS', payload);
    },
    updateUserPosts(context, payload): void {
      context.commit('UPDATE_USER_POSTS', payload);
    },
    updateComments(context, payload): void {
      context.commit('UPDATE_COMMENTS', payload);
    },
    updateUseNotifs(context, payload): void {
      context.commit("UPDATE_USER_NOTIFS", payload);
    },


    updateTeamSelectedUser(context, payload): void {
      context.commit("UPDATE_TEAM_SELECTED_USER", payload);
    },
    updateTeamSelectDialog(context, payload: boolean): void {
      context.commit('UPDATE_TEAM_SELECT_DIALOG', payload);
    },


    updateDrawer(context, payload): void {
      context.commit('UPDATE_DRAWER', payload);
    },


    updateTabAccess(context, payload: number): void {
      context.commit('UPDATE_TAB_ACCESS', payload);
    },
    updateTabProfile(context, payload: number): void {
      context.commit('UPDATE_TAB_PROFILE', payload);
    },


    // TODO: got to move those function in seperated file i think but  looks to good to store those function cause they are not stored in the vuex
    async getAllPosts(context): Promise<void | VueResponse> {
      const response: VueResponse | void = await httpRequest.get(Defines.SERVER_PUBLICATION_URL);
      context.commit('UPDATE_POSTS', (JSON.parse(response.bodyText)));
    },
    async getAllUserPosts(context, authorId: string): Promise<void | VueResponse> {
      const response: VueResponse | void = await httpRequest.get(Defines.SERVER_PUBLICATION_URL, {params: {authorId}});
      context.commit('UPDATE_USER_POSTS', (JSON.parse(response.bodyText)));
    },
    async getAllComments(context, postId: number): Promise<void | VueResponse> {
      const response: VueResponse = await httpRequest.get(Defines.SERVER_COMMENT_URL, { params: { postId } });
      context.commit('UPDATE_COMMENTS', (response.body));
      // context.commit('UPDATE_COMMENTS', (JSON.parse(response.bodyText)));
    },
    async getAllNotifs(context): Promise<void | VueResponse> {
      const response: VueResponse = await httpRequest.get(Defines.SERVER_USER_NOTIF_URL);
      context.commit('UPDATE_USER_NOTIFS', (response.body));
    },


    clearVuex(context) {
      context.commit('CLEAR_VUEX');
    },
    clearStorage(context) {
      context.commit("CLEAR_VUEX"),
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");
    },
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
});
