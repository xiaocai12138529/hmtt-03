<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button size="mini" type="info" @click="isShow = !isShow"
          >编辑</van-button
        >
      </van-cell>
      <van-grid>
        <van-grid-item v-for="channel in channels" :key="channel.id">
          <span>{{ channel.name }}</span>

          <van-icon name="cross" class="btn" v-show="isShow"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="Channel in newChannels" :key="Channel.id">
          <span>{{ Channel.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: ['channels'],
  data () {
    return {
      isShow: false,
      allChannels: []
    }
  },
  computed: {
    newChannels () {
      return this.allChannels.filter((item) => !this.channels.some(index => index.name === item.name))
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    async getChannels () {
      try {
        const res = await getChannels()
        this.allChannels = res.data.data.channels
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  padding: 15px;
  font-size: 14px;
}
.btn {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
}
</style>
