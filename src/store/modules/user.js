// 这是vuex获取保存用户信息数据的modules模块
import { getPorfile } from '@/api/user.js'
export default {
  namespaced: true,
  state: {
    // 用户数据
    userInfo: {}
  },
  mutations: {
    // 保存用户数据
    setUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    async getProfile (context) {
      try {
        // 发送获取用户信息ajax请求
        const res = await getPorfile()
        // 调用保存信息
        context.commit('setUserInfo', res.data.data)
      } catch (err) {
        console.log('获取用户信息失败', err)
        throw new Error(err)
      }
    }
  }
}
