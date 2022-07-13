import request from '@/utils/request'

// 发布图片
export const putImage = (data) => request({
  method: 'POST',
  url: 'houses/image',
  data
})

// 发布房源所需要的条件
export const getHouseCondition = () => request({
  url: '/houses/params'
})

// 获取房屋查询条件
export const getHouseInfo = (params) => request({
  url: '/houses/condition',
  params
})

// 根据条件查询房屋
export const getHouseDetail = (params) => request({
  url: '/houses',
  params
})

// 查询房屋具体信息
export const houseDetailInfo = (id) => request({
  url: `/houses/${id}`
})
