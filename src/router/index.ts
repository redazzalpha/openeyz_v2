import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Access from '../views/Access.vue';
import Notfound from '../views/Notfound.vue';
import Profile from '../views/Profile.vue';
import Team from '../views/Team.vue';
import Notification from '../views/Notification.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: 'home',
    path: "/",
    component: Home,
  },
  {
    name: 'access',
    path: "/access",
    component: Access,
  },
  {
    name: 'profile',
    path: "/profile",
    component: Profile,
  },
  {
    name: 'team',
    path: "/team",
    component: Team,
  },
  {
    name: 'notification',
    path: "/notification",
    component: Notification,
  },
  {
    name: 'notfound',
    path: "/*",
    component: Notfound,
  },
];

const router = new VueRouter({
  routes,
  // TODO: try to fix probleme that cant navigate when deployed  on mode: 'history'
  mode: 'hash',
})

export default router;
