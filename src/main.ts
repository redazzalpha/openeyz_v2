import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import vueResource from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(vueResource);

new Vue({
  router,
  store,
  vuetify,
  http: {root: '/'},
  render: h => h(App)
}).$mount('#app');
