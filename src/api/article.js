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
export const reports = (target, type) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target,
      type
    }
  })
}

// 获取文章详情
export const getArticlesDetails = (article) => {
  return request({
    url: 'v1_0/articles/' + article

  })
}

// 关注
export const setConcern = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
export const unConcern = (target) => {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'

  })
}

// 获取评论

export const getComment = (source, offset) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source,
      offset
    }
  })
}
