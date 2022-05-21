import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tab:  0,
    drawer: false
  },
  getters: {
    btnSize(): string {
      return Vuetify.framework.breakpoint.name == 'xs' ? '100%' : '50%';
    }
  },
  mutations: {
    UPDATE_TAB(state, payload): void {
      state.tab = payload;
    },
    UPDATE_DRAWER(state, payload): void {
      state.drawer = payload;
    }
  },
  actions: {
    updateTab(context, payload): void {
      context.commit('UPDATE_TAB', payload);
    },
    updateDrawer(context, payload): void {
      context.commit('UPDATE_DRAWER', payload);
    },
    
  },
  modules: {
  }
});
