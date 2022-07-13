<template>
  <div>
    <form>
      <van-search
        v-model="value"
        show-action
        placeholder="请输入小区或地址"
        @input="onSearch"
        @cancel="$router.back()"
      />
    </form>
    <template v-if="value !== ''">
      <ul>
        <li
          v-for="(obj, index) in searchList"
          :key="index"
          @click="backPage(obj)"
        >
          {{ obj.communityName }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
// import SearchResult from './components/searchResult'
import { getCommunityKeys } from '@/api/area'
let timer = null
export default {
  // components: { SearchResult },s
  data() {
    return {
      value: '',
      searchList: []
    }
  },
  methods: {
    onSearch() {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        try {
          const res = await getCommunityKeys({ name: this.value, id: this.$store.state.City.value })
          this.searchList = res.data.body
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }, 500)
    },
    backPage(val) {
      console.log(val);
      this.$bus.$emit('getName-event', val)
      this.$router.back()
    }
  },
  beforeDestroy() {
    clearTimeout(timer)
  }
}
</script>

<style lang="less" scoped>
ul {
  padding: 0 10px;
  li {
    font-size: 14px;
    margin-bottom: 8px;
  }
}
</style>
