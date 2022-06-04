import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';
import { httpRequest } from './../utils/http';
import * as Defines from './../utils/defines';
import { VueResponse } from "../utils/types";
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

// FIXME:  try to fix bug on persistant vuex cause when server is off or empty data still remains and looks like working

export default new Vuex.Store({
  state: {
    currentUser: null,
    tabAccess: 0,
    tabProfile: 0,
    drawer: null,
    profileDialog: false,
    teamDialog: false,
    posts: [],
    userPosts: [],
    comments: [],
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
    UPDATE_TAB_ACCESS(state, payload: number): void {
      state.tabAccess = payload;
    },
    UPDATE_TAB_PROFILE(state, payload: number): void {
      state.tabProfile = payload;
    },
    UPDATE_DRAWER(state, payload): void {
      state.drawer = payload;
    },
    UPDATE_PROFILE_DIALOG(state, payload: boolean): void {
      state.profileDialog = payload;
    },
    UPDATE_TEAM_DIALOG(state, payload: boolean): void {
      state.teamDialog = payload;
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
    CLEAR_VUEX(state) {
      state.currentUser = null;
      state.tabAccess = 0;
      state.tabProfile = 0;
      state.drawer = null;
      state.profileDialog = false;
      state.teamDialog = false;
      state.posts = [];
      state.comments = [];
    }
  },
  actions: {
    updateCurrentUser(context, payload): void {
      context.commit("UPDATE_CURRENT_USER", payload);
    },
    updateTabAccess(context, payload: number): void {
      context.commit('UPDATE_TAB_ACCESS', payload);
    },
    updateTabProfile(context, payload: number): void {
      context.commit('UPDATE_TAB_PROFILE', payload);
    },
    updateDrawer(context, payload): void {
      context.commit('UPDATE_DRAWER', payload);
    },
    updateProfileDialog(context, payload: boolean): void {
      context.commit('UPDATE_PROFILE_DIALOG', payload);
      context.commit('UPDATE_TAB_PROFILE', 0);
    },
    updateTeamDialog(context, payload: boolean): void {
      context.commit('UPDATE_TEAM_DIALOG', payload);
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
      context.commit('UPDATE_COMMENTS', (JSON.parse(response.bodyText)));
    },
    clearVuex(context) {
      context.commit('CLEAR_VUEX');
    },
    clearStorage(context) {
      context.commit("CLEAR_VUEX"),
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]

});
