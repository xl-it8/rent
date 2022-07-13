import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'found',
        component: () => import('@/views/found')
      },
      {
        path: 'news',
        component: () => import('@/views/news')
      },
      {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  },
  {
    path: '/rent',
    component: () => import('@/views/rent')
  },
  {
    path: '/publish',
    component: () => import('@/views/publish')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/detail')
  },
  {
    path: '/map',
    component: () => import('@/views/map')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    component: () => import('@/views/register')
  },
  {
    path: '/favorite',
    component: () => import('@/views/favorite')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
