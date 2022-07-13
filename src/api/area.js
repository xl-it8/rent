import request from '@/utils/request'

// 获取城市列表
export const getCityList = (params) => request({
  url: '/area/city',
  params
})

// 获取热门城市
export const getHotCity = () => request({
  url: '/area/hot'
})

// 获取子城市列表
export const getSubCity = (params) => request({
  url: '/area',
  params
})

// 查看房源数据

// 获取小区关键词
export const getCommunityKeys = (params) => request({
  url: '/area/community',
  params
})

// 查询房源数据
export const checkHouseData = (params) => request({
  url: '/area/map',
  params
})
