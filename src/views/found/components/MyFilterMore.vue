<template>
  <dl>
    <dt class="title">{{ title }}</dt>
    <dd
      class="content"
      v-for="(obj, index) in list"
      :key="index"
      @click="fn"
      ref="dd"
    >
      {{ obj.label }}
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    title: {
      type: String
    },
    clear: {
      type: Function
    },
    collectAll: {
      type: Function
    }
  },
  data() {
    return {
      selectAll: []
    }
  },
  methods: {
    fn(e) {
      e.target.classList.toggle('a')
      this.selectAll.push(e.target.innerHTML)
      console.log(this.selectAll)
    }
  }
}
</script>

<style lang="less" scoped>
@import url("@/styles/base.less");

.title {
  margin: 20px 0;
  font-size: 15px;
  color: #333;
}
.content {
  display: inline-block;
  height: 32px;
  width: 70px;
  margin: 0 18px 15px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  color: #888;
}

.a {
  background-color: greenyellow;
}
</style>
