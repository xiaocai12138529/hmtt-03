import axios from 'axios'

// 创建axios的实例.配置
// 1, 基地址
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'
})

export const request2 = axios.create({
  baseURL: 'http://toutiao-app.itheima2.net2'
})

// 导出
export default request
