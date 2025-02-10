<template>
    <div id="bottomFrise" v-if="myData">
        <div class="frise_control control_left">
            <div class="frise_control_btn" :class="(isFirst())?'disabled':''" @click="callPrevEvent"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"><mask id="mask0_202_3653" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="13" y="10" width="24" height="24"><rect width="24" height="24" transform="matrix(-1 0 0 1 37 10)" fill="#D9D9D9"/></mask><g mask="url(#mask0_202_3653)"><path d="M21.0001 31.6537L30.6538 21.9999L21.0001 12.3462L19.5808 13.7654L27.8156 21.9999L19.5808 30.2344L21.0001 31.6537Z" fill="#005DA4"/></g></svg></div>
        </div>
        <div id="frise_event_wrapper" :style="getScrollerLeft()">
            <div class="placeholder past" v-for="pastIndex in 20" :style="getPastLeft(pastIndex)" :key="pastIndex+'past'"></div>
            <div class="frise_event" v-for="event,index in reverseOrderEvents" :key="event.id" :style="getStyle(index,event)" :class="{'current':event.dataid == currentEventId}" >
                <div class="year">{{getYear(event)}}</div>
                <div class="month">{{ getMonth(event) }}</div>
            </div>
            <div class="placeholder futur" v-for="futurIndex in 20" :style="getFuturLeft(futurIndex)" :key="futurIndex+'futur'"></div>
        </div>
        <div class="frise_control control_right">
            <div class="frise_control_btn" :class="(isLast())?'disabled':''" @click="callNextEvent"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"><mask id="mask0_202_3653" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="13" y="10" width="24" height="24"><rect width="24" height="24" transform="matrix(-1 0 0 1 37 10)" fill="#D9D9D9"/></mask><g mask="url(#mask0_202_3653)"><path d="M21.0001 31.6537L30.6538 21.9999L21.0001 12.3462L19.5808 13.7654L27.8156 21.9999L19.5808 30.2344L21.0001 31.6537Z" fill="#005DA4"/></g></svg></div>
        </div>
        
    </div>
  </template>
  
  <script>
  import store from '@/store'
  
  export default {
    name: 'bottomFrise',
    data(){
      return {
        numberToMonth:[{"1":"Janvier"},{"2":"Février"},{"3":"Mars"},{"4":"Avril"},{"5":"Mai"},{"6":"Juin"},{"7":"Juillet"},{"8":"Août"},{"9":"Septembre"},{"10":"Octobre"},{"11":"Novembre"},{"12":"Décembre"}]
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
      },
      eventData(){
        return this.myData.find(event => event.dataid == this.currentEventId)
      },
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
        },

        callNextEvent(){
            this.$parent.nextEvent()
        },

        callPrevEvent(){
            this.$parent.prevEvent()
        },

        isLast(){
            return this.myData.indexOf(this.eventData) == this.myData.length - 1
        },
        isFirst(){
            return this.myData.indexOf(this.eventData) == 0
        },

        getYear(event){
            return event.annee
        },

        getMonth(event){

            var currentIndex = this.reverseOrderEvents.findIndex(x => x.dataid === event.dataid)
            var previousEvent =  currentIndex+1 < this.reverseOrderEvents.length ? this.reverseOrderEvents[currentIndex + 1] : null
            var month = ""
            var monthNumber = event.mois
            
            var monthObj = this.numberToMonth.find(obj => Object.keys(obj)[0] === monthNumber)
            if (previousEvent && event.mois == previousEvent.mois) {
                month = "·"
            }else{
                month = monthObj[monthNumber]
            }
            return month
        },
        
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
        background-color: $nightBlue;
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
                margin-top: -6px;
                &.current{
                    width: 120px;
                    height: 120px;
                    margin-top:-25px;
                }
                .year{
                    font-size: 14px;
                    color: white;
                    text-transform: uppercase;
                    opacity: 0.5;
                    display: none;
                }
                .month{
                    font-size: 14px;
                    color: white;
                    text-transform: uppercase;
                    opacity: 0.5;
                    position: absolute;
                    bottom: -20px;
                    left: 0;
                    text-align: center;
                    width: 100%;
                    font-family:"Figtree-Bold"
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
        .frise_control{
            position: absolute;
            width: 60px;
            height: 118px;
            top:0;
            z-index: 1000;
            background-color:$nightBlue;
            &.control_right{
                right:0;
                .frise_control_btn{
                    right:0;
                    &:hover{
                        svg{
                            transform:translate(3px,0);       
                        }
                    }
                }
                
            }
            &.control_left{
                left:0;
                .frise_control_btn{
                    left:0;
                    svg{
                        transform: rotate(180deg);
                    }
                    &:hover{
                        svg{
                            transform:translate(-3px,0) rotate(180deg);       
                        }
                    }
                }
            }
            .frise_control_btn{
                width: 44px;
                height: 44px;
                background-color: white;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                cursor: pointer;
                svg{
                    transition: all 0.2s ease-in-out;
                    position: absolute;
                    left:0;
                    top:0;
                }
                &.disabled{
                    opacity: 0.2;
                    cursor: not-allowed;
                }
            }
        }
    }
   
    @media (max-width: 1149px) {
       
    }

    @media (max-width: 979px) {
          
    }

    </style>
  