import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import home from '../views/home.vue';
import login from '../views/login.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: 'home',
    path: "/",
    component: home,
  },
  {
    name: 'login',
    path: "/login",
    component: login,
  },

];

const router = new VueRouter({
  routes,
  mode: 'hash',
})

export default router;
