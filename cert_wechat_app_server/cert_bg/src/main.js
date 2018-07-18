// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import web3 from 'web3'
// import axios from 'axios'

Vue.config.productionTip = false;

Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;
// Vue.http = Vue.prototype.$http = axios;
// Vue.use(web3);




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  http: { headers: {'Content-Type': 'application/x-www-form-urlencoded'} },
  template: '<App/>'
  
});
