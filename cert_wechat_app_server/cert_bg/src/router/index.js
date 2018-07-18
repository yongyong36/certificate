import Vue from 'vue'
import Router from 'vue-router'
// import Resource from 'vue-resource'
import axios from 'axios'
import CertList from '@/components/CertList'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
// Vue.use(Resource)

// Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CertList',
      component: CertList
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
