<template>
  <div id="app" :class="[appear||appState == 'frise'?'appear':'', exitingHome?'exitinghome':'']">
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
import Vue from 'vue'
import VueMeta from 'vue-meta'
Vue.use(VueMeta)

export default {
  name: 'App',
  metaInfo: {
    title: 'Nos Temps Forts',
    meta: [
      {
        name: 'description',
        content: 'Explorez les temps forts d\'Assurance Prévention au fil des mois #Route #Maison #Santé #Loisirs #Prévention'
      },
      {
        name: 'keywords',
        content: 'assurance, prevention'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'language',
        content: 'French'
      },
      {
        property: 'og:title',
        content: 'Nos Temps Forts'
      },
      {
        property: 'og:image',
        content: 'https://nicolasboeuf.fr/temps-forts-v2/img/share.png'
      },
      {
        property: 'og:description',
        content: 'Explorez les temps forts d\'Assurance Prévention au fil des mois #Route #Maison #Santé #Loisirs #Prévention'
      }
    ],
    link: [
      {
        rel:'icon',
        href:'https://www.assurance-prevention.fr/wp-content/themes/webqam/assets/favicons/favicon.ico'
      }
    ]
  },
  components: {
    Homepage,
    AppHeader,
    Frisepage
  },

  data(){
    return {
      appState:"homepage",
      appear:false,
      exitingHome:false
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
    },
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
        top:50px!important;
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
    &.exitinghome{
      #homepage{
        #homepageContainer{
          opacity: 0!important;
        }
      }
      #appHeader{
        top:-120px!important;
      }
    }
  }

  @media (max-width: 979px) {
    #app{
      overflow:hidden;
      #homepage{
        #homepageContainer{
          top:-50px!important;
        }
      }
      &.appear{
        #homepage{
          #homepageContainer{
            top:20px!important;
          }
        }
      }
    }
  }
  
</style>

<!-- 
<meta property="og:title" content="Nos Temps Forts"><meta property="og:image" content="https://nicolasboeuf.fr/temps-forts-v2/img/share.png"><meta property="og:description" content="Explorez les temps forts d'Assurance Prévention au fil des mois #Route #Maison #Santé #Loisirs #Prévention"><title>Nos Temps Forts</title>

-->