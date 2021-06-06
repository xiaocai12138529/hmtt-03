import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api/user.js'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token数据
    tokenInfor: {}
  },
  mutations: {
    setToken (state, newToken) {
      state.tokenInfor = newToken
    }
  },
  actions: {
    async userLogin (context, userInfo) {
      try {
        // 发送获取token的ajax请求
        const res = await login(userInfo)
        // 保存token
        context.commit('setToken', res.data.data)
      } catch (err) {
        console.log(err)
        throw new Error(err)
      }
    }
  },
  modules: {
    user
  }
})
