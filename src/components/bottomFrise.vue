<template>
    <div id="bottomFrise" v-if="myData" :class="appear?'appear':''">
        <div id="desktop_frise">
            <div class="frise_control control_left">
                <div class="frise_control_btn" @click="moveBack()" :class="(isFirst())?'disabled':''"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"><mask id="mask0_202_3653" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="13" y="10" width="24" height="24"><rect width="24" height="24" transform="matrix(-1 0 0 1 37 10)" fill="#D9D9D9"/></mask><g mask="url(#mask0_202_3653)"><path d="M21.0001 31.6537L30.6538 21.9999L21.0001 12.3462L19.5808 13.7654L27.8156 21.9999L19.5808 30.2344L21.0001 31.6537Z" fill="#005DA4"/></g></svg></div>
            </div>
            <div id="frise_event_wrapper" :style="getScrollerLeft()">
                <div class="placeholder past" v-for="pastIndex in 20" :style="getPastLeft(pastIndex)" :key="pastIndex+'past'"></div>
                <div class="frise_event" @click="jumpToEvent(event)" v-for="event,index in reverseOrderEvents" :key="event.id" :style="getStyle(index,event)" :class="getClass(event)" @mouseenter="hoverEvent=index" @mouseleave="hoverEvent=null" >
                    <div class="year">{{getYear(event)}}</div>
                    <div class="month">{{ getMonth(event) }}</div>
                    <div class="event_tooltip">
                        <span>{{event.datelabel.toUpperCase()}}</span>
                    </div>
                </div>
                <div class="placeholder futur" v-for="futurIndex in 20" :style="getFuturLeft(futurIndex)" :key="futurIndex+'futur'"></div>
            </div>
            <div class="frise_control control_right">
                <div class="frise_control_btn" @click="moveFwd()" :class="(isLast())?'disabled':''"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none"><mask id="mask0_202_3653" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="13" y="10" width="24" height="24"><rect width="24" height="24" transform="matrix(-1 0 0 1 37 10)" fill="#D9D9D9"/></mask><g mask="url(#mask0_202_3653)"><path d="M21.0001 31.6537L30.6538 21.9999L21.0001 12.3462L19.5808 13.7654L27.8156 21.9999L19.5808 30.2344L21.0001 31.6537Z" fill="#005DA4"/></g></svg></div>
            </div>
        </div>
        <div id="mobile_frise"><span>{{numberToMonth[parseInt(eventData.mois)-1][eventData.mois]}} {{eventData.annee}}</span></div>
    </div>
  </template>
  
  <script>
  import store from '@/store'
  
  export default {
    name: 'bottomFrise',
    data(){
      return {
        numberToMonth:[{"1":"Janvier"},{"2":"Février"},{"3":"Mars"},{"4":"Avril"},{"5":"Mai"},{"6":"Juin"},{"7":"Juillet"},{"8":"Août"},{"9":"Septembre"},{"10":"Octobre"},{"11":"Novembre"},{"12":"Décembre"}],
        skipIndex:0,
        appear:false,
        hoverEvent:null
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
      textStyle(){
        return this.$parent.textStyle
      }
    },
    methods: {

        getStyle(index,event){
            var left
            var currentIndex = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            var bg = "url('" + require('@/assets/img/event/'+event.id+'.png') + "') lightgray 50% / cover no-repeat"
            var blend = "normal"
            if(event.dataid==this.currentEventId||this.hoverEvent==index){

                switch(this.reverseOrderEvents[index].color_theme){
                    case 1:
                        bg = "linear-gradient(0deg, #B9348B 0%, #B9348B 100%), linear-gradient(0deg, rgba(185, 52, 139, 0.90) 0%, rgba(185, 52, 139, 0.90) 100%), url('" + require('@/assets/img/event/'+event.id+'.png') + "') lightgray 50% / cover no-repeat"
                        break;
                    case 2:
                        bg = "linear-gradient(0deg, rgba(210, 217, 42, 0.50) 0%, rgba(210, 217, 42, 0.50) 100%), linear-gradient(0deg, #D2D92A 0%, #D2D92A 100%), url('" + require('@/assets/img/event/'+event.id+'.png') + "') lightgray 50% / cover no-repeat"
                        break;
                    case 3:
                        bg = "linear-gradient(0deg, rgba(240, 125, 25, 0.50) 0%, rgba(240, 125, 25, 0.50) 100%), linear-gradient(0deg, #F07D19 0%, #F07D19 100%), url('" + require('@/assets/img/event/'+event.id+'.png') + "') lightgray 50% / cover no-repeat"
                        break;
                    case 4:
                        bg = "linear-gradient(0deg, rgba(253, 195, 0, 0.50) 0%, rgba(253, 195, 0, 0.50) 100%), linear-gradient(0deg, #FDC300 0%, #FDC300 100%), url('" + require('@/assets/img/event/'+event.id+'.png') + "') lightgray 50% / cover no-repeat"
                        break;  
                    case 5:
                        bg = "linear-gradient(0deg, rgba(210, 217, 42, 0.50) 0%, rgba(210, 217, 42, 0.50) 100%), linear-gradient(0deg, #D2D92A 0%, #D2D92A 100%), url('" + require('@/assets/img/event/'+event.id+'.png') + "') lightgray 50% / cover no-repeat"
                        break;
                    case 6:
                        bg = "linear-gradient(0deg, rgba(253, 195, 0, 0.50) 0%, rgba(253, 195, 0, 0.50) 100%), linear-gradient(0deg, #FDC300 0%, #FDC300 100%), url('" + require('@/assets/img/event/'+event.id+'.png') + "') lightgray 50% / cover no-repeat"
                        break;
                }
                blend = "color, screen, normal"

            }
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
                "background": bg,
                "backgroundBlendMode": blend
            }
        },
        getClass(event){

            var classes = ""
            if(event.dataid == this.currentEventId){
                classes = "current"
            }
            var index = this.myData.findIndex(x => x.dataid === event.dataid)
            classes += " style"+this.myData[index].color_theme
            return classes
        },
        getPastLeft(index){
            var prev = this.reverseOrderEvents.length-1
            var left ="-"+(index+prev)*104-20+"px"
            return{
                "marginLeft":left
            }
        },

        getFuturLeft(index){
            var left =(index*100+14)+"px"
            return{
                "marginLeft":left
            }
        },

        getScrollerLeft(){
            var index = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            index = index + (this.skipIndex*5)
            if(index < 0){ index = 0}
            if(index > this.reverseOrderEvents.length){ index = this.reverseOrderEvents.length}
            return{
                "marginLeft":(index*104)+"px"
            }
        },

        moveBack(){
            var index = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            index = index + (this.skipIndex*5)
            if(index < this.reverseOrderEvents.length){ this.skipIndex++}
            
        },

        moveFwd(){
            var index = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            index = index + (this.skipIndex*5)
            if(index > 0){ this.skipIndex--}
        },
        

        jumpToEvent(event){
            this.$parent.jumpToEvent(event)
        },

        isLast(){
            var index = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            index = index + (this.skipIndex*5)
            if(index > 0){ return false }else { return true }
        },
        isFirst(){
            var index = this.reverseOrderEvents.findIndex(x => x.dataid === this.currentEventId)
            index = index + (this.skipIndex*5)
            if(index < this.reverseOrderEvents.length){ return false }else { return true }
        },

        getYear(event){
            var currentIndex = this.reverseOrderEvents.findIndex(x => x.dataid === event.dataid)
            var previousEvent =  currentIndex+1 < this.reverseOrderEvents.length ? this.reverseOrderEvents[currentIndex + 1] : null
            if(previousEvent && event.annee == previousEvent.annee){
                return ""
            }else{
                return event.annee
            }
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
        currentEventId:function(){
            this.skipIndex = 0
        }
    },
  
    created(){
     
    },

    mounted:function(){
      var self = this
      setTimeout(function(){
        self.appear = true  
      },500)
    }
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
    /* overload fonts path, to delete when parent has access */
    @import "../../css/overload-fonts.css";
    @import "../../css/variables.scss";

    #bottomFrise{
        position: absolute;
        bottom: -145px;
        left: 0;
        width: 100%;
        height: 118px;
        background-color: $nightBlue;
        transition: bottom 0.5s ease-in-out;
        &.appear{
            bottom: 0;
        }
        #desktop_frise{
            display: block;
        }
        #mobile_frise{
            display: none;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            height: 100%;
            span{
                color: white;
                text-align: center;
                font-family: "Figtree-Bold";
                font-size: 18px;
                text-transform: uppercase;
            }
        }
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
                box-sizing: border-box;
                transition: width 0.5s ease-in-out, height 0.5s ease-in-out, margin-top 0.5s ease-in-out;
                margin-top: -6px;
                cursor: pointer;
                border-radius: 3px;
                &.current{
                    width: 120px;
                    height: 120px;
                    margin-top:-25px;
                    pointer-events: none;
                    .year{
                        display: none;
                    }
                    .month{
                        display: none;
                    }
                    .event_tooltip{
                        display: none;
                    }
                    &:after{
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0.5;
                        display: none;
                    }
                }
                &.style1{
                    &:after{
                        background-color: $fushia;
                    }
                }
                &.style2{
                    &:after{
                        background-color: $springGreen;
                    }
                }
                &.style3{
                    &:after{
                        background-color: $orange;
                    }
                }
                &.style4{
                    &:after{
                        background-color: $yellow;
                    }
                }
                &.style5{
                    &:after{
                        background-color: $springGreen;
                    }
                }
                &.style6{
                    &:after{
                        background-color: $yellow;
                    }
                }
                .year{
                    font-size: 14px;
                    color: white;
                    text-transform: uppercase;
                    position: absolute;
                    text-align: left;
                    width: auto;
                    left:-30px;
                    top:10px;
                    font-family:"Figtree-Bold";
                    transform: rotate(-90deg);
                    
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
                .event_tooltip{
                    position: absolute;
                    top: -39px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: auto;
                    background-color: white;
                    color:$deepBlue;
                    font-family:"Figtree-Bold";
                    font-size: 14px;
                    text-transform: uppercase;
                    text-align: center;
                    padding:8px 8px 10px 8px;
                    border-radius: 4px;
                    white-space: nowrap;
                    opacity: 0;
                    transition: all 0.2s ease-in-out;
                    &:after{
                        content: '';
                        position: absolute;
                        left: 42%;
                        top: 100%;
                        width: 0;
                        height: 0;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 10px solid white;
                        clear: both;
                    }
                }
                &:hover{
                    &:after{
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0.5;
                        display: none;
                    }
                    .event_tooltip{
                        top: -49px;
                        opacity: 1;
                    }
                    &.current{
                        .event_tooltip{
                            opacity: 0;
                        }
                    }
                    &.style1{
                        &:after{
                            background-color: $fushia;
                        }
                    }
                    &.style2{
                        &:after{
                            background-color: $springGreen;
                        }
                    }
                    &.style3{
                        &:after{
                            background-color: $orange;
                        }
                    }
                    &.style4{
                        &:after{
                            background-color: $yellow;
                        }
                    }
                    &.style5{
                        &:after{
                            background-color: $springGreen;
                        }
                    }
                    &.style6{
                        &:after{
                            background-color: $yellow;
                        }
                    }
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
                margin-top: -7px;
            }
        }
        .frise_control{
            position: absolute;
            width: 60px;
            height: 118px;
            top:0;
            z-index: 100;
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
                    pointer-events: none;
                }
            }
        }
    }
   
    @media (max-width: 1149px) {
       
    }

    @media (max-width: 979px) {

        #bottomFrise{
        bottom: -68px;
        height: 68px;
            #desktop_frise{
                display: none;
            }
            #mobile_frise{
                display: flex;
            }
        }
          
    }

    </style>
  