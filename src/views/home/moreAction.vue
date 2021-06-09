<template>
  <div>
    <!-- 状态一 -->
    <van-cell-group v-if="isReport">
      <van-cell @click="$emit('un-like')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport = false">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <!-- 状态二 反馈-->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport = true">返回</van-cell>
      <van-cell
        v-for="item in reports"
        :key="item.value"
        @click="$emit('report', item)"
        >{{ item.label }}</van-cell
      >
      <!-- <van-cell>色情</van-cell>
      <van-cell>暴力</van-cell>
      <van-cell>低俗</van-cell>
      <van-cell>不适</van-cell>
      <van-cell>错误</van-cell>
      <van-cell>其他</van-cell> -->
    </van-cell-group>
  </div>
</template>

<script>
import reports from '@/constant/reports.js'
export default {
  data () {
    return {
      isReport: true, // 是否显示,
      reports: reports
    }
  }

}
</script>

<style lang="less" scoped>
</style>
