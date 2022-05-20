import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tab: 0,
    drawer: false
  },
  getters: {
  },
  mutations: {
    UPDATE_TAB(state, payload) {
      state.tab = payload;
    },
    UPDATE_DRAWER(state, payload) {
      state.drawer = payload;
    }
  },
  actions: {
    updateTab(context, payload) {
      context.commit('UPDATE_TAB', payload);
    },
    updateDrawer(context, payload) {
      context.commit('UPDATE_DRAWER', payload);
    }
  },
  modules: {
  }
});
