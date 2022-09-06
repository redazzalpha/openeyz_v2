import { Post, Item } from '../utils/types';
import { UserObj, Notif } from './../utils/types';
import Vuetify from "@/plugins/vuetify";
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';


const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    userListObj: [] as UserObj[],
    userCardList: [] as UserObj[],
    posts: [] as Post[],
    comments: [] as Comment[],
    userNotifs: [] as Notif[],

    loader: true,
    currentUser: null,
    currentItem: new Item,
    teamSelectedUser: null,
    teamSelectedDialog: false,
    commentDialog: false,
    drawer: null,
    tabAccess: 0,
    tabProfile: 0,

    alertShow: false,
    alertType: "",
    alertMessage: "",

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
    UPDATE_CURRENT_ITEM(state, payload): void {
      state.currentItem = payload;
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
    UPDATE_COMMENTS(state, payload): void {
      state.comments = payload;
    },
    UPDATE_USER_NOTIFS(state, payload): void {
      state.userNotifs = payload;
    },

    ADD_POSTS(state, payload): void {
      state.posts.push(payload);
    },
    ADD_COMMENTS(state, payload): void {
      state.comments.push(payload);
    },

    UPDATE_LOADER(state, payload) {
      state.loader = payload;
    },

    UPDATE_TEAM_SELECTED_USER(state, payload): void {
      state.teamSelectedUser = payload;
    },
    UPDATE_TEAM_SELECTED_DIALOG(state, payload: boolean): void {
      state.teamSelectedDialog = payload;
    },
    UPDATE_COMMENT_DIALOG(state, payload: boolean): void {
      state.commentDialog = payload;
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

    UPDATE_ALERT_SHOW(state, payload: boolean): void {
      state.alertShow = payload;
    },
    UPDATE_ALERT_TYPE(state, payload: string): void {
      state.alertType = payload;
    },
    UPDATE_ALERT_MESSAGE(state, payload: string): void {
      state.alertMessage= payload;
    },

    CLEAR_VUEX(state) {
      state.userListObj = [] as UserObj[];
      state.userCardList = [] as UserObj[];
      state.posts = [] as Post[];
      state.comments = [] as Comment[];
      state.userNotifs = [] as Notif[];
      state.loader = true;
      state.currentUser = null;
      state.currentItem = new Item;

      state.teamSelectedUser = null;
      state.teamSelectedDialog = false;
      state.commentDialog = false;
      state.drawer = null;
      state.tabAccess = 0;
      state.tabProfile = 0;

      state.alertShow = false;
      state.alertType =  "";
      state.alertMessage = "";
  
    }
  },
  actions: {
    updateCurrentUser(context, payload): void {
      context.commit("UPDATE_CURRENT_USER", payload);
    },
    updateCurrentItem(context, payload): void {
      context.commit("UPDATE_CURRENT_ITEM", payload);
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
    updateComments(context, payload): void {
      context.commit('UPDATE_COMMENTS', payload);
    },
    updateUserNotifs(context, payload): void {
      context.commit("UPDATE_USER_NOTIFS", payload);
    },

    addPosts(context, payload) {
      context.commit('ADD_POSTS', payload);
    },
    addComments(context, payload) {
      context.commit('ADD_COMMENTS', payload);
    },

    updateLoader(context, payload) {
      context.commit("UPDATE_LOADER", payload);
    },

    updateTeamSelectedUser(context, payload): void {
      context.commit("UPDATE_TEAM_SELECTED_USER", payload);
    },
    updateTeamSelectedDialog(context, payload: boolean): void {
      context.commit('UPDATE_TEAM_SELECTED_DIALOG', payload);
    },
    updateCommentDialog(context, payload: boolean): void {
      context.commit('UPDATE_COMMENT_DIALOG', payload);
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

    updateAlertShow(context, payload: boolean) : void {
      context.commit("UPDATE_ALERT_SHOW", payload);
    },
    updateAlertType(context, payload: string) : void {
      context.commit("UPDATE_ALERT_TYPE", payload);
    },
    updateAlertMessage(context, payload: string) : void {
      context.commit("UPDATE_ALERT_MESSAGE", payload);
    },

    clearVuex(context) {
      context.commit("CLEAR_VUEX");
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
});
