<template>
  <van-col
    span="8"
    type="flex"
    justify="space-around"
    :style="{ backgroundColor: color }"
  >
    <van-icon :name="iconName" />
    <p>{{ info }}</p>
  </van-col>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
