<template>
  <div class="index">
    <van-tabs v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 频道内容{{ channel.name }} -->

        <!-- 传递频道信息 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getChannels } from '@/api/channel'
import ArticleList from './articleList'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadChannel()
  },
  methods: {
    async loadChannel () {
      try {
        const res = await getChannels()
        this.channels = res.data.data.channels
      } catch (err) {
        alert('获取列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.contextList {
  height: 200px;
  overflow: auto;
  padding-right: 20px;
}
</style>
