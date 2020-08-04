import Vue from 'vue'
import Axios from 'axios'
import router from './router.js'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$hostname = 'http://znarch:3000'

// Setting up default vue's http modules for api calls
Vue.prototype.$http = Axios
// Load the token from the localStorage
const token = localStorage.getItem('token')

// Is there is any token then we will simply append default axios authorization headers
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
