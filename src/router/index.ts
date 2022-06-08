import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Access from '../views/Access.vue';
import Notfound from '../views/Notfound.vue';
import Profile from '../views/Profile.vue';
import Team from '../views/Team.vue';
import Notification from '../views/Notification.vue';
import * as Defines from '../utils/defines';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: 'home',
    path: Defines.HOME_PAGE_URL,
    component: Home,
  },
  {
    name: 'access',
    path: Defines.ACCESS_PAGE_URL,
    component: Access,
  },
  {
    name: 'profile',
    path: Defines.PROFILE_PAGE_URL,
    component: Profile,
  },
  {
    name: 'team',
    path: Defines.TEAM_PAGE_URL,
    component: Team,
  },
  {
    name: 'notification',
    path: Defines.NOTIFICATION_PAGE_URL,
    component: Notification,
  },
  {
    name: 'notfound',
    path: Defines.NOTFOUND_PAGE_URL,
    component: Notfound,
  },
];

const router = new VueRouter({
  routes,
  // TODO: try to fix probleme that cant navigate when deployed  on mode: 'history'
  mode: 'hash',
})

export default router;
