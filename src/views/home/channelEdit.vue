<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button size="mini" type="info" @click="isShow = !isShow">{{
          isShow ? "保存" : "编辑"
        }}</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item
          v-for="(channel, index) in channels"
          :key="channel.id"
          @click="hClickMyChannel(index)"
          :class="{ red: active == index }"
        >
          <span>{{ channel.name }}</span>

          <van-icon
            name="cross"
            class="btn"
            v-show="isShow && channel.id != 0"
          ></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item
          v-for="Channel in newChannels"
          :key="Channel.id"
          @click="addChannel(Channel)"
        >
          <span>{{ Channel.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getChannels, addChannel, delChannel } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: ['channels', 'active', 'isShowChannelEdit'],
  data () {
    return {
      isShow: false,
      allChannels: []
    }
  },
  computed: {
    // 剩余的频道
    newChannels () {
      // eslint-disable-next-line eqeqeq
      return this.allChannels.filter((item) => !this.channels.some(index => index.id == item.id))
    }
  },
  watch: {
    isShowChannelEdit: function () {
      this.isShow = false
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    // 获取全部频道
    async getChannels () {
      try {
        const res = await getChannels()
        this.allChannels = res.data.data.channels
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 新增用户频道
    async addChannel (newChannel) {
      if (!this.isShow) {
        try {
          const res = await addChannel([newChannel])
          this.channels.push(newChannel)
          console.log(res)
        } catch (err) { console.log(err) }
      }
    },
    async hClickMyChannel (index) {
      if (!this.isShow) {
        this.$emit('change-channel', index)
      } else {
        // eslint-disable-next-line eqeqeq
        if (this.channels[index].id == 0) return
        await delChannel(this.channels[index].id)
        this.channels.splice(index, 1)
        console.log(index, this.active)
        if (index < this.active) {
          this.$emit('change-active')
        }
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
// 高亮显示
.red {
  // color: red;
  background-color: #3196fa;
  font-weight: bold;
  border-radius: 10px;
}
/deep/.van-grid-item__content {
  background-color: rgba(0, 0, 0, 0);
}
</style>
