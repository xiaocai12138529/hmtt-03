<template>
  <div>
    <van-nav-bar
      title="搜索中心"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>

    <!--  搜索区域 输入框 -->
    <van-search
      @input="hInput"
      v-model.trim="keyword"
      show-action
      placeholder="请输入搜索关键词"
    >
      <!-- #action  ==== slot="action" -->
      <!-- <template slot="action">
        <div>搜索</div>
      </template> -->
      <div slot="action">搜索</div>
    </van-search>

    <!-- 2. 搜索建议 -->
    <van-cell-group>
      <van-cell icon="search" v-for="item in newList" :key="item">
        <div v-html="item"></div>
      </van-cell>
    </van-cell-group>

    <!-- 3. 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录" />

      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>

      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      list: []
    }
  },
  computed: {
    // 计算属性  高亮显示搜索内容
    newList () {
      const regex = new RegExp(this.keyword, 'gi')
      return this.list.map(item => item.replace(regex, `<i style="color:red">${this.keyword}</i>`))
    }
  },
  methods: {
    // 获取搜索信息
    async hInput () {
      if (this.keyword === '') {
        // 搜索框为空清空
        this.list = []
        return
      }
      try {
        const res = await getSuggestion(this.keyword)
        console.log(res)
        this.list = res.data.data.options
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
