<template>
  <div class="container">
    <!-- 顶部导航 -->
    <div>
      <van-nav-bar fixed title="标题" left-text="返回" left-arrow>
        <template #left>
          <div class="logo"><img src="" alt="" /></div>
        </template>
        <template #right>
          <van-button class="ssstyle" round icon="search" size="small"
            >搜索</van-button
          >
        </template>
      </van-nav-bar>
    </div>

    <!-- 主体区域 -->
    <router-view></router-view>

    <!-- 底部的tabbar -->
    <div>
      <van-tabbar route>
        <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
        <van-tabbar-item icon="question-o" to="/question">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/setting">{{
          $store.state.tokenInfor.token ? "我的" : "未登陆"
        }}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<style lang="less" scoped>
.logo {
  background: url("https://img01.yzcdn.cn/vant/logo.png") no-repeat;
  background-size: cover;
  width: 30px;
  height: 30px;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.ssstyle {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
