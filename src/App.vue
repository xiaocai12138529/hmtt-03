<template>
  <div id="app">
    <keep-alive include="layout" exclude="UserIndex">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { getChannels } from '@/api/channel.js'
export default {
  data () {
    return {

    }
  },
  methods: {
    async btn () {
      try {
        const res = await getChannels()
        console.log('返回的数据为', res)
      } catch (err) {
        if (err.name === 'Error') {
          return console.log('地址错误', err)
        }
        console.log('请求错误', err)
      }
    }
  }
}
</script>

<style scoped>
.nav {
  font-size: 20px;
}
</style>
