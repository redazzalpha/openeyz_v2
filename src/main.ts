import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import vueResource from 'vue-resource';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import { VueRequest, VueResponse } from './utils/types';
import { unavailableServerHandler, defaulHandler, internalServerErrorHandler } from './utils/functions';

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.use(CKEditor);

Vue.http.interceptors.push(function (request: VueRequest) {
  request.credentials = true;
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));

  return (response: VueResponse) => {

    const { status } = response;
    switch (status) {
      case 0:
        unavailableServerHandler(response);
        break;
      case 500:
        internalServerErrorHandler(response);
        break;
      default:
        defaulHandler(response);
    }
  };
});

new Vue({
  router,
  store,
  vuetify,
  http: { root: '/' },
  render: h => h(App)
}).$mount('#app');
