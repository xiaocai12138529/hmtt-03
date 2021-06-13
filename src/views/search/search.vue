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
      <div slot="action" @click="hSearch">搜索</div>
    </van-search>

    <!-- 2. 搜索建议 -->
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="(item, index) in newList"
        :key="index"
        @click="HClickSuggestion(index)"
      >
        <div v-html="item"></div>
      </van-cell>
    </van-cell-group>

    <!-- 3. 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录" />

      <van-cell
        :title="item"
        v-for="(item, index) in history"
        :key="index"
        @click="$router.push('/search/result?keyword=' + item)"
      >
        <van-icon @click.stop="delHistory(index)" name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
import { saveHistory, getHistory } from '@/utils/historyStorage.js'
import escapeRegExp from '@/utils/escapeRegExp.js'

export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 输入的搜索文字
      list: [], // 搜索结果
      history: [], // 历史结果
      timer: null,
      td: 0

    }
  },
  computed: {
    // 计算属性  高亮显示搜索内容
    newList () {
      const regex = new RegExp(escapeRegExp(this.keyword), 'gi')
      return this.list.map(item => item.replace(regex, `<i style="color:red">${this.keyword}</i>`))
    }
  },
  created () {
    this.history = getHistory()
  },
  methods: {
    // 获取搜索信息
    // 防抖()
    // async hInput () {
    //   clearTimeout(this.timer)
    //   this.timer = await setTimeout(() => {
    //     this.doAjax()
    //   }, 1000)
    // },
    // 节流
    async hInput () {
      const newDt = new Date()
      if (newDt - this.td > 500) {
        this.doAjax()
        this.td = newDt
      }
    },
    async doAjax () {
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
    },
    // 添加历史记录方法
    addHistory (keyword) {
      const idx = this.history.findIndex(item => item === keyword)
      idx !== -1 && this.history.splice(idx, 1)
      this.history.unshift(keyword)
      saveHistory(this.history)
    },
    // 情况一 点击搜索添加
    hSearch () {
      if (this.keyword) {
        // 添加历史记录
        this.addHistory(this.keyword)
        this.$router.push('/search/result?keyword=' + this.keyword)
      }
    },
    // 情况二 点击搜索结果添加
    HClickSuggestion (inx) {
      this.$router.push('/search/result?keyword=' + this.list[inx])
      this.addHistory(this.list[inx])
    },
    // 删除历史记录
    delHistory (inx) {
      this.history.splice(inx, 1)
      saveHistory(this.history)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
</style>>
