<template>
  <div>
    <MyHeader name="房屋管理" />
    <div v-if="houseList && houseList.length <= 0">
      <div class="tipText">
        <img src="http://liufusong.top:8080/img/not-found.png" alt="" />
        <p>您还未发布房源</p>
      </div>
    </div>
    <MyHouseItem
      v-for="(obj, index) in houseList"
      :key="index"
      :desc="obj.desc"
      :houseImg="obj.houseImg"
      :price="obj.price"
      :tags="obj.tags"
      :title="obj.title"
      v-else
    />
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyHouseItem from '@/components/MyHouseItem'
import { PublishedHouseInfo } from '@/api/user'
export default {
  components: { MyHeader, MyHouseItem },
  data() {
    return {
      houseList: []
    }
  },
  async mounted() {
    this.Publish()
  },
  methods: {
    async Publish() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await PublishedHouseInfo()
        console.log(res)
        this.houseList = res.data.body
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.HouseItem_img__1BaJK {
  width: 106px;
  height: 80px;
}
.tipText {
  text-align: center;
  img {
    width: 50%;
  }
  p {
    font-size: 16px;
    color: #333;
  }
}
</style>
