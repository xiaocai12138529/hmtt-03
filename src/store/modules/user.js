// 这是vuex获取保存用户信息数据的modules模块
import { getPorfile, updateUserInfo } from '@/api/user.js'
export default {
  namespaced: true,
  state: {
    // 用户数据
    userInfo: {}
  },
  mutations: {
    // 保存用户数据
    setUserInfo (state, newUserInfo) {
      console.log(newUserInfo)
      state.userInfo = newUserInfo
    },
    setUserName (state, newName) {
      console.log(newName)
      state.userInfo.name = newName
    },
    setUserPhoto (state, newPhtot) {
      state.userInfo.photo = newPhtot
    },
    setUserGender (state, newGender) {
      state.userInfo.gender = Number(newGender)
    },
    setUserBirthday (state, newBirthday) {
      state.userInfo.birthday = newBirthday
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
    },
    async updataUserName (context, newName) {
      console.log(newName)
      try {
        // 发送获取token的ajax请求
        if (!newName) {
          return
        } else {
          if (newName.name) {
            await updateUserInfo(newName)
            context.commit('setUserName', newName.name)
          } else if (newName.gender) {
            console.log('gender')
            await updateUserInfo(newName)
            context.commit('setUserGender', newName.gender)
          } else if (newName.birthday) {
            console.log('gender')
            await updateUserInfo(newName)
            context.commit('setUserBirthday', newName.birthday)
          }
        }
      } catch (err) {
        console.log(err)
        throw new Error(err)
      }
    }
  }
}
