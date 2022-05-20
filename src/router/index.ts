import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Access from '../views/Access.vue';

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

];

const router = new VueRouter({
  routes,
  mode: 'hash',
})

export default router;
