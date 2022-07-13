<template>
  <div class="house">
    <div class="header">
      <MySearch>
        <template #left-arrow>
          <van-icon name="arrow-left" @click="$router.go(-1)" />
        </template>
      </MySearch>
    </div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="区域" ref="item">
          <van-cell>
            <van-picker
              show-toolbar
              :columns="columns"
              cancel-button-text
              confirm-button-text
              toolbar-position="bottom"
              item-height="1rem"
              ref="f1"
            >
              <template #confirm>
                <van-button type="primary" class="sure" @click="getSelectValue"
                  >确定</van-button
                >
              </template>
              <template #cancel>
                <van-button
                  type="primary"
                  class="cancel"
                  @click="$refs.item.toggle()"
                  >取消</van-button
                >
              </template>
            </van-picker>
          </van-cell>
        </van-dropdown-item>

        <van-dropdown-item title="方式" ref="item1">
          <van-cell>
            <van-picker
              show-toolbar
              :columns="rentTypeArr"
              cancel-button-text
              confirm-button-text
              toolbar-position="bottom"
              item-height="1rem"
              ref="f1"
            >
              <template #confirm>
                <van-button
                  type="primary"
                  class="sure"
                  @click="getSelectRootType"
                  >确定</van-button
                >
              </template>
              <template #cancel>
                <van-button
                  type="primary"
                  class="cancel"
                  @click="$refs.item1.toggle()"
                  >取消</van-button
                >
              </template>
            </van-picker>
          </van-cell>
        </van-dropdown-item>

        <van-dropdown-item title="租金" ref="item2">
          <van-cell>
            <van-picker
              show-toolbar
              :columns="priceArr"
              cancel-button-text
              confirm-button-text
              toolbar-position="bottom"
              item-height="1rem"
              ref="f1"
            >
              <template #confirm>
                <van-button type="primary" class="sure" @click="getSelectPrice"
                  >确定</van-button
                >
              </template>
              <template #cancel>
                <van-button
                  type="primary"
                  class="cancel"
                  @click="$refs.item2.toggle()"
                  >取消</van-button
                >
              </template>
            </van-picker>
          </van-cell>
        </van-dropdown-item>

        <van-dropdown-item title="筛选"> </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <div class="box" @click="show = !show"></div>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="right"
      :style="{ width: '80%', height: '100%' }"
    >
      <div class="filterMore">
        <MyFilterMore
          :list="roomType"
          title="户型"
          :clear="clear"
          :collectAll="collectAll"
          ref="a"
        />
        <MyFilterMore
          :list="oriented"
          title="朝向"
          :clear="clear"
          :collectAll="collectAll"
          ref="a1"
        />

        <MyFilterMore
          :list="floor"
          title="楼层"
          :collectAll="collectAll"
          :clear="clear"
          ref="a2"
        />
        <MyFilterMore
          :list="characteristic"
          title="房屋亮点"
          :clear="clear"
          ref="a3"
          :collectAll="collectAll"
        />
      </div>
      <div class="btn">
        <van-button type="primary" class="cancel" @click="clear"
          >清除</van-button
        >
        <van-button type="primary" class="sure" @click="collectAll"
          >确定</van-button
        >
      </div>
    </van-popup>

    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <MyHouseItem
          v-for="(obj, index) in houseDetail"
          :key="index"
          :desc="obj.desc"
          :houseImg="obj.houseImg"
          :price="obj.price"
          :tags="obj.tags"
          :title="obj.title"
          @click.native="enterDetail(index)"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyFilterMore from './components/MyFilterMore.vue'
