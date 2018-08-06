import Vue from 'vue'
import Router from 'vue-router'
// import Resource from 'vue-resource'
import axios from 'axios'

import CertList from '@/components/CertList'
import CertBytes from '@/components/CertBytes'
import CertBytes_v2_bindCert from '@/components/CertBytes_v2_bindCert'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
// Vue.use(Resource)

// Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;

export default new Router({
  routes: [
    {
      path: '/certBytes_v2_bindCert',
      name: 'CertBytes_v2_bindCert',
      component: CertBytes_v2_bindCert
    },
    {
      path: '/certBytes',
      name: 'CertBytes',
      component: CertBytes
    },
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
