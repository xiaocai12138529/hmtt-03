import request from '@/utils/request.js'
export const getUseChannels = () => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: 'v1_0/user/channels'
  })
}
export const getChannels = () => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: 'v1_0/channels'
  })
}
