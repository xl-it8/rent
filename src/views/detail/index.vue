<template>
  <div class="houseDetail">
    <MyHeader :name="list.community" />

    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in list.houseImg" :key="index">
          <img
            class="swipePic"
            :src="'http://liufusong.top:8080' + item"
            alt=""
          />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="DetailInfo">
      <h3>{{ list.title }}</h3>
      <div class="tags">
        <span v-for="(item, index) in list.tags" :key="index">{{ item }}</span>
      </div>
      <div class="detail_infoPriceItem">
        <div class="price">
          <p class="num">
            {{ list.price }}
            <span>/月</span>
          </p>
          <span>租金</span>
        </div>
        <div class="price">
          <p class="num">
            {{ list.roomType }}
          </p>
          <span>房型</span>
        </div>
        <div class="price">
          <p class="num">
            {{ list.size }}
            <span>平米</span>
          </p>
          <span>面积</span>
        </div>
      </div>
      <div class="detail_infoBasic">
        <div class="left">
          <div>装修:<span>精装</span></div>
          <div>
            楼层:<span>{{ list.floor }}</span>
          </div>
        </div>
        <div class="right">
          <div>
            朝向:<span v-for="(item, index) in list.oriented" :key="index">{{
              item
            }}</span>
          </div>
          <div>类型:<span>住宅</span></div>
        </div>
      </div>
    </div>

    <div class="houseDetail_map">
      <div class="mapTitle">
        小区:
        <span>天山星城</span>
        <div id="container">111111地图</div>
      </div>
    </div>

    <div class="houseDetail_about">
      <h3>房屋配套</h3>
      <ul class="HousePackage">
        <li v-for="(obj, index) in iconList" :key="index">
          <i class="iconfont" :class="obj.iconName"></i>
          <span>{{ obj.name }}</span>
        </li>
      </ul>
    </div>

    <div class="houseDetail_set">
      <h3>房源概况</h3>
      <div class="HouseDetail_contact">
        <div class="user">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
          <div class="info">
            <p>王女士</p>
            <p>
              <span></span>
              您好
            </p>
          </div>
        </div>
        <div class="usermsg">发消息</div>
      </div>
      <div class="HouseDetail_descText">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>

    <div class="houseDetail_recommend">
      <h3>猜你喜欢</h3>
      <!-- <MyHouseItem
        v-for="(obj, index) in list"
        :key="index"
        :desc="obj.desc"
        :houseImg="obj.houseImg"
        :price="obj.price"
        :tags="obj.tags"
        :title="obj.title"
      /> -->
    </div>

    <footer class="HouseDetail_fixedBottom">
      <div class="am-flexbox-item" @click="collect">
        <img :src="'http://liufusong.top:8080/' + address" alt="" />
        <span>收藏</span>
      </div>
      <div class="am-flexbox-item">在线咨询</div>
      <div class="am-flexbox-item">电话预约</div>
    </footer>
  </div>
</template>

