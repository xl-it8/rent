<template>
  <div class="house">
    <MyHeader name="发布房源" />

    <div class="homeInfo">
      <div class="info">房源信息</div>
      <van-cell
        title="小区名称"
        is-link
        :value="val"
        @click="$router.push('/search')"
      />
      <van-cell title="租金" value="￥/月">
        <template #default>
          <div class="ipt">
            <input
              type="text"
              placeholder="请输入租金/月"
              v-model="houseInfo.price"
            />
            <span>￥/月</span>
          </div>
        </template>
      </van-cell>
      <van-cell title="建筑面积" value="m^2">
        <template #default>
          <div class="ipt">
            <input
              type="text"
              placeholder="请输入建筑面积"
              v-model="houseInfo.size"
            />
            <span>m²</span>
          </div>
        </template>
      </van-cell>
      <!-- <van-cell title="户型" is-link value="请选择" @click="isShow = true">
        <template #default v-if="isShow">
          <MyPicker title="户型" />
        </template>
      </van-cell> -->
      <MyPicker title="户型" :columns="home" />
      <MyPicker title="所在楼层" :columns="floor" />
      <MyPicker title="朝阳" :columns="position" />
    </div>

    <div class="homeTitle">
      <div class="info">房源标题</div>
      <div class="iptContent">
        <input
          type="text"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
          v-model="houseInfo.title"
        />
      </div>
    </div>

    <div class="homeAvatar">
      <div class="info">房屋头像</div>
      <van-field name="uploader">
        <template #input>
          <van-uploader
            v-model="uploader"
            upload-icon="plus"
            :after-read="getFile"
          />
        </template>
      </van-field>
    </div>

    <div class="homeConfig">
      <div class="info">房屋配置</div>
      <ul>
        <li
          v-for="(obj, index) in iconList"
          :key="index"
          @click="getSupporting(obj.name, index)"
          :class="{ a: obj.active }"
        >
          <i class="iconfont" :class="obj.iconName"></i>
          <span>{{ obj.name }}</span>
        </li>
      </ul>
    </div>

    <div class="homeSay">
      <div class="info">房屋描述</div>
      <textarea
        v-model="houseInfo.description"
        rows="5"
        style="height: 124px; width: 100%"
        placeholder="请输入房屋描述信息"
      >
      </textarea>
    </div>

    <div class="btn">
      <span @click="cancel">取消</span>
      <span @click="onSubmit">提交</span>
    </div>
  </div>
</template>

<script>
import MyPicker from '@/components/MyPicker'
import MyHeader from '@/components/MyHeader'
import { PublishHouseInfo } from '@/api/user'
import { getHouseCondition, putImage } from '@/api/houses'
export default {
  name: 'Publish',
  components: { MyHeader, MyPicker },
  data() {
    return {
      uploader: [],
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
      home: ['一室', '二室', '三室', '四室', '四室+'],
      floor: ['高楼层', '中楼层', '低楼层'],
      position: ['东', '西', '南', '北'],
      val: '请输入小区名称',
      isShow: false,
      fd: '',
      houseInfo: {
        title: '',
        description: '',
        houseImg: '',
        oriented: '',
        supporting: '',
        price: '',
        roomType: '',
        size: '',
        floor: '',
        community: ''
      },
      houseCondition: {},
      supportArr: [],
      isPink: false
    }
  },
  async mounted() {
    try {
      const res = await getHouseCondition()
      this.houseCondition = res.data.body
      // this.$store.commit('setCondition', res.data.body)
      // this.home.
    } catch (e) {
      console.log(e)
    }
    this.$bus.$on('getName-event', this.fn)
    this.$bus.$on('getInfo-event', (val) => {
      this.houseCondition.roomType.forEach(item => {
        if (item.label === val) {
          this.$set(this.houseInfo, 'roomType', item.value)
        }
      })
      this.houseCondition.oriented.forEach(item => {
        if (item.label === val) {
          this.$set(this.houseInfo, 'oriented', item.value)
        }
      })
      this.houseCondition.floor.forEach(item => {
        if (item.label === val) {
          this.$set(this.houseInfo, 'floor', item.value)
        }
      })
    })
  },
  methods: {
    fn(obj) {
      this.val = obj.communityName
      this.$set(this.houseInfo, 'community', obj.community)
    },
    cancel() {
      this.$dialog.confirm({
        title: '提示',
        message: '放弃发布房源?',
        confirmButtonText: '继续编辑',
        confirmButtonColor: 'blue',
        cancelButtonText: '放弃'
      }).catch(() => {
        this.$router.back()
      })
    },
    async onSubmit() {
      try {
        const res = await PublishHouseInfo(this.houseInfo)
        console.log(res)
      } catch (e) {
        console.log(11)
        console.log(e)
      }
    },
    async getFile(file) {
      const form = new FormData()
      form.append('file', file.file)
      try {
        const { data: { body: img } } = await putImage(form)
        this.$set(this.houseInfo, 'houseImg', img[0])
      } catch (e) {
        console.log(e)
      }
    },
    getSupporting(name, index) {
      this.iconList[index].active = !this.iconList[index].active
      this.supportArr.push(name)
      this.$set(this.houseInfo, 'supporting', this.supportArr.join('|'))
    }
  }
}

