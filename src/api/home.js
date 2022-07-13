import request from '@/utils/request'
// 获取轮播图图片
export const getSwiperPic = () => request({
  url: '/home/swiper'
})

//获取租房小组
export const getGroups = (params) => request({
  url: '/home/groups',
  params
})
