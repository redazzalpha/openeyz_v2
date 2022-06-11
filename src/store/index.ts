import { Post } from '../utils/types';
import { UserObj, Notif } from './../utils/types';
import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';


const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

// FIXME:  try to fix bug on persistant vuex cause when server is off or empty data still remains and looks like working

export default new Vuex.Store({
  state: {
    userListObj : [] as UserObj[],
    userCardList : [] as UserObj[],
    posts: [] as Post[],
    userPosts: [] as Post[],
    comments: [] as Comment[],
    userNotifs: [] as Notif[],

    currentUser: null,

    teamSelectedUser: null,
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
      state.userCardList = payload;
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
      state.currentUser = null;
      state.userListObj = [] as UserObj[];
      state.userCardList = [] as UserObj[];
      state.posts = [] as Post[];
      state.userPosts = [] as Post[];
      state.comments = [] as Comment [];
      state.userNotifs = [] as Notif[],



      state.teamSelectedUser = null,
      state.teamSelectDialog = false;

      state.drawer = null;
  
      state.tabAccess = 0;
      state.tabProfile = 0;
  
    }
  },
  actions: {
    updateCurrentUser(context, payload): void {
      context.commit("UPDATE_CURRENT_USER", payload);
    },
    updateUserListObj(context, payload): void {
      context.commit("UPDATE_USER_LIST_OBJ", payload);
    },
    updateUserCardList(context, payload): void {
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
    updateUserNotifs(context, payload): void {
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

    clearVuex(context) {
      context.commit("CLEAR_VUEX");
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
});
