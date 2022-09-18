import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Access from '../views/Access.vue';
import Notfound from '../views/Notfound.vue';
import Profile from '../views/Profile.vue';
import Team from '../views/Team.vue';
import Notification from '../views/Notification.vue';
import { HOME_PAGE_URL, ACCESS_PAGE_URL, PROFILE_PAGE_URL, TEAM_PAGE_URL, NOTIFICATION_PAGE_URL, NOTFOUND_PAGE_URL } from '../utils/defines';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: 'home',
    path: HOME_PAGE_URL,
    component: Home,
  },
  {
    name: 'access',
    path: ACCESS_PAGE_URL,
    component: Access,
  },
  {
    name: 'profile',
    path: PROFILE_PAGE_URL,
    component: Profile,
  },
  {
    name: 'team',
    path: TEAM_PAGE_URL,
    component: Team,
  },
  {
    name: 'teamId',
    path: TEAM_PAGE_URL + "/:username",
    component: Team,
  },
  {
    name: 'notification',
    path: NOTIFICATION_PAGE_URL,
    component: Notification,
  },
  {
    name: 'notfound',
    path: NOTFOUND_PAGE_URL,
    component: Notfound,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router;
