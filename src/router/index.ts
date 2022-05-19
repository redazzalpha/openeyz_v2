import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import home from '../views/home.vue';
import access from '../views/access.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: 'home',
    path: "/",
    component: home,
  },
  {
    name: 'access',
    path: "/access",
    component: access,
  },

];

const router = new VueRouter({
  routes,
  mode: 'hash',
})

export default router;