<script>
import { checkHouseData } from '@/api/area'
import MyHeader from '@/components/MyHeader'
// import MyHouseItem from '@/components/MyHouseItem'
import { houseDetailInfo } from '@/api/houses'
import { addFavorite, delFavorite, isFavorite } from '@/api/user'
export default {
  components: { MyHeader },
  data() {
    return {
      list: {},
      houseCode: '',
      address: 'img/unstar.png',
      iconList: [
        { iconName: 'icon-yigui', name: '衣柜', active: false },
        { iconName: 'icon-xiyiji', name: '洗衣机', active: false },
        { iconName: 'icon-kongtiao', name: '空调', active: false },
        { iconName: 'icon-meiqitianranqi', name: '天然气', active: false },
        { iconName: 'icon-bingxiang', name: '冰箱', active: false },
        { iconName: 'icon-shuinuanqigongcheng', name: '暖气', active: false },
        { iconName: 'icon-dianshiji', name: '电视', active: false },
        { iconName: 'icon-haofangtuo400iconfont2reshuiqi', name: '热水器', active: false },
        { iconName: 'icon-kuandai', name: '宽带', active: false },
        { iconName: 'icon-shafa', name: '沙发', active: false }
      ],
      cityList: []
    }
  },
  async mounted() {
    const code = this.$route.params.id
    this.houseCode = code
    try {
      const res = await houseDetailInfo(code)
      this.list = res.data.body
      // console.log(this.list.supporting)
      this.iconList = this.iconList.filter((item, index) => this.list.supporting.some(item1 => item1 === item.name))
      console.log(this.iconList)
    } catch (e) {
      console.log(e)
    }
    this.checkHouseData('52ddce83-657e-3c0a')
    // 地图
    const { BMapGL } = window
    const myCity = new BMapGL.LocalCity()// 获取当前电脑所在的城市
    myCity.get((result) => {
      // console.log(result)// 北京
      const map = new BMapGL.Map('container')
      // const point = new BMapGL.Point(result.center.lng, result.center.lat)// 绘制
      const point1 = new BMapGL.Point(this.list.coord.longitude, this.list.coord.latitude)// 经纬度在接口中通过城市名字获取
      const content = `<div>
          <p>${this.list.label}</p>
          </div>`
      const label = new BMapGL.Label(content, { // 创建文本标注
        position: point1,
        offset: new BMapGL.Size(10, 20)
      })
      // console.log(label[index])
      map.addOverlay(label) // 将标注添加到地图中
      label.setStyle({ // 设置label的样式
        color: '#fff',
        fontSize: '14px',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: 'green',
        textAlign: 'center'
      })
      map.centerAndZoom(point1, 12)// 根据某城市的中心点绘制图 15是缩放级别
    })
  },
  methods: {
    async collect() {
      const res = await isFavorite(this.houseCode)
      const isLove = res.data.body.isFavorite
      console.log(isLove)
      if (!isLove) {
        await addFavorite(this.houseCode)
        this.$toast('已添加收藏')
        this.address = 'img/star.png'
      } else {
        await delFavorite(this.houseCode)
        this.$toast('已取消收藏')
        this.address = 'img/unstar.png'
      }
    },
    async checkHouseData(cityId) {
      // console.log(this.$store.state.City)
      try {
        const res = await checkHouseData({ id: cityId })
        this.cityList = res.data.body
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style lang="less" scoped>
@import url("@/styles/base.less");

#container {
  width: 375px;
  height: 145px;
}
.houseDetail {
  background-color: #f6f5f6;
}
.swipePic {
  width: 100%;
  height: 275px;
}

.DetailInfo {
  padding: 15px;
  background: #fff;
  h3 {
    font-weight: 400;
    font-size: 16px;
    color: #333;
  }
  .tags {
    display: inline-block;
    font-size: 12px;
    border-radius: 3px;
    padding: 4px 5px;
    margin-right: 5px;
    line-height: 12px;
    color: #39becd;
    background: #e1f5f8;
  }
  .detail_infoPriceItem {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    margin: 15px 0;
    padding: 15px 0;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .num {
        color: #fa5741;
        font-size: 18px;
        font-weight: bolder;
        span {
          font-size: 12px;
          font-weight: 400;
          color: #fa5741;
        }
      }
      span {
        text-align: center;
        color: #999;
        font-size: 14px;
      }
    }
  }

  .detail_infoBasic {
    display: flex;
    justify-content: flex-start;
    color: #333;
    &div {
      flex: 1;
    }
    .left,
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;
      margin-right: 80px;
      span {
        display: inline-block;
        color: #999;
        padding-right: 5px;
        line-height: 26px;
      }
    }
  }
}

.houseDetail_map {
  height: 200px;
  margin-top: 10px;
  background-color: #fff;
  .mapTitle {
    color: #333;
    font-size: 13px;
  }
}

.houseDetail_about {
  padding: 0 10px;
  background-color: #fff;
  margin-bottom: 10px;
  h3 {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-evenly;
    li {
      // flex: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      margin-bottom: 20px;
      i {
        font-size: 23px;
      }
      span {
        color: #333;
      }
    }
  }
}

.houseDetail_set {
  padding: 0 10px;
  background-color: #fff;
  margin-bottom: 10px;
  h3 {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
  }
  .HouseDetail_contact {
    display: flex;
    justify-content: space-between;
    .user {
      display: flex;
      justify-content: space-between;
      img {
        width: 52px;
        height: 52px;
      }
      .info {
        padding: 10px 0 0 10px;
        color: #333;
        font-size: 14px;
        p:nth-child(2) {
          font-size: 12px;
          color: #fa5741;
        }
      }
    }
    .usermsg {
      width: 74px;
      height: 34px;
      line-height: 34px;
      color: #33be85;
      border: 1px solid #33be85;
      border-radius: 3px;
      font-size: 14px;
      text-align: center;
    }
  }
  .HouseDetail_descText {
    line-height: 1.6;
    padding: 10px 0;
    color: #333;
    font-size: 14px;
    margin-bottom: 10px;
  }
}

.houseDetail_recommend {
  margin: 10px 0 0;
  padding: 0 15px;
  background: #fff;
  h3 {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
  }
}

.HouseDetail_fixedBottom {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #cecece;
  text-align: center;
  font-size: 17px;
  color: #999;
  background-color: #fff;
  .am-flexbox-item {
    flex: 1;
    // margin-left: 8px;
    border-right: 1px solid #e8e8e9;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .am-flexbox-item:nth-child(3) {
    border-right: 1px solid #e8e8e9;
    background-color: #21b97a;
    color: #fff;
  }
}
</style>
