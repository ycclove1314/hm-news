import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Myheader from './components/hmheader.vue'
import Mylogin from './components/hmlogin.vue'
import MyUser from './components/hmUser.vue'
import Hmpost from './components/hmpost.vue'
import axios from 'axios'
import moment from 'moment'
import './less/iconfont.less'
import './less/base.less'
/* 导入amfe-flexible 适配rem插件 */
import 'amfe-flexible'
/* 自动按需导入导入Button按钮插件 */
import {
  Button,
  Field,
  Form,
  Toast,
  Dialog,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh
} from 'vant'

Vue.config.productionTip = false
/* 使用Button插件 */
Vue.use(Button)
/* 使用Field插件 */
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
/* 把axios 挂载到Vue的原型上 */
Vue.prototype.axios = axios
/* 设置默认的基地址 */
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  /* 在发送请求之前 给每次请求设置token config是所有请求之前的信息 */
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function(res) {
  // 如果响应回来的数据状态码是401 且message是状态信息是"用户信息验证失败"就证明没有设置token和是假的token就返回登录页
  if (res.data.statusCode === 401 && res.data.message === '用户信息验证失败') {
    router.push('/login')
    /* 提示用户信息验证失败 */
    Toast.fail(res.data.message)
    /* 删除本地的过期或虚假token */
    localStorage.removeItem('token')
    /* 删除本地的id */
    localStorage.removeItem('userId')
  }
  return res
})

Vue.prototype.url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
/* 公共头部组件 */
Vue.component('my-header', Myheader)
Vue.component('my-login', Mylogin)
Vue.component('my-user', MyUser)
Vue.component('hm-post', Hmpost)
/* 使用过滤器 */
Vue.filter('filter', function(input) {
  return moment(input).format('YYYY-MM-DD')
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
