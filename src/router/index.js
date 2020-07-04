import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
/* 这导入的是注册页面 */
import User from '../views/regiset.vue'
/* 这导入的是个人中心页 */
import Regiset from '../views/user.vue'
import Emit from '../views/edit.vue'
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/user', name: 'user', component: User },
    { path: '/regiset', name: 'regiset', component: Regiset },
    { path: '/emit', name: 'emit', component: Emit }
  ]
})

// 设置全局前置守卫 路由发生变化就会执行
router.beforeEach((to, from, next) => {
  /* 获取token */
  const token = localStorage.getItem('token')
  /* 如果路由是前往个人中心页面 就要判断是否携带token 如果携带了token就放行 没有携带返回登录页 如果去其他页面也放行 */
  if (to.path === '/regiset' || to.path === '/emit') {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
