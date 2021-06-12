<template>
  <div>
    <!-- 状态一 -->
    <van-cell-group v-if="isReport == 1">
      <van-cell @click="$emit('un-like')">
        <van-icon name="closed-eye" />
        不感兴趣</van-cell
      >
      <van-cell is-link @click="isReport = 2">
        <van-icon name="edit" />
        反馈垃圾内容
      </van-cell>
      <van-cell>
        <van-icon name="delete-o" />
        拉黑作者</van-cell
      >
    </van-cell-group>
    <!-- 状态二 反馈-->
    <van-cell-group v-else-if="isReport == 2">
      <van-cell icon="arrow-left" @click="isReport = 1">返回</van-cell>
      <van-cell @click="isReport = 3">
        <van-icon name="info-o" /> 其他问题</van-cell
      >
      <van-cell
        v-for="item in reports"
        :key="item.value"
        @click="$emit('report', item)"
      >
        <van-icon name="info-o" />
        {{ item.label }}</van-cell
      >
    </van-cell-group>
    <van-cell-group v-else-if="isReport == 3">
      <van-cell icon="arrow-left" @click="isReport = 2">返回</van-cell>
      <van-field
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入问题"
        show-word-limit
      />
      <van-button class="pp" type="primary" size="mini">提交</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import reports from '@/constant/reports.js'
export default {
  data () {
    return {
      isReport: 1, // 是否显示,
      reports: reports
    }
  }

}
</script>

<style lang="less" scoped>
.pp {
  position: absolute;
  top: 10px;
  right: 15px;
}
</style>
