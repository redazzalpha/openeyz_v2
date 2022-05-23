import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Access from '../views/Access.vue';
import Notfound from '../views/Notfound.vue';

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
    name: 'notfound',
    path: "/*",
    component: Notfound,
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
})

export default router;
