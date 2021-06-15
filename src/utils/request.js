import axios from 'axios'
import router from '../router'
import store from '../store'

// 创建axios的实例.配置
// 1, 基地址
const request = axios.create({
  // baseURL: 'http://toutiao-app.itheima.net' // 线上
  // 本地
  baseURL: 'http://localhost:8000'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在普通的js文件中获取vuex的数据
  // console.log(store)
  const token = store.state.tokenInfor.token
  config.headers.Authorization = `Bearer ${token}`
  console.log('config', config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截器
/**
 *
 */
request.interceptors.response.use(function (config) {
  console.log('相应拦截器', config)
  return config
}, async function (error) {
  console.log('相应拦截器-错误')
  // 对请求错误做些什么
  console.dir(error)
  const refreshToken = store.state.tokenInfor.refresh_token
  if (error.response.status === 401) {
    console.log('401 处理')
    if (refreshToken) {
      try {
        const res = await axios({ url: 'http://localhost:8000/v1_0/authorizations', method: 'PUT', headers: { Authorization: `Bearer ${refreshToken}` } })
        console.log(res)
        // eslint-disable-next-line no-undef
        // 保存到token
        console.log(res.data)
        store.commit('setToken', { refresh_token: refreshToken, token: res.data.data.token })
        // 重发请求
        // console.log(error.config)
        return request(error.config)
      } catch (err) {
        // 去登录页
        console.log('进入')
        store.commit('setToken', {})
        // 从哪里来 回哪里去
        console.log(router)
        router.push('/login?backto=' + encodeURIComponent(router.currentRoute.fullPath))
        return Promise.reject(error)
      }
    } else {
      // 去登录页
      console.log('进入')
      store.commit('setToken', {})
      // 从哪里来 回哪里去
      console.log(router)
      router.push('/login?backto=' + encodeURIComponent(router.currentRoute.fullPath))
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
})

export const request2 = axios.create({
  baseURL: 'http://toutiao-app.itheima2.net2'
})

// 导出
export default request
