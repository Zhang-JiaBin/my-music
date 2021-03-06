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
      component: () => import('../views/Recommend.vue'),
      children: [{
        path: 'rank/:id',
        component: () => import('../components/Rank/rankDetail.vue')
      }, {
        path: 'sheet/:id',
        component: () => import('../components/sheet/SongSheetDetail.vue')
      }, {
        path: 'singer/:id',
        component: () => import('../components/singer/singerDetail.vue')
      }]
    }, {
      path: 'rank',
      name: 'rank',
      component: () => import('../views/Rank.vue'),
      children: [{
        path: ':id',
        component: () => import('../components/Rank/rankDetail.vue')
      }, {
        path: 'singer/:id',
        component: () => import('../components/singer/singerDetail.vue')
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
      }, {
        path: 'singer/:id',
        component: () => import('../components/singer/singerDetail.vue')
      }]
    }, {
      path: 'search',
      name: 'search',
      component: () => import('../views/search.vue'),
      children: [{
        path: 'singer/:id',
        component: () => import('../components/singer/singerDetail.vue')
      }]
    }, {
      path: 'user',
      name: 'user',
      component: () => import('../views/user.vue'),
      children: [{
        path: 'history',
        component: () => import('../components/user/playhistory.vue')
      }, {
        path: 'like',
        component: () => import('../components/user/userMylike.vue')
      }, {
        path: 'collection',
        component: () => import('../components/user/collection.vue')
      }, {
        path: 'manage',
        component: () => import('../components/user/SheetManage.vue')
      }, {
        path: 'singer/:id',
        component: () => import('../components/singer/singerDetail.vue')
      }, {
        path: 'sheet/:id',
        component: () => import('../components/sheet/SongSheetDetail.vue')
      }, {
        path: 'rank/:id',
        component: () => import('../components/Rank/rankDetail.vue')
      }, {
        path: 'mysheet/:id',
        component: () => import('../components/user/mySheetDetail.vue')
      }]
    }]
  }]
})
