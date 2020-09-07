import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './environments/environment'

import interceptor from './helpers/error.interceptor'
import VueToastify from "vue-toastify";

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);

interceptor()
Vue.use(VueToastify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
