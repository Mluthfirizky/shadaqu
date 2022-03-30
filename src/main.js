import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueGeolocation from 'vue-browser-geolocation'

Vue.config.productionTip = false
Vue.use(vueGeolocation)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
