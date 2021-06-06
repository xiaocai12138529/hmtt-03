<template>
  <div>
    <div class="nav">
      黑马头条
      <button>乞丐按钮</button>
      <van-button type="primary" @click="btn">主要按钮</van-button>
    </div>
    <router-view />
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { getChannels } from '@/api/channel.js'
export default {
  data () {
    return {
      age: ''
    }
  },
  methods: {
    async btn () {
      // request({
      //   url: 'v1_0/user/channels123',
      //   method: 'GET'
      // }).then(res => {
      //   console.log(res.datada)
      // }).catch(err => {
      //   console.log(err)
      // })
      try {
        const res = await getChannels()
        console.log('返回的数据为', res.data)
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
