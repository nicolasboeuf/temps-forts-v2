<template>
  <div id="app">
    <appHeader :appState="appState"></appHeader>
    <homepage v-if="appState == 'homepage'"></homepage>
  </div>
</template>

<script>

import Homepage from './components/homepage.vue'
import AppHeader from './components/appHeader.vue'
import store from '@/store'
import { getData } from './import.js'

export default {
  name: 'App',
  components: {
    Homepage,
    AppHeader
  },

  data(){
    return {
      appState:"coucou"
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
  
  created(){
    getData(store)
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
