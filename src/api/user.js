import request from '@/utils/request'
// 登录
export const login = (data) => request({
  url: '/user/login',
  data,
  method: 'POST'
})
// 注册
export const register = (data) => request({
  url: '/user/registered',
  data,
  method: 'POST'
})

// 获取用户信息
export const getUserInfo = () => request({
  url: '/user'
})

// 查看已发布房源 或发布房源
export const PublishHouseInfo = (data) => request({
  method: 'POST',
  url: '/user/houses',
  data
})

// 查看已发布房源
export const PublishedHouseInfo = () => request({
  url: '/user/houses'

})

// 查看收藏列表
export const getFavorite = () => request({
  url: '/user/favorites'
})

// 添加收藏列表
export const addFavorite = (id) => request({
  url: `/user/favorites/${id}`,
  method: 'POST'
})

// 删除收藏列表
export const delFavorite = (id) => request({
  url: `/user/favorites/${id}`,
  method: 'DELETE'
})

// 查看是否收藏列表
export const isFavorite = (id) => request({
  url: `/user/favorites/${id}`
})
