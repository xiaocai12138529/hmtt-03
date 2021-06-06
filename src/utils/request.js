import axios from 'axios'
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

export const request2 = axios.create({
  baseURL: 'http://toutiao-app.itheima2.net2'
})

// 导出
export default request
