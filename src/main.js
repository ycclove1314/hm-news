import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Myheader from './components/hmheader.vue'
import Mylogin from './components/hmlogin.vue'
import './less/iconfont.less'
import './less/base.less'
/* 导入amfe-flexible 适配rem插件 */
import 'amfe-flexible'
/* 自动按需导入导入Button按钮插件 */
import { Button, Field, Form, Toast } from 'vant'
Vue.config.productionTip = false
/* 使用Button插件 */
Vue.use(Button)
/* 使用Field插件 */
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)
/* 公共头部组件 */
Vue.component('my-header', Myheader)
Vue.component('my-login', Mylogin)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
