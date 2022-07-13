<template>
  <div class="search-box">
    <slot name="left-arrow"></slot>
    <div class="search">
      <div @click="$router.push('/city')">
        <span class="name">{{ City.label }}</span>
        <van-icon name="arrow-down" size="12" class="arrow" />
      </div>
      <div class="form">
        <van-icon name="search" class="search1" />
        <span class="text">请输入小区或地址</span>
      </div>
    </div>
    <van-icon
      class="location"
      name="location-o"
      @click="$router.push('/map')"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // label() {
    //   return this.$store.state.City.label
    // }
    ...mapState(['City'])
  }
}
</script>

<style scoped lang="less">
.search-box {
  display: flex;
  align-content: center;
  width: 350px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 6%;
  left: 50%;
  transform: translate(-50%, -50%);
  .location {
    padding-top: 10px;
  }
  .search {
    display: flex;
    align-content: center;
    width: 300px;
    height: 100%;
    padding: 5px 5px 5px 8px;
    margin-right: 5px;
    background-color: #fff;
    border-radius: 3px;
    .name {
      font-size: 14px;
      color: #ccc;
      margin-right: 5px;
    }
    .arrow {
      margin-right: 5px;
      padding-top: 8px;
    }
    .form {
      vertical-align: middle;
      font-size: 15px;
      color: #9c9fa1;
      margin-left: 5px;
      border-left: 1px solid #9c9fa1;
      margin: 5px 5px 0 10px;
      width: 200px;
      height: 25px;
      line-height: 25px;
      .text {
        margin-left: 10px;
        padding: 0 0 0 4px;
      }
      .van-icon {
        font-size: 20px;
        padding-left: 12px;
      }
    }
    // .van-icon {
    //   margin-top: 10px;
    // }
  }
}
</style>
