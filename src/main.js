import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import service from './utils/service';
import Qs from 'qs'
import Cookies from 'js.cookie'
import moment from "moment";
import eCharts from 'echarts'
Vue.config.productionTip = false;
Vue.prototype.$axios = service.request;
Vue.prototype.$baseUrl = service.baseUrl;
Vue.prototype.$Qs = Qs;
Vue.prototype.$eCharts = eCharts;
Vue.prototype.$Cookies = Cookies;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


