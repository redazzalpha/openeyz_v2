import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import vueResource from 'vue-resource';
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.use(CKEditor);

Vue.http.interceptors.push(function(request: Request) {
  (request as any).credentials = true;
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
});

new Vue({
  router,
  store,
  vuetify,
  http: {root: '/'},
  render: h => h(App)
}).$mount('#app');
