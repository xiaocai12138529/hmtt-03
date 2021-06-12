import request from '@/utils/request.js'
export const getUseChannels = () => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: 'v1_0/user/channels'
  })
}
export const addChannel = (channels) => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: 'v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels
    }
  })
}
export const delChannel = (target) => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'

  })
}
export const getChannels = () => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: 'v1_0/channels'
  })
}
