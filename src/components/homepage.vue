<template>
  <div id="homepage">
    <div id="homepageContainer">
      <div id="homepageTitle"><span>Découvrez</span><br><span>nos temps forts</span></div>
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
      this.$emit('changeAppState', state)
      window.history.pushState({}, '', '/frise')
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
      #homepageTitle{
        font-family: Montserrat-ExtraBold;
        font-size: 45px;
        color: white;
        display: block;
        margin-bottom: 8px;
        position: relative;
        span{
          background-color: $tropicalBlue;
          padding: 8px 16px;
          margin-bottom: 8px;
          display: inline-block;
        }
      }
      #homepageButton{
        font-family:Figtree-Bold;
        font-size:18px;
        color:black;
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
