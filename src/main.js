import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './rem'
import './assets/style/scss/icon.css'
import './assets/style/scss/global.scss'
import VueLazyload from 'vue-lazyload'
import './utils/create-api'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./assets/image/music.png')
})
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
