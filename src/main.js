import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$hostname = 'http://znarch:3000'

/* Router */
const routes = [
  { path: '/', component: App }
]

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
