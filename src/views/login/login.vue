<template>
  <div>
    <!-- 1.nav-bar -->
    <van-nav-bar title="登录" />
    <!-- 2.login-input  -->
    <van-form validate-first @submit="onSubmit" @onFailed="onFailed">
      <van-field
        v-model.trim="user.mobile"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            pattern: /^1\d{10}$/,
            message: '请填写用户名',
            trigger: 'onChange',
          },
        ]"
        validate-trigger="onChange"
      />

      <!-- :rules="[{ pattern, message: '请输入正确手机号' }]" -->
      <van-field
        v-model.trim="user.code"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[
          { pattern: /^\d{6}$/, message: '请填写密码', trigger: 'onChange' },
        ]"
      />
      <div style="margin: 16px" class="btn-wrap">
        <van-button class="van-button" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      // 账户密码
      user: {
        mobile: '13911111111', // 测试账号可以登录
        code: '246810'
      },
      // 正则 我没用
      pattern: /^1\d{10}$/
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    ...mapActions('user', ['getProfile']),
    onSubmit () {
      console.log('验证成功')
      this.doLogin()
    },
    onFailed () {
      console.log('验证失败')
    },

    // 登录功能
    async doLogin () {
      // 等待遮罩层
      this.$toast({
        duration: 0, // 持续展示 toast,永远不会关闭
        overlay: true, // 整体添加一个遮罩
        message: '加载中...'
      })
      try {
        // 登录验证
        await this.userLogin(this.user)
        // 获取用户信息
        await this.getProfile()
        // 登录成功跳转
        this.$router.push('/')
        // 登录成功效果
        this.$toast.success('成功')
      } catch (err) {
        // 登录失败效果
        this.$toast.fail('失败')
        console.log('登录失败', err.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 按钮
.btn-wrap {
  padding: 20px;
  .van-button {
    width: 100%;
    background-color: #6db4fd;
    color: #fff;
  }
}
</style>
