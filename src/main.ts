import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import vueResource from 'vue-resource';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import { Body, VueRequest, VueResponse } from './utils/types';
import {clearStorage} from './utils/functions';
import * as Defines from './utils/defines';

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.use(CKEditor);

Vue.http.interceptors.push(function (request: VueRequest) {
  request.credentials = true;
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));

  return (response: VueResponse) => {
    const { status, body } = response;
    // TODO: look for solution to delet vuex correctly
    if (status === 0) {
      clearStorage();
      router.push(Defines.ACCESS_PAGE_URL);
    }
    // if (status === 401) {
    //   store.dispatch('clearVuex');
    //   router.push(Defines.ACCESS_PAGE_URL);
    // }
    if (status === 500) {
      clearStorage();
      router.push(Defines.ACCESS_PAGE_URL);
    }

    if (body) {
      const { token, user } = body as Body;
      if (token)
        localStorage.setItem("token", token);
      if (user)
        store.dispatch('updateCurrentUser', user);
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
