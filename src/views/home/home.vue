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
      <!-- 频道列表 开关 通过定位 通过它打开频道管理的弹层 -->
      <div class="bar-btn" @click="isShowChannelEdit = true">
        <van-icon name="wap-nav" />
      </div>
      <!-- https://vant-contrib.gitee.io/vant/#/zh-CN/action-sheet -->
      <van-action-sheet v-model="isShowChannelEdit" title="频道">
        <!-- 频道管理组件 -->
        <channelEdit :channels="channels"></channelEdit>
      </van-action-sheet>
    </van-tabs>
  </div>
</template>
<script>
import { getUseChannels } from '@/api/channel'
import ArticleList from './articleList'
import channelEdit from './channelEdit'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      channels: [],
      isShowChannelEdit: false
    }
  },
  components: {
    ArticleList, channelEdit
  },
  created () {
    this.loadChannel()
  },
  methods: {
    async loadChannel () {
      try {
        const res = await getUseChannels()
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
