<template>
  <div>
    <MyHeader name="收藏列表" />
    <div v-if="favoriteList && favoriteList.length <= 0">
      <div class="tipText">
        <img src="http://liufusong.top:8080/img/not-found.png" alt="" />
        <p>您还未收藏</p>
      </div>
    </div>
    <MyHouseItem
      v-for="(obj, index) in favoriteList"
      :key="index"
      :desc="obj.desc"
      :houseImg="obj.houseImg"
      :price="obj.price"
      :tags="obj.tags"
      :title="obj.title"
      v-else
      @click.native="enterDetail(index)"
    />
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyHouseItem from '@/components/MyHouseItem'
import { getFavorite } from '@/api/user'
export default {
  components: { MyHeader, MyHouseItem },
  data() {
    return {
      favoriteList: [],

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
        const res = await getFavorite()
        console.log(res)
        this.favoriteList = res.data.body
      } catch (e) {
        console.log(e)
      }
    },
    enterDetail(index) {
      const id = this.houseDetail[index].houseCode
      // console.log(id)
      this.$router.push(`/detail/${id}`)
    },
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
