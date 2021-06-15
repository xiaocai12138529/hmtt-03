import request from '@/utils/request.js'
export const login = (user) => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    // 如果参数通过请求体发送(post) 就用data
    // 如果参数通过请求行发送(get)  就params
    // data | params // 参数
    data: {
      ...user
    }
  })
}

// 获取用户信息
export const getPorfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
// 获取用户粉丝 关注
export const getFollowings = () => {
  return request({
    url: '/v1_0/user/followings',
    method: 'GET'
  })
}
// 获取用户粉丝 关注
export const getUser = () => {
  return request({
    url: '/v1_0/user/',
    method: 'GET'
  })
}
/**
 * 编辑用户信息
 * data: {
 *  name,
 *  gender,
 *  birthday
 * }
 */
export const updateUserInfo = (data) => {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/profile',
    data
  })
}

export const setPhoto = (files) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: files
  })
}
