import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
        const res = await login(userInfo)
        console.log(res)
        context.commit('setToken', res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
