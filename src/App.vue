<template>
  <div id="app">
    <appHeader :appState="appState"></appHeader>
    <homepage v-if="appState == 'homepage' " @changeAppState="changeAppState"></homepage>
    <frisepage v-if="appState == 'frise' "></frisepage>
  </div>
</template>

<script>

import Homepage from './components/homepage.vue'
import AppHeader from './components/appHeader.vue'
import store from '@/store'
import { getData } from './import.js'
import Frisepage from './components/frisepage.vue'

export default {
  name: 'App',
  components: {
    Homepage,
    AppHeader,
    Frisepage
  },

  data(){
    return {
      appState:"homepage"
    }
  },

  computed: {
    dataImport() {
      return store.state.endImport
    },
  },

  watch:{
    dataImport:function(){
      
    }
  },

  methods:{
    changeAppState(state){
      this.appState = state
    }
  },
  
  created(){
    getData(store)
    if(window.location.pathname.includes('/frise')){
      this.changeAppState('frise')
    }
  }
}
</script>

<style lang="scss">

  @import "../css/variables.scss";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color:$deepBlue;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
</style>
