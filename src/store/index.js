import Vue from 'vue'
import Vuex from 'vuex'

//import sticky notes store as module
import notes from './modules/notes/notes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notes
  },
  state: {

  },
  mutations: {
  },
  actions: {
  },
})
