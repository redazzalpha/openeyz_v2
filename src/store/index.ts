import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';
import { httpRequest } from './../utils/http';
import * as Defines from './../utils/defines';
import { VueResponse, Users } from "../utils/types";
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: Users,
    tab: 0,
    drawer: false,
    posts: [],
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
    UPDATE_POSTS(state, payload): void {
      state.posts = payload;
    },
    UPDATE_COMMENTS(state, payload): void {
      state.comments = payload;
    },
    UPDATE_TAB(state, payload): void {
      state.tab = payload;
    },
    UPDATE_DRAWER(state, payload): void {
      state.drawer = payload;
    },
  },
  actions: {
    updateCurrentUser(context, payload): void {
      context.commit("UPDATE_CURRENT_USER", payload);
    },
    updatePosts(context, payload): void {
      context.commit('UPDATE_POSTS', payload);
    },
    updateComments(context, payload): void {
      context.commit('UPDATE_COMMENTS', payload);
    },
    updateTab(context, payload): void {
      context.commit('UPDATE_TAB', payload);
    },
    updateDrawer(context, payload): void {
      context.commit('UPDATE_DRAWER', payload);
    },

    async getAllPosts(context): Promise<void | VueResponse> {
      const response: VueResponse | void = await httpRequest.get(Defines.SERVER_PUBLICATION_URL);
      context.commit('UPDATE_POSTS', (JSON.parse(response.bodyText)));
    },
    async getAllComments(context, payload): Promise<void | VueResponse> {
      const response: VueResponse = await httpRequest.get(Defines.SERVER_COMMENT_URL, { params: { payload } });
      context.commit('UPDATE_COMMENTS', (JSON.parse(response.bodyText)));
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]

});
