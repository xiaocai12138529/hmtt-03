<template>
  <div>
    <!-- 1.nav-bar -->
    <van-nav-bar title="登录" />
    <!-- 2.login-input  -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 16px">
        <van-button class="btn-wrap" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
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
