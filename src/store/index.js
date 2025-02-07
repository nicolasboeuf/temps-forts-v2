import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myData:undefined,
    endImport:false,
    currentEventId:null
  },
  mutations: {
    initializeData (state,data) {
      state.myData = data
    },
    endImport(state,value){
      state.endImport = value
    },
    setCurrentEventId(state,value){
      state.currentEventId = value
    }
  }
})
