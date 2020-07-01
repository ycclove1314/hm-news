import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import User from '../views/regiset.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/user', name: 'user', component: User }
  ]
})

export default router
