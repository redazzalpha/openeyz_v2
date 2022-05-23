import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';
import { httpRequest } from './../utils/http';
import * as Defines  from './../utils/defines';
import { Error } from "@/utils/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tab:  0,
    drawer: false,
    posts: [],
  },
  getters: {
    btnSize(): string {
      return Vuetify.framework.breakpoint.name == 'xs' ? '100%' : '50%';
    },

  },
  mutations: {
    UPDATE_POSTS(state, payload): void {
      state.posts = payload;
    },
    UPDATE_TAB(state, payload): void {
      state.tab = payload;
    },
    UPDATE_DRAWER(state, payload): void {
      state.drawer = payload;
    },
  },
  actions: {
    updatePosts(context, payload): void {
      context.commit('UPDATE_POSTS', payload);
    },
    updateTab(context, payload): void {
      context.commit('UPDATE_TAB', payload);
    },
    updateDrawer(context, payload): void {
      context.commit('UPDATE_DRAWER', payload);
    },
    async getAllPosts(context): Promise<void | JSON> {
      const response: JSON | void = await httpRequest.get(Defines.SERVER_PUBLICATION_URL)
        .catch((error: Error) => console.log(error.bodyText));
      context.commit('UPDATE_POSTS', ((response as unknown)as Response).body);
    }
  },
  modules: {
  }
});
