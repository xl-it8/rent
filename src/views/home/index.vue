<template>
  <div>
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="obj in swiperList" :key="obj.id">
          <img
            class="swipePic"
            :src="'http://liufusong.top:8080' + obj.imgSrc"
            alt=""
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <MySearch></MySearch>
    <!-- <div class="searchCity">
      <van-search
        label="广州"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div> -->
    <div class="rentPic">
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <img
            class="am-flexbox-item"
            src="https://img0.baidu.com/it/u=521368164,1639256318&fm=253&fmt=auto&app=138&f=PNG?w=120&h=120"
            alt=""
          />
          <p>整租</p>
        </van-col>
        <van-col span="6">
          <img
            class="am-flexbox-item"
            src="https://img0.baidu.com/it/u=521368164,1639256318&fm=253&fmt=auto&app=138&f=PNG?w=120&h=120"
            alt=""
          />
          <p>合租</p>
        </van-col>
        <van-col span="6">
          <img
            class="am-flexbox-item"
            src="https://img0.baidu.com/it/u=521368164,1639256318&fm=253&fmt=auto&app=138&f=PNG?w=120&h=120"
            alt=""
          />
          <p>地图找房</p>
        </van-col>
        <van-col span="6" @click="$router.push('/publish')">
          <img
            class="am-flexbox-item"
            src="https://img0.baidu.com/it/u=521368164,1639256318&fm=253&fmt=auto&app=138&f=PNG?w=120&h=120"
            alt=""
          />
          <p>去出租</p>
        </van-col>
      </van-row>
    </div>
    <div class="rentGroup">
      <div class="groupTitle">
        <h3>租房小组</h3>
        <span class="more">更多</span>
      </div>
      <van-grid direction="horizontal" :column-num="2" :gutter="10">
        <van-grid-item v-for="obj in groupsList" :key="obj.id">
          <van-image :src="'http://liufusong.top:8080' + obj.imgSrc" />
          <div class="nr">
            <p>{{ obj.title }}</p>
            <p>{{ obj.desc }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>

import MySearch from '@/components/MySearch'
import { getSwiperPic, getGroups } from '@/api/home'
export default {
  components: { MySearch },
  data() {
    return {
      swiperList: [],
      groupsList: []
    }
  },
  async mounted() {
    try {
      const res = await getSwiperPic()
      this.swiperList = res.data.body
      // console.log(res)
    } catch (e) {
      console.log(e)
    }
    try {
      const res1 = await getGroups({ area: 'AREA|88cff55c-aaa4-e2e0' })
      this.groupsList = res1.data.body
      // console.log(res1)
    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style lang="less" scoped>
.swipePic {
  width: 100%;
}

.rentPic {
  .van-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .am-flexbox-item {
    width: 56px;
    height: 56px;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
}
.rentGroup {
  background-color: #f6f5f6;
  padding: 0 10px 10px 10px;
  .groupTitle {
    display: flex;
    justify-content: space-between;
    h3 {
      margin-left: 10px;
      font-weight: normal;
      font-size: 15px;
    }
    .more {
      font-size: 12px;
      color: #ccc;
      margin: 15px 15px 0 0;
    }
    // margin: 15px 0 15px 0;
  }
}
/deep/ .van-image__img {
  width: 54px;
  height: 53px;
  margin-right: 3px;
}
// /deep/ .van-grid-item__content {
//   padding: 0 10px 0 0;
// }

/deep/ .nr {
  p {
    margin: 0;
    font-size: 14px;
    color: #333;
  }
}
</style>
