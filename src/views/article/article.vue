<template>
  <div class="article-container" id="xxx">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading v-if="loading" class="article-loading" />
    <!-- /加载中 loading -->
    <!-- 文章详情 -->
    <div class="detail" v-if="!is404">
      <!-- 标题 -->
      <h1 class="title">{{ article.title }}</h1>
      <div class="author">
        <!-- 头像 -->
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="article.aut_photo"
        />
        <div class="text">
          <!-- 作者 -->
          <p class="name">{{ article.aut_name }}</p>
          <!-- 发布时间 -->
          <p class="time">{{ article.pubdate | relativeTime }}</p>
        </div>
        <!-- 点击关注 -->
        <van-button round size="small" type="info" @click="toggleConcern()">{{
          article.is_followed ? "已关注" : " +关注"
        }}</van-button>
      </div>
      <div class="content">
        <!-- 主体内容显示区域 -->
        <div :class="{ content_hidden: isShow }" v-html="article.content"></div>
        <div class="bg-gradient" v-show="isShow">
          <p @click="isShowArticle">显示更多 <van-icon name="arrow-down" /></p>
        </div>
      </div>

      <van-divider>猜你喜欢</van-divider>
      <div class="zan">
        <van-button
          round
          size="small"
          hairline
          type="primary"
          plain
          icon="good-job-o"
          >点赞</van-button
        >
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          type="danger"
          plain
          icon="delete"
          >不喜欢</van-button
        >
      </div>
    </div>
    <!-- /文章详情 -->
    <div class="error" v-if="is404">
      <p>文章被外星人吃掉了</p>
      <van-button @click="$router.back()">后退</van-button>
      <van-button @click="$router.push('/')">回主页</van-button>
    </div>
    <!-- 评论 -->

    <comment v-if="!is404"></comment>
  </div>
</template>

<script>
import { getArticlesDetails, setConcern, unConcern } from '@/api/article.js'
import Comment from './comment.vue'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: {},
      isShow: true,
      is404: false
    }
  },
  components: {
    Comment
  },
  created () {
    this.getarticles()
  },
  methods: {

    // 获取文章详情
    async getarticles () {
      try {
        this.loading = true
        const res = await getArticlesDetails(this.$route.params.id)
        this.article = res.data.data
        console.log(res)
        this.loading = false
        this.$toast('获取成功')
      } catch (err) {
        this.loading = false
        if (err.response.status === 404) {
          this.is404 = true
        }
      }
    },
    // 点击显示更多文章
    isShowArticle () {
      this.isShow = false
    },
    // 关注
    async toggleConcern () {
      // eslint-disable-next-line camelcase
      const { is_followed: isFollowed, aut_id: autId } = this.article
      try {
        if (!isFollowed) {
          const res = await setConcern(autId)
          console.log(res)
          this.$toast.success('加关成功')
          // 修改页面的状态
          this.article.is_followed = true
        } else {
          const res = await unConcern(autId)
          console.log(res)
          this.$toast.success('取关成功')
          // 修改页面的状态
          this.article.is_followed = false
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('不能关注自己')
      }
    }
  }
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error {
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 25px;
  }
  .zan {
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    position: relative;

    font-size: 14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    .content_hidden {
      height: 300px;
    }
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
  .bg-gradient {
    position: absolute;
    bottom: 0px;
    left: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255),
      rgba(255, 255, 255, 0.3)
    );
    height: 100px;
    width: 100%;
    p {
      line-height: 125px;
      text-align: center;
      color: rgba(100, 100, 100);
    }
  }
}
</style>
