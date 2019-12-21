import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    redirect: '/home/recommend',
    component: () => import('../views/Home.vue'),
    children: [{
      path: 'recommend',
      name: 'recommend',
      component: () => import('../views/Recommend.vue')
      // children: [{
      //   path: ':id',
      //   component: () => import('../components/sheet/SongSheetDetail.vue')
      // }]
    }, {
      path: 'rank',
      name: 'rank',
      component: () => import('../views/Rank.vue'),
      children: [{
        path: ':id',
        component: () => import('../components/Rank/rankDetail.vue')
      }]
    }, {
      path: 'singer',
      name: 'singer',
      component: () => import('../views/Singer.vue'),
      children: [{
        path: ':id',
        component: () => import('../components/singer/singerDetail.vue')
      }]
    }, {
      path: 'sheet',
      name: 'sheet',
      component: () => import('../views/Sheet.vue'),
      children: [{
        path: ':id',
        component: () => import('../components/sheet/SongSheetDetail.vue')
      }]
    }]
  }]
})
