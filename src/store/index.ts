import { Post, Item } from '../utils/types';
import { UserObj, Notif } from './../utils/types';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';


const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /** 
     * represents user list object
     * on team page 
     * @member {Object} 
     */
    userListObj: [] as UserObj[],
    /** 
     * represents user list cards
     * on team page 
     * @member {Object} 
     */
    userCardList: [] as UserObj[],
    /** 
     * represents publications list
     * @member {Object} 
     */
    posts: [] as Post[],
    /** 
     * represents comments list
     * @member {Object} 
     */
    comments: [] as Comment[],
    /** 
     * represents user notifications list
     * @member {Object} 
     */
    userNotifs: [] as Notif[],
    /** 
     * represents open notifications panel list
     * @member {Object} 
     */
    notifPanel: [] as number[],
    /** 
     * represents loader page visibility
     * @member {boolean} 
     */
    loader: true,
    /** 
     * represents current user instance
     * @member {Object} 
     */
    currentUser: null,
    /** 
     * represents current item
     * on team page 
     * @member {Object} 
     */
    currentItem: new Item,
    /** 
     * represents selected user on team page
     * on team page 
     * @member {Object} 
     */
    teamSelectedUser: null,
    /** 
     * represents team selected dialog modal visbility
     * on team page 
     * @member {boolean} 
     */
    teamSelectedDialog: false,
    /** 
     * represents comment dialog modal visbility
     * on team page 
     * @member {boolean} 
     */
    commentDialog: false,
    /** 
     * drawer menu visbility
     * on team page 
     * @member {Object} 
     */
    drawer: null,
    /** 
     * represents selected tab on access page
     * @member {number} 
     */
    tabAccess: 0,
    /** 
     * represents selected tab on profil page
     * @member {number} 
     */
    tabProfile: 0,

    /** 
     * represents alert visibility
     * @member {boolean} 
     */
    alert: false,
    /** 
     * represents persistent alert visibility
     * @member {boolean} 
     */
    alertPersist: false,
    /** 
     * represents default alert type
     * @member {string} 
     */
    alertType: "error",
    /** 
     * represents default alert message
     * @member {string} 
     */
    alertMessage: "error",
  },
  getters: {
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
    UPDATE_NOTIF_PANEL(state, payload): void {
      state.notifPanel = payload;
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

    UPDATE_ALERT(state, payload: boolean): void {
      state.alert = payload;
    },
    UPDATE_ALERT_PERSIST(state, payload: boolean): void {
      state.alertPersist = payload;
    },
    UPDATE_ALERT_TYPE(state, payload: string): void {
      state.alertType = payload;
    },
    UPDATE_ALERT_MESSAGE(state, payload: string): void {
      state.alertMessage = payload;
    },


    CLEAR_VUEX(state) {
      state.userListObj = [] as UserObj[];
      state.userCardList = [] as UserObj[];
      state.posts = [] as Post[];
      state.comments = [] as Comment[];
      state.userNotifs = [] as Notif[];
      state.notifPanel = [] as number[];
      state.loader = true;
      state.currentUser = null;
      state.currentItem = new Item;

      state.teamSelectedUser = null;
      state.teamSelectedDialog = false;
      state.commentDialog = false;
      state.drawer = null;
      state.tabAccess = 0;
      state.tabProfile = 0;

      state.alert = false;
      state.alertPersist = false;
      state.alertMessage = "error";
      state.alertType = "error";
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
    updateNotifPanel(context, payload): void {
      context.commit("UPDATE_NOTIF_PANEL", payload);
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

    updateAlert(context, payload: boolean): void {
      context.commit("UPDATE_ALERT", payload);
    },
    updateAlertPersist(context, payload: boolean): void {
      context.commit("UPDATE_ALERT_PERSIST", payload);
    },
    updateAlertType(context, payload: string): void {
      context.commit("UPDATE_ALERT_TYPE", payload);
    },
    updateAlertMessage(context, payload: string): void {
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
