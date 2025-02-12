<template>
    <div id="appHeader" :class="{'homepage':appState == 'homepage'}">
      <div>
        <a href="https://www.assurance-prevention.fr/" target="_blank"><img src="@/assets/logo-ap.png" alt="logo"></a>
        <h1 @click="callChangeAppState('homepage')">Nos temps forts</h1>
      </div>
    </div>
  </template>
  
  <script>
  import store from '@/store'
  
  export default {
    name: 'AppHeader',
    data(){
      return {
      }
    },
    props: {
        appState:String
    },
    computed: {
      myData(){
        return store.state.myData
      }
    },
    methods: {
      callChangeAppState(state){
        this.$parent.changeAppState(state)
        window.history.pushState({}, '', '/')
      }
    },
  
    watch:{
    },
  
    created(){
      console.log("appHeader created")
    }
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
    /* overload fonts path, to delete when parent has access */
    @import "../../css/overload-fonts.css";
    @import "../../css/variables.scss";

    #appHeader{
        background-color:white;
        width: 100%;
        height: 100px;
        position: relative;
        top:0;
        text-align: center;
        img{
            position: absolute;
            left:30px;
            top:50%;
            transform: translate(0, -50%);
            width: 220px;
            height: auto;
        }
        h1{
            display: block;
            color:$deepBlue;
            font-size: 30px;
            font-weight: 700;
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%, -50%);
            font-family: "Figtree-Bold";
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
        }
        &.homepage{
            height: 120px;
            h1{
                display: none;
            }
            img{
                width: 260px;
            }
        }
    }

    @media (max-width: 1149px) {
        #appHeader{
            h1{
               left:auto;
               right: 30px; 
               transform: translate(0, -50%);
            }
        }
    }

    @media (max-width: 979px) {
        #appHeader{
          height: 60px;
          &.homepage{
            height: 100px;
          }
          h1{
              display: none;
          }
          img{
            left:auto;
            right: 12px;
            width: 144px;
            
          }
        }
    }
  
  
  </style>
  