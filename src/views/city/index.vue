<template>
  <div>
    <MyHeader name="城市列表"></MyHeader>
    <div class="citylist">
      <van-index-bar :index-list="indexList" highlight-color="blue">
        <van-index-anchor index="#">当前城市</van-index-anchor>
        <van-cell title="广州" />
        <van-index-anchor index="热">热门城市</van-index-anchor>
        <van-cell
          :title="obj.label"
          v-for="obj in hotCityList"
          :key="obj.value"
          @click="saveCityId(obj)"
        />
        <div v-for="(obj, index) in AllCitySort" :key="index">
          <van-index-anchor :index="obj.yw" />
          <van-cell
            :title="item.label"
            v-for="(item, index) in obj.city"
            :key="index"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MyHeader from '@/components/MyHeader'
import { getCityList, getHotCity } from '@/api/area'
export default {
  name: 'City',
  components: { MyHeader },
  async mounted() {
    try {
      const res = await getHotCity()
      this.hotCityList = res.data.body
      console.log(res)
    } catch (e) {
      console.log(e)
    }

    try {
      const res = await getCityList({ level: 1 })
      this.AllCityList = res.data.body
      const arr = []
      for (let i = 2; i < (this.indexList.length); i++) {
        const i1 = i - 2
        arr[i1] = { yw: this.indexList[i], city: [], id: i - 1 }
      }
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < this.AllCityList.length; j++) {
          const zm = this.AllCityList[j].short.substr(0, 1).toUpperCase()
          if (arr[i].yw === zm) {
            arr[i].city.push({ value: this.AllCityList[j].value, label: this.AllCityList[j].label })
          }
        }
      }
      for (let c = 0; c < arr.length; c++) {
        if (arr[c].city.length <= 0) {
          arr[c].city[0] = { label: '暂无城市' }
        }
      }
      this.AllCitySort = arr
      // console.log(arr)
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      indexList: ['#', '热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      hotCityList: [],
      AllCitySort: []
    }
  },
  methods: {
    ...mapMutations({ saveCityId: 'saveCityId' })
  }
}
</script>

<style lang='less' scoped>
/deep/ .citylist {
  padding: 0px 0;
  .van-index-anchor {
    color: #999;
    font-size: 14px;
  }
}
/deep/ .van-index-bar__index {
  padding: 5px 0.21333rem 0 0.42667rem;
}
</style>
