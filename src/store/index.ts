import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';
import { httpRequest } from './../utils/http';
import * as Defines  from './../utils/defines';

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
    getAllPosts(context): void {
      httpRequest.get(Defines.SERVER_PUBLICATION_URL)
      .then(
          (response: JSON): void => {
            context.commit('UPDATE_POSTS', ((response as unknown) as Response).body);
          },
          error => {
              console.log(error.message)
          }
      );

    }
  },
  modules: {
  }
});
