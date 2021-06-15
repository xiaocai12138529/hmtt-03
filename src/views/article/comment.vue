<template>
  <div class="article-comments" id="top">
    <!-- 评论列表 -->
    <div id="chatContainer"></div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | relativeTime
            }}</span>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="item.is_liking ? 'like' : 'like-o'"
          @click="hToggleLike(item)"
        />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
    <!-- 发布评论 -->

    <div :class="commentShow ? 'art-cmt-container-1' : 'art-cmt-container-2'">
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-show="commentShow">
        <van-icon name="arrow-left" size="24px" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="hShowCommentArea">发表评论</div>
        <div class="icon-box">
          <van-badge :content="total_count" max="99">
            <van-icon name="comment-o" size="24px" />
          </van-badge>
          <van-icon name="star-o" size="24px" />
          <van-icon name="share-o" size="24px" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-show="!commentShow">
        <textarea
          placeholder="友善评论、理性发言、阳光心灵"
          v-model.trim="commentText"
          ref="txt"
          @blur="hBlur"
        ></textarea>
        <van-button type="default" @click="hAddComment"> 发布</van-button>
      </div>
    </div>
    <!-- /发布评论 -->
    <!-- 文件上传 -->
  </div>
</template>

<script>
import { getComment } from '@/api/article.js'
import { addComment, addCommentLike, deleteCommentLike } from '@/api/comment.js'
export default {
  name: 'ArticleComment',
  data () {
    return {
      commentText: '',
      commentShow: true,
      offset: null,
      total_count: 0,
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    // 用户喜欢/取消喜欢评论
    async hToggleLike (item) {
      try {
        const isLike = item.is_liking
        const commentId = item.com_id
        if (!isLike) {
          addCommentLike(commentId)
          this.$toast.success('点赞成功')
        } else {
          deleteCommentLike(commentId)
          this.$toast.success('取消点赞成功')
        }
        item.is_liking = !isLike
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 点击发布
    async hAddComment () {
      try {
        const res = await addComment(this.$route.params.id, this.commentText)
        const obj = res.data.data.new_obj
        // eslint-disable-next-line no-undef
        obj.is_liking = false
        this.list.unshift(obj)
        // this.$el.querySelector('#chatContainer').scrollIntoView({
        //   behavior: 'smooth', // 平滑过渡
        //   block: 'start' // 上边框与视窗顶部平齐。默认值
        // })
        const hit = this.$el.offsetTop
        this.$el.querySelector('#chatContainer').parentNode.parentNode.scroll({
          top: hit - 100,
          left: 0,
          behavior: 'smooth'
        })
        this.total_count = this.total_count + 1
        this.commentText = ''
      } catch (err) {
        console.log(err)
      }
    },
    // 评论框失去焦点事件
    hBlur () {
      setTimeout(() => {
        this.commentShow = true
      })
    },
    // 评论状态切换
    hShowCommentArea () {
      this.commentShow = false // 通知视图 等会儿 去更新
      this.$nextTick(() => {
        this.$refs.txt.focus()
      })
    },
    async onLoad () {
      const res = await getComment(this.$route.params.id, this.offset)
      this.total_count = res.data.data.total_count
      const arr = res.data.data.results
      this.list.push(...arr)
      console.log(res)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成

      if (arr.length < 10) {
        this.finished = true
        return
      }
      if (this.offset !== res.data.data.last_id) {
        this.offset = res.data.data.last_id
      }
      // 5. 更新offset
    }
  }
}
</script>

<style scoped lang='less'>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}

/*美化 - 文章详情 - 底部的发布评论-样式 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
