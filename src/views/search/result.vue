<template>
  <div class="serach-result">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.query.keyword + '的搜索结果'"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
        @click="$router.push(`/article/` + item.art_id)"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },

  methods: {
    async onLoad () {
      try {
        const res = await getSearch(this.$route.query.keyword, this.page)
        console.log(res)
        this.page++
        const arr = res.data.data.results
        this.list.push(...arr)
        this.loading = false

        if (arr.length === 0) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.serach-result {
  height: 100%;
  overflow: auto;
  .article-list {
    margin-top: 39px;
  }
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
</style>
