import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import login from '@/views/login/login.vue'
import search from '@/views/search/search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/layout/layout.vue'),
    children: [
      { path: '', name: 'name', component: () => import('../views/home/home.vue') },
      { path: 'question', name: 'question', component: () => import('../views/question/question.vue') },
      { path: 'setting', name: 'setting', component: () => import('../views/setting/setting.vue') },
      { path: 'video', name: 'video', component: () => import('../views/video/video.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/search',
    name: 'search',
    component: search
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search/result',
    name: 'result',
    component: () => import('../views/search/result.vue')
  },
  {
    path: '/article/:id', // 动态路由
    name: 'article',
    component: () => import('../views/article/article.vue')
  },
  {
    path: '/setting/profile', // 动态路由
    name: 'article',
    component: () => import('../views/setting/profile.vue')
  }

]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
