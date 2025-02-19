<template>
  <div id="homepage" :class="exit?'exit':''">
    <div id="homepageContainer" >
      <div id="homepageTitle"><span>Découvrez<br>nos Temps Forts</span></div>
      <div id="homepageButton" @click="changeAppState('frise')">Explorer</div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Homepage',
  data(){
    return {
      exit:false
    }
  },
  props: {
  },
  computed: {
    myData(){
      return store.state.myData
    }
  },
  methods: {
    changeAppState(state){
      var self = this
      this.$parent.exitingHome = true
      setTimeout(() => {
        self.$emit('changeAppState', state)
        if (window.location.pathname !== '/') {
          const baseUrl = window.location.pathname.split('/')[1]
          window.history.pushState({}, '', `/${baseUrl}/frise`) 
        } else {
          window.history.pushState({}, '', '/frise')
        }
        self.$parent.exitingHome = false
      }, 1000)
    }
  },

  watch:{
  },

  created(){
    console.log("homepage created")
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  /* overload fonts path, to delete when parent has access */
  @import "../../css/overload-fonts.css";
  @import "../../css/variables.scss";
  #homepage{
    background-color:$deepBlue;
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    bottom: 0;
    #homepageContainer{
      position: absolute;
      top: 190px;
      left: 50%;
      transform: translate(-50%, 0);
      display: block;
      transition: all 0.8s ease-in-out;
      transition-delay: 0.3s;
      #homepageTitle{
        font-family: Montserrat-ExtraBold;
        font-size: 45px;
        color: white;
        display: block;
        margin-bottom: 16px;
        position: relative;
        span{
          background-color: $tropicalBlue;
          padding: 8px 16px;
          display: inline;
          box-decoration-break: clone;
          line-height: 80px;
        }
      }
      #homepageButton{
        font-family:Figtree-Bold;
        font-size:18px;
        color:#2d2b2c;
        padding: 13px 40px 15px 40px;
        background-color: $yellow;
        display: inline-block;
        border-radius: 40px;
        position: relative;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
</style>
