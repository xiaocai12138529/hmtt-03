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

/**
 *
 * @param {对文章不喜欢} target 文章id
 * @returns
 */
export const disLike = target => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target
    }
  })
}
