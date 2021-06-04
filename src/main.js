import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant' // 组件库
import 'vant/lib/index.css' // 引入

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible' // 样式

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
