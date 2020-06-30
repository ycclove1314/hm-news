import Vue from 'vue'
import App from './App.vue'
/* 导入amfe-flexible 适配rem插件 */
import 'amfe-flexible'
/* 自动按需导入导入Button按钮插件 */
import { Button, Field, Pagination, Swipe, SwipeItem } from 'vant'
Vue.config.productionTip = false
/* 使用Button插件 */
Vue.use(Button)
/* 使用Field插件 */
Vue.use(Field)
Vue.use(Pagination)
Vue.use(Swipe)
Vue.use(SwipeItem)
new Vue({
  render: h => h(App)
}).$mount('#app')
