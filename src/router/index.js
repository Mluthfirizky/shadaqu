import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Weather from '../views/Weather.vue'
import Alquran from '../views/Alquran.vue'
import Dzikir from '../views/Dzikir.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/alquran',
    name: 'Alquran',
    component: Alquran
  },
  {
    path: '/dzikir',
    name: 'Dzikir',
    component: Dzikir
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
