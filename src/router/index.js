import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import login from '@/views/login/login.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
