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
        <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  props: ['channel'],
  data () {
    return {
      list: [], // 保存取到的列表数据
      loading: false, // 是否正在加载
      finished: false, // 是否已经完成
      refreshing: false,
      tiemstamp: Date.now()
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

      this.loading = false
      if (arr.length === 0 || res.data.data.pre_timestamp == null) {
        // 说明取不到数据了
        this.finished = true
      }
      this.$toast.success('成功加载数据')
      // this.$toast.position('top')
      this.$toast.setDefaultOptions({ duration: 100 })
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }

}
</script>

<style scoped lang='less'>
/deep/ .scroll-wrapper {
  padding-right: 20px;
}
</style>
