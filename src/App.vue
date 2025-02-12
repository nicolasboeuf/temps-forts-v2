<template>
  <div id="app" :class="appear||appState == 'frise'?'appear':''">
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
      appState:"homepage",
      appear:false
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
  },

  mounted:function(){
    var self = this
    setTimeout(function(){
      self.appear = true  
    },500)
  },
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
    overflow:hidden;
    #appHeader{
      top:-120px!important;
      opacity: 0!important;
    }
    #homepage{
      #homepageContainer{
        top:0px!important;
        opacity: 0!important;
      }
    }
    &.appear{
      #appHeader{
        top:0!important;
        opacity: 1!important;
      }
      #homepage{
        #homepageContainer{
          top:190px!important;
          opacity: 1!important;
        }
      }
    }
  }

  @media (max-width: 979px) {
    #app{
      overflow:hidden;
    }
  }
  
</style>
