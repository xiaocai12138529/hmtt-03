import request from '@/utils/request.js'
// eslint-disable-next-line camelcase
export const getArticles = (channel_id, timestamp) => {
  // 如果函数没有写return
  // 他有一个默认的return的值undefined
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id,
      timestamp
    }
  })
}
