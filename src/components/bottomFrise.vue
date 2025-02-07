<template>
    <div id="bottomFrise" v-if="myData">
        <div id="frise_event_wrapper" :style="getScrollerLeft()">
            <div class="placeholder past" v-for="pastIndex in 20" :style="getPastLeft(pastIndex)" :key="pastIndex+'past'"></div>
            <div class="frise_event" v-for="event,index in reverseOrderEvents" :key="event.id" :style="getStyle(index,event)" :class="{'current':event.dataid == currentEventId}" >
                
            </div>
            <div class="placeholder futur" v-for="futurIndex in 20" :style="getFuturLeft(futurIndex)" :key="futurIndex+'futur'"></div>
        </div>
    </div>
  </template>
  
  <script>
  import store from '@/store'
  
  export default {
    name: 'bottomFrise',
    data(){
      return {

      }
    },
    props: {
    },
    computed: {
      myData(){
        return store.state.myData
      },
      dataImport(){
        return store.state.endImport
      },
      reverseOrderEvents(){
        return [...this.myData].reverse()
      },
      currentEventId(){
        return store.state.currentEventId
      }
    },
    methods: {

        getStyle(index,event){
            var left
            var currentIndex = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            if(event.dataid==this.currentEventId){
                left = "-"+index*104+"px"
                if(index == 0){
                    left = "-5px"
                }
            }else if(index > currentIndex){
                left = "-"+(index*104+20)+"px"
            }else if(index < currentIndex){
                left = "-"+(index*104-20)+"px"
                if(index == 0){
                    left = "16px"
                }
                console.log(index,left)
            }
            return{
                "marginLeft":left,
                "backgroundImage": "url(" + require('@/assets/img/event/'+event.id+'.png') + ')'
            }
        },

        getPastLeft(index){
            var prev = this.reverseOrderEvents.length-1
            var left ="-"+(index+prev)*104+"px"
            return{
                "marginLeft":left
            }
        },

        getFuturLeft(index){
            var left =(index*104+10)+"px"
            return{
                "marginLeft":left
            }
        },

        getScrollerLeft(){
            var index = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            return{
                "marginLeft":(index*124)+"px"
            }
        }

        
        
    },
  
    watch:{
       
    },
  
    created(){
     
    }
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
    /* overload fonts path, to delete when parent has access */
    @import "../../css/overload-fonts.css";
    @import "../../css/variables.scss";

    #bottomFrise{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 118px;
        background-color: $deepBlue;
        #frise_event_wrapper{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.5s ease-in-out;
            .frise_event{
                width: 80px;
                height: 80px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-size: cover;
                background-repeat: no-repeat;
                border: 1px solid white;
                box-sizing: border-box;
                transition: all 0.5s ease-in-out;
                &.current{
                    width: 120px;
                    height: 120px;
                    margin-top:-25px;
                }
            }
            .placeholder{
                width: 80px;
                height: 80px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                opacity: 0.1;
            }
        }
    }
   
    @media (max-width: 1149px) {
       
    }

    @media (max-width: 979px) {
          
    }

    </style>
  