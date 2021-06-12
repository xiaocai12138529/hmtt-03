import request from '@/utils/request.js'

export const getSuggestion = (keyword) => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}