// {
//   "title": "整租 · 豪华小区 精装修出租 小区环境幽静",
//   "description": "【装修描述】 装修简洁，家电配齐，通风采光效果良好，格局方正。",
//   "houseImg": "img1|im2|img3",
//   "oriented": "ORIEN|caa6f80b-b764-c2df",
//   "supporting": "空调|洗衣机",
//   "price": "1234",
//   "roomType": "ROOM|ce2a5daa-811d-2f49",
//   "size": "123",
//   "floor": "FLOOR|1",
//   "community": "AREA|93cbbe43-741d-de54"
// }
</script>

<style lang="less" scoped>
@import url("@/styles/base.less");

.a {
  background-color: pink !important;
}
.house {
  padding-bottom: 70px;
  background-color: #f5f5f9;
}

.info {
  padding: 15px 15px 9px;
  font-size: 14px;
  color: #888;
  width: 375px;
  box-sizing: border-box;
}
.homeInfo .info {
  color: #21b97a;
  background-color: #fff;
  font-size: 15px;
}
/deep/ .homeInfo {
  .van-cell__title {
    font-size: 14px;
    color: #666;
    padding: 15px 15px;
  }
  .van-cell:nth-child(3) .van-cell__title,
  .van-cell__value {
    flex: unset;
    text-align: unset;
    .ipt {
      margin-left: 10px;
      input {
        width: 270px;
        padding-top: 15px;
        // border: none;
      }
    }
  }
  .van-cell:nth-child(4) .van-cell__title,
  .van-cell__value {
    flex: unset;
    text-align: unset;
    .ipt {
      margin-left: 10px;
      input {
        width: 249px;
        border: none;
        padding-top: 15px;
      }
    }
  }
}
/deep/.van-field__control {
  padding: 15px 15px;
}
.homeTitle,
.homeAvatar,
.homeConfig {
  background-color: #fff;
}
.homeTitle .iptContent {
  input {
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 4px 12px 4px;
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  li {
    flex: 20%;
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
.homeSay {
  textarea {
    padding: 10px 12px;
    resize: none;
    border: none;
    font-size: 14px;
    color: #ccc;
  }
}

.btn {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  height: 45px;
  width: 100%;
  background-color: #fff;
  span {
    display: inline-block;
    width: 50%;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    text-align: center;
    &:nth-child(1) {
      background-color: #fff;
      color: #21b97a;
    }
    &:nth-child(2) {
      background-color: #21b97a;
      color: #fff;
    }
  }
}
</style>
