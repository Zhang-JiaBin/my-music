import Vue from 'vue'
import Vuex from 'vuex'
import singer from './modules/singer'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    singer
  },
  getters,
  actions
})
