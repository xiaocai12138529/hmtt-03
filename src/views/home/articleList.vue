<template>
  <div class="scroll-wrapper">
    文章列表组件 {{ Math.random() }}
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          @click="$router.push('/article/' + article.art_id)"
          v-for="article in list"
          :key="article.art_id"
          :title="article.title"
        >
          <!-- 插槽 -->
          <div slot="label">
            <!-- 宫格 -->
            <van-grid
              v-if="article.cover.images"
              :column-num="article.cover.images.lenght"
            >
              <van-grid-item
                v-for="(imgUrl, ind) in article.cover.images"
                :key="ind"
              >
                <!-- 图片  lazy-load 图片懒加载-->
                <van-image lazy-load :src="imgUrl" />
              </van-grid-item>
            </van-grid>
            <!-- 文字区域 -->
            <div class="meta">
              <span>{{ article.aut_name }}</span>
              <span>{{ article.comm_count }}评论</span>
              <span>{{ article.pubdate | relativeTime }}</span>
              <!-- 叉叉 -->
              <span
                @click="moreArticle(article.art_id)"
                class="close"
                v-if="$store.state.tokenInfor.token"
              >
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
          <!-- </div> -->
        </van-cell>
        <!-- 弹层 -->
        <van-popup v-model="isShowMroeArticle" :style="{ width: '80%' }"
          ><MoreAction
            isReport="ture"
            @un-like="hUnLike"
            @report="hReport"
            ref="refRoreAction"
          ></MoreAction
        ></van-popup>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles, disLike, reports } from '@/api/article.js'
import MoreAction from './moreAction.vue'
export default {
  name: 'ArticleList',
  props: ['channel'],
  components: {
    MoreAction
  },
  data () {
    return {
      list: [], // 保存取到的列表数据
      loading: false, // 是否正在加载
      finished: false, // 是否已经完成
      refreshing: false,
      tiemstamp: Date.now(),
      isShowMroeArticle: false,
      articleId: null
    }
  },
  methods: {
    async onLoad () {
      // const res = await getArticles(this.channel.id ? this.channel.id : 0, this.tiemstamp)
      const res = await getArticles(this.channel.id, this.tiemstamp)
      // console.log(res)
      const arr = res.data.data.results
      this.tiemstamp = res.data.data.pre_timestamp
      this.list.push(...arr)
      console.log(this.list)
      this.loading = false
      if (arr.length === 0 || res.data.data.pre_timestamp == null) {
        // 说明取不到数据了
        this.finished = true
      }
      this.$toast.success('成功加载数据')
      // this.$toast.position('top')
      this.$toast.setDefaultOptions({ duration: 100 })
    },
    async onRefresh () {
      // Date.now(): 请求新的推荐数据传当前的时间戳
      const res = await getArticles(this.channel.id, Date.now())
      // 获取的数据
      const arr = res.data.data.results // 它是一个数组
      // 1. 追加数据到list的头部
      //    对数组进行展开
      this.list = []
      this.list.unshift(...arr)

      // 2. 把loading设置为false
      this.refreshing = false

      this.$toast.success('成功加载数据')
    },
    // 点击叉叉事件
    moreArticle (id) {
      this.isShowMroeArticle = true
      this.articleId = id
      if (this.$refs.refRoreAction) { this.$refs.refRoreAction.isReport = true }
    },
    async hUnLike () {
      // console.log(123)
      // 接下载要做的三件事情
      this.isShowMroeArticle = false
      try {
        console.log(this.articleId)
        const res = await disLike(this.articleId)
        console.log(res)
        this.$toast.fail('删除成功')
        // 删除本地文章
        this.delArticle(this.articleId)
      } catch (err) {
        console.log('123', err.name)
        this.$toast.fail('操作失败')
        if (err.name === 'Error') {
          alert('请重新登录')
        }
      }
    },
    // 删除本地文章
    delArticle (id) {
      const i = this.list.findIndex(item => item.art_id === id)
      console.log(i)
      this.list.splice(this.list.findIndex(item => item.art_id === id), 1)
    },
    // 举报文章
    async hReport (val) {
      console.log(val)
      try {
        console.log(this.articleId, val.value)
        const res = await reports(this.articleId, val.value)
        console.log(res.status)
        this.isShowMroeArticle = false
        this.$toast.success('举报成功')
        this.delArticle()
      } catch (err) {
        // console.log(err.name)
        this.$toast.fail('举报失败asdasd ')
      }
    }
  }

}
</script>

<style scoped lang='less'>
/deep/ .scroll-wrapper {
  padding-right: 20px;
}
.meta {
  span {
    margin-right: 10px;
  }
  display: flex;
  // 让它在最右边
  .close {
    // 它的父级容器是flex的，给当前元素设置左外边距为auto，会让这个元素在父级容器
    // 的最右边
    margin-left: auto;
  }
}
</style>
