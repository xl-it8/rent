import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant'
import 'amfe-flexible'
import '@/styles/index.less'
import '@/styles/iconfont/iconfont.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
