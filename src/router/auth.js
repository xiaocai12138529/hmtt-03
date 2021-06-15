
import vuex from '@/store/index.js'
import router from './index'
// 全局路由守卫
const vipList = ['/setting', '/abc']
router.beforeEach((to, from, next) => {
  console.log('路由变化了,全局路由守卫,beforeEach')
  console.log(to)
  if (vipList.includes(to.path)) {
    if (vuex.state.tokenInfor.token) {
      // 登录了 放行
      next()
    } else {
      // 没有登录  先登录
      next('/login?backto=' + encodeURIComponent(to.fullPath))
    }
  } else if (to.path === '/login') {
    if (vuex.state.tokenInfor.token) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
  // 除了指定接口都放行
})

export default router
