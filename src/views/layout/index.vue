<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/home"> 首页 </van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/found">
        找房
      </van-tabbar-item>
      <van-tabbar-item icon="notes-o" replace to="/news">
        咨询
      </van-tabbar-item>
      <van-tabbar-item icon="contact" replace to="/my"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: ''
    }
  }
}
</script>

<style lang="less">
</style>
