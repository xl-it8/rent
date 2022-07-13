<template>
  <div class="title">
    <van-icon name="arrow-left" @click="$router.go(-1)" />
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  position: sticky;
  z-index: 22;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #21b97a;
  span {
    font-size: 18px;
    color: #fff;
  }
  .van-icon {
    left: -34%;
    color: #fff;
    font-size: 18px;
  }
}
</style>
