import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tab: 0,
  },
  getters: {
  },
  mutations: {
    UPDATE_TAB(state, payload) {
      state.tab = payload;
    }
  },
  actions: {
    updateTab(context, payload) {
      context.commit('UPDATE_TAB', payload);
    }
  },
  modules: {
  }
});
