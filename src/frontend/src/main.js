import Vue from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store';
import '@/plugins/ui';
import '@/plugins/mixins';
import '@/common/directives/clickOutside';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = '/api/';

const init = async() => {
  const module = await import('@/router');
  const router = await module.default;
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
};

init();
