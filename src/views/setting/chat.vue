<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小智同学"
    ></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div
        class="chat-item"
        v-for="(item, idx) in list"
        :key="idx"
        :class="item.name === 'xz' ? 'left' : 'right'"
      >
        <!-- template是一个组件：用于产生一个逻辑上的容器：它不会生成真实的dom标签 -->
        <template v-if="item.name === 'xz'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{ item.msg }}</div>
        </template>
        <template v-else>
          <div class="chat-pao">{{ item.msg }}</div>
          <van-image fit="cover" round :src="$route.query.userInfor" />
        </template>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么...">
        <span @click="send()" slot="button" style="font-size: 12px; color: #999"
          >提交</span
        >
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'UserChat',
  data () {
    return {
      list: [ // 对话记录
        // { name: 'xz', msg: '你好，我是无所不知的小智同学！', timestamp: Date.now() },
        // { name: 'me', msg: '小智同学, 请问你知道你不知道什么吗？', timestamp: Date.now() },
        // { name: 'xz', msg: '我有点晕了', timestamp: Date.now() }
      ],
      word: ''
    }
  },
  created () {
    this.socket = io('http://localhost:8001', {
      query: {
        token: this.$store.state.tokenInfor.token
      },
      transports: ['websocket']
    })

    this.socket.on('connect', () => {
      this.list.push({
        name: 'xz',
        msg: '我已经准备好了，你可以来撩我了',
        timestamp: Date.now()
      })
      // console.log('连接成功....', this.socket)
    })
    this.socket.on('message', obj => {
      console.log('从服务器端发过来的数据是', obj)
      this.list.push({
        name: 'xz',
        msg: obj.msg,
        timestamp: obj.timestamp
      })
    })
  },
  watch: {
    list () {
      setTimeout(() => {
        document.querySelector('.chat-list').scrollTop = document.querySelector('.chat-list').scrollHeight + 100
      }, 100)
    }
  },
  computed: {
  },
  methods: {
    send () {
      if (this.word === '') {
        return
      }
      // 1. 通过socket.io向服务器发消息
      this.socket.emit('message', {
        msg: this.word,
        timestamp: Date.now()
      })
      // 2. 把消息添加列表中
      this.list.push({
        name: 'me',
        msg: this.word,
        timestamp: Date.now()
      })
      this.word = ''
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
