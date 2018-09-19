// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/packages/form-item/index.css';
import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/fr';

import App from './App';
import router from './router';


Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
