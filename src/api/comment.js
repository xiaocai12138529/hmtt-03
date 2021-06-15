import request from '@/utils/request.js'

export const addComment = (articleId, content) => {
  return request({
    method: 'POST',
    url: 'v1_0/comments',
    data: {
      target: articleId,
      art_id: articleId,
      content
    }
  })
}

/**
 * 对文章评论进行点赞
 * @param {*} commentId 评论id
 */
export const addCommentLike = commentId => {
  return request({
    method: 'POST',
    url: 'v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

/**
 * 取消文章评论的点赞
 * @param {*} commentId 评论id
 */
export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: 'v1_0/comment/likings/' + commentId
  })
}
