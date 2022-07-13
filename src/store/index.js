import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { setItem, getItem } from './token'
import { getHouseInfo } from '@/api/houses'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('token') || {},
    City: getItem('City') || {},
    rentTypeArr: [],
    priceArr: [],
    columns: [],
    characteristic: [],
    floor: [],
    roomType: [],
    oriented: [],
    price: []
  },
  getters: {
  },
  mutations: {
    saveUser(state, payLoad) {
      state.user = payLoad
      setItem('token', payLoad)
    },
    saveCityId(state, payLoad) {
      router.push('/home')
      state.City = payLoad
      setItem('City', payLoad)
    },
    SETCONDITION(state, payLoad) {
      console.log(payLoad)
      state.characteristic = payLoad.characteristic
      state.floor = payLoad.floor
      state.roomType = payLoad.roomType
      state.oriented = payLoad.oriented
      // 整租
      state.rentTypeArr = payLoad.rentType.map(item => item.label)
      // 价格
      state.priceArr = payLoad.price.map(item => item.label)
      state.price = payLoad.price
      // 处理area
      handleObj(payLoad.area)
      handleObj(payLoad.subway)
      function handleObj(data) {
        data.text = data.label
        if (data.children) {
          data.children.forEach(item => handleObj(item))
        } else {
          data.children = [{ text: '' }]
        }
      }
      state.columns = [payLoad.area, payLoad.subway]
      // console.log(state.columns)
    }
  },
  actions: {
    async setCondition(context) {
      try {
        const res = await getHouseInfo({ id: context.state.City.value })
        context.commit('SETCONDITION', res.data.body)
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
