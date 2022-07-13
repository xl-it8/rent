<template>
  <div>
    <van-cell :title="title" is-link :value="value" @click="showPicker = true">
    </van-cell>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }

  },
  data() {
    return {
      showPicker: false,
      value: '请选择'
    }
  },
  methods: {
    onConfirm(value) {
      this.showPicker = false
      this.value = value
      this.$bus.$emit('getInfo-event',value)
    }
  }
}
</script>

<style>
</style>
