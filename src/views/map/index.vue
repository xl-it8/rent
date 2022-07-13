<template>
  <div>
    <MyHeader name="地图找房" />
    <div id="container"></div>
  </div>
</template>

<script>
import { checkHouseData } from '@/api/area'
import { getHouseDetail } from '@/api/houses'
import MyHeader from '@/components/MyHeader'
export default {
  data() {
    return {
      cityList: []
    }
  },
  async mounted() {
    await this.checkHouseData(this.$store.state.City.value)
    const { BMapGL } = window
    const myCity = new BMapGL.LocalCity()// 获取当前电脑所在的城市
    myCity.get((result) => {
      // console.log(result)// 北京
      const map = new BMapGL.Map('container')
      map.enableScrollWheelZoom(true)
      const scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
      map.addControl(scaleCtrl)
      const zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
      map.addControl(zoomCtrl)
      const point = new BMapGL.Point(result.center.lng, result.center.lat)// 绘制地图
      map.centerAndZoom(point, 8)// 根据某城市的中心点绘制图 15是缩放级别

      this.$nextTick(() => {
        // eslint-disable-next-line prefer-const
        let index = 0
        const showMap = () => {
          const label = []
          this.cityList.forEach((item, index) => {
            // console.log(item) //城市信息
            // 每个区在区的中心点画一个标记
            const point1 = new BMapGL.Point(item.coord.longitude, item.coord.latitude)// 经纬度在接口中通过城市名字获取
            const content = `<div>
          <p>${item.label}</p>
          <span>${item.count}</span>
          </div>`
            label[index] = new BMapGL.Label(content, { // 创建文本标注
              position: point1,
              offset: new BMapGL.Size(10, 20)
            })
            // console.log(label[index])
            map.addOverlay(label[index]) // 将标注添加到地图中
            label[index].setStyle({ // 设置label的样式
              color: '#fff',
              fontSize: '14px',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: 'green',
              textAlign: 'center'
            })

            label[index].addEventListener('click', async () => {
              index = index + 1
              map.centerAndZoom(point1, 18)
              await this.checkHouseData(item.value)
              if (index <= 2) {
                console.log(
                  index
                )
                showMap()
              } else {
                const res = await getHouseDetail(item.value)
                console.log(res)
              }
            })
          }, 2000)
        }
        showMap()
      })
    })
  },
  components: { MyHeader },
  methods: {
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
* {
  margin: 0;
  padding: 0;
}
#container {
  width: 100vw;
  height: 100vh;
}
// .a {
//   color: #ccc;
//   font-size: 44px;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: pink;
//   text-align: center;
//   line-height: 40px;
// }
</style>