import MyHouseItem from '@/components/MyHouseItem'
import MySearch from '@/components/MySearch'
import { getHouseDetail } from '@/api/houses'
export default {
  name: 'Found',
  components: { MySearch, MyHouseItem, MyFilterMore },
  data() {
    return {
      active: 0,
      value: [],
      show: false,
      houseDetail: [],
      selectAll: [],
      loading: false,
      finished: false,
      start: 1,
      end: 20,
      queryCondition: {
        more: '',
        price: '',
        rentType: '',
        cityId: this.$store.state.City.value
      }
    }
  },
  mounted() {
    this.getHouseDetail({ cityId: this.$store.state.City.value })
  },
  computed: {
    ...mapState(['rentTypeArr']),
    ...mapState(['priceArr']),
    ...mapState(['columns']),
    ...mapState(['characteristic']),
    ...mapState(['floor']),
    ...mapState(['oriented']),
    ...mapState(['roomType'])
  },
  methods: {
    enterDetail(index) {
      const id = this.houseDetail[index].houseCode
      // console.log(id)
      this.$router.push(`/detail/${id}`)
    },
    getSelectValue() {
      this.houseDetail = []
      const val = this.$refs.f1.getValues()
      if (val[0].label === '区域') {
        if (val[2].text === '' || val[2].text === 'null' || val[2].text === '不限') {
          this.queryCondition.area = val[1].value
        } else {
          this.queryCondition.area = val[2].value
        }
      } else {
        if (val[2].text === '' || val[2].text === 'null') {
          this.queryCondition.subway = val[1].value
        } else {
          this.queryCondition.subway = val[2].value
        }
      }
      this.getHouseDetail(this.queryCondition)
      this.$refs.item.toggle()
    },
    getSelectRootType() {
      this.houseDetail = []
      const val = this.$refs.f1.getValues()
      if (val[0] === '整租') {
        this.queryCondition.rentType = 'true'
      } else {
        this.queryCondition.rentType = 'false'
      }
      this.getHouseDetail(this.queryCondition)
      this.$refs.item.toggle()
    },
    getSelectPrice() {
      this.houseDetail = []
      const val = this.$refs.f1.getValues()
      const obj = this.$store.state.price.find(item => item.label === val[0])
      // console.log(obj)
      this.queryCondition.price = obj.value
      this.getHouseDetail(this.queryCondition)
      this.$refs.item.toggle()
    },
    async getHouseDetail(obj) {
      try {
        const res = await getHouseDetail(obj)
        if (res.data.body.list <= 0) {
          this.finished = true
        }
        this.houseDetail.push(...res.data.body.list)
        this.loading = false
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
      this.$store.dispatch('setCondition')
    },
    clear() {
      this.$refs.a.$refs.dd.forEach(item => {
        item.classList.remove('a')
      })
      this.$refs.a1.$refs.dd.forEach(item => {
        item.classList.remove('a')
      })
      this.$refs.a2.$refs.dd.forEach(item => {
        item.classList.remove('a')
      })
      this.$refs.a3.$refs.dd.forEach(item => {
        item.classList.remove('a')
      })
      this.selectAll = []
    },
    collectAll() {
      const arr1 = this.$refs.a.selectAll
      // arr1.map(item=> {
      //   if(item === )
      // } )
      console.log(this.roomType)
      const arr2 = this.$refs.a1.selectAll
      const arr3 = this.$refs.a2.selectAll
      const arr4 = this.$refs.a3.selectAll
      this.selectAll = [...arr1, ...arr2, ...arr3, ...arr4]
      console.log(this.selectAll)
      console.log(this.characteristic)
      console.log(this.floor)
      console.log(this.oriented)
    },
    onLoad() {
      this.start = this.end + 1
      this.end = this.end + 20
      this.getHouseDetail({ cityId: this.$store.state.City.value, start: this.start, end: this.end })
    }
  }

}
</script>

<style lang="less" scoped>
@import url("@/styles/base.less");

.box {
  opacity: 0;
  position: absolute;
  background-color: pink;
  width: 50px;
  height: 30px;
  right: 10px;
  top: 60px;
}
.main {
  padding: 0 10px 30px;
}
.header {
  height: 50px;
  padding: 0 10px;
  background-color: #21b97a;
  /deep/ .search-box {
    top: 3%;
  }
  .van-icon {
    padding-top: 5px;
    padding-right: 15px;
    color: #fff;
  }
}
/deep/ .van-dropdown-item {
  .van-cell {
    padding: 0;
    .cancel {
      width: 125px;
      height: 50px;
      background-color: #fff;
      border: 1px solid #ccc;
      color: #21b97a;
      padding: 0;
    }
    .sure {
      width: 251px;
      height: 50px;
      color: #fff;
      background-color: #21b97a;
      padding: 0;
    }
    .van-picker__cancel,
    .van-picker__confirm {
      padding: 0;
    }
  }
}

.filterMore {
  overflow: auto;
  height: calc(100vh - 30px);
  padding: 0 15px;
}
.btn {
  position: fixed;
  z-index: 3333;
  bottom: 0;
  left: 0;
  .cancel {
    width: 100px;
    height: 50px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #21b97a;
    padding: 0;
  }
  .sure {
    width: 200px;
    height: 50px;
    color: #fff;
    background-color: #21b97a;
    padding: 0;
  }
}
</style>
