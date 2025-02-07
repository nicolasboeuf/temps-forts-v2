<template>
    <div id="frisepage" v-if="myData">
      <div class="nav_btn nav_btn_prev" :class="(isFirst())?'disabled':''" @click="prevEvent"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><mask id="mask0_33_377" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40"><rect width="40" height="40" fill="#D9D9D9"/></mask><g mask="url(#mask0_33_377)"><path d="M11.4933 21.0471L21.4829 31.0254L20 32.5L7.5 20L20 7.5L21.4829 8.97458L11.4933 18.9529H32.5V21.0471H11.4933Z" fill="white"/></g></svg></div>
      <div id="event_container" :class="{'prev_animation': prevAnimation, 'next_animation': nextAnimation, 'is_hidden_prev': isHiddenPrev, 'is_hidden_next': isHiddenNext}">
        <div id="event_date">{{ eventData.datelabel }}</div>
        <div id="event_image_container">
            <div id="event_image" :style="{ backgroundImage: 'url(' + require('@/assets/img/event/'+eventData.id+'.png') + ')' }"></div>
            <div id="event_title">
                <div v-for="(part, index) in eventData.titre.match(getRegex())" :key="index">
                <span v-html="part.trim()"></span><br>
                </div>
            </div>
            <div id="event_buttons">
                <a class="event_button" v-if="eventData.bouton1_texte" :href="eventData.bouton1_url">
                    <img :src="getIcon(eventData.bouton1_type)">
                    {{ eventData.bouton1_texte }} 
                </a>
                <a class="event_button" v-if="eventData.bouton2_texte" :href="eventData.bouton2_url">
                    <img :src="getIcon(eventData.bouton2_type)">
                    {{ eventData.bouton2_texte }} 
                </a>
                <a class="event_button" v-if="eventData.bouton3_texte" :href="eventData.bouton3_url">
                    <img :src="getIcon(eventData.bouton3_type)">
                    {{ eventData.bouton3_texte }} 
                </a>
                <a class="event_button" v-if="eventData.bouton4_texte" :href="eventData.bouton4_url">
                    <img :src="getIcon(eventData.bouton4_type)">
                    {{ eventData.bouton4_texte }} 
                </a>
            </div>
        </div>
      </div>
      <div class="nav_btn nav_btn_next" :class="(isLast())?'disabled':''" @click="nextEvent"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><mask id="mask0_33_377" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40"><rect width="40" height="40" fill="#D9D9D9"/></mask><g mask="url(#mask0_33_377)"><path d="M11.4933 21.0471L21.4829 31.0254L20 32.5L7.5 20L20 7.5L21.4829 8.97458L11.4933 18.9529H32.5V21.0471H11.4933Z" fill="white"/></g></svg></div>
      <bottomFrise></bottomFrise>
    </div>
  </template>
  
  <script>
  import store from '@/store'
  import bottomFrise from './bottomFrise.vue'

  export default {
    name: 'Frisepage',
    components: {
      bottomFrise
    },
    data(){
      return {
        prevAnimation:false,
        nextAnimation:false,
        isHiddenPrev:false,
        isHiddenNext:false
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
      eventData(){
        return this.myData.find(event => event.dataid == this.currentEventId)
      },
      currentEventId(){
        return store.state.currentEventId
      }
    },
    methods: {

        setCurrentEventId(){
            if(window.location.hash) {
                this.$store.commit('setCurrentEventId',window.location.hash.substring(1))
            }else{
                let lastEvent = this.myData[this.myData.length - 1]
                this.$store.commit('setCurrentEventId',lastEvent.dataid)
                window.location.hash = lastEvent.dataid
            }
        },
        prevEvent(){
            var self = this;
            if(this.myData[this.myData.indexOf(this.eventData) - 1]){
                this.prevAnimation = true;
                setTimeout(() => {
                    this.$store.commit('setCurrentEventId',self.myData[self.myData.indexOf(self.eventData) - 1].dataid)
                    window.location.hash = self.currentEventId
                    self.isHiddenPrev = true;
                    setTimeout(() => {
                        self.isHiddenPrev = false;
                        self.prevAnimation = false;
                    }, 20);
                }, 750);
                
            }
        },
        nextEvent(){
            var self = this;
            if(this.myData[this.myData.indexOf(this.eventData) + 1]){
                console.log(this.myData[this.myData.indexOf(this.eventData) + 1].dataid)
                this.nextAnimation = true;
                setTimeout(() => {
                    this.$store.commit('setCurrentEventId',self.myData[self.myData.indexOf(self.eventData) + 1].dataid)
                    window.location.hash = self.currentEventId
                    self.isHiddenNext = true;
                    setTimeout(() => {
                        self.isHiddenNext = false;
                        self.nextAnimation = false;
                    }, 20);
                }, 750);
            }
        },
        getIcon(type){
            if(type=='site'){
                return require('@/assets/img/link-icon.svg')
            }else if(type=='video'){
                return require('@/assets/img/video-icon.svg')
            }else if(type=='infographie'){
                return require('@/assets/img/infographie-icon.svg')
            }else if(type=='pdf'){
                return require('@/assets/img/document-icon.svg')
            }else{
                return require('@/assets/img/link-icon.svg')
            }
        },

        isLast(){
            return this.myData.indexOf(this.eventData) == this.myData.length - 1
        },
        isFirst(){
            return this.myData.indexOf(this.eventData) == 0
        },
        getRegex(){
            if(window.innerWidth > 1149){
                return /.{1,25}(?:\s|$)/g
            }else if(window.innerWidth > 979){
                return /.{1,40}(?:\s|$)/g
            }else{
                return /.{1,35}(?:\s|$)/g
            }
        }
    },
  
    watch:{
        dataImport:function(){
            this.setCurrentEventId()
            console.log(this.myData)
        },
        '$route.hash': function() {
            this.setCurrentEventId()
        }
    },
  
    created(){
      if(this.myData){this.setCurrentEventId()}
    }
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
    /* overload fonts path, to delete when parent has access */
    @import "../../css/overload-fonts.css";
    @import "../../css/variables.scss";
    #frisepage{
      background-color:$mintBlue;
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 0;
      #event_container{
        width: 100%;
        position: relative;
        top:55px;
        transform: translateX(0);
        transition: transform 1.1s ease-in-out;
        &.is_hidden_prev{
            transition: none;
            transform: translateX(-100%)!important;
        }
        &.prev_animation{
            transform: translateX(100%);
            #event_image_container{
                #event_title{
                    margin-left:0px;
                }
                #event_buttons{
                    margin-left:0px;
                }
            }
        }
        &.is_hidden_next{
            transition: none;
            transform: translateX(100%)!important;
        }
        &.next_animation{
            transform: translateX(-100%);
            #event_image_container{
                #event_title{
                    margin-left:0px;
                }
                #event_buttons{
                    margin-left:0px;
                }
            }
        }
        #event_date{
          font-family: Figtree-ExtraBold;
          font-size: 24px;
          color: $springGreen;
          background-color:$fushia;
          display: inline-block;
          padding:6px 12px;
          left:50%;
          transform: translateX(-50%);
          position: relative;
        }
        #event_image_container{
            position: relative;
            top:16px;
            #event_image{
                width: 400px;
                height: 280px;
                display: inline-block;
                left:50%;
                transform: translateX(-50%);
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                position: absolute;
            }
            #event_title{
                font-family: Figtree-ExtraBold;
                font-size: 24px;
                color: $springGreen;
                position: absolute;
                display: inline-block;
                left:50%;
                margin-left:208px;
                transition: margin-left 0.9s ease-in-out;
                span{
                    background-color:$fushia;
                    padding:6px 12px;
                    display: inline-block;
                    margin-bottom: 8px;
                }
            }
        }
        #event_buttons{
            position:absolute;
            bottom:-285px;
            left:50%;
            margin-left:-208px;
            transform: translateX(-100%); 
            transition: margin-left 0.9s ease-in-out;
            .event_button{
                text-decoration: none;
                color:black;
                display: flex;
                width: 160px;
                padding: 6px 6px 8px 6px;
                align-items: center;
                gap: 4px;
                background-color: white;
                font-family: Figtree-Bold;
                font-size: 14px;
                color:$deepBlue;
                border-radius: 4px;
                margin-bottom: 4px;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
      }
      .nav_btn{
        position: absolute;
        width: 68px;
        height: 68px;
        background-color:$deepBlue;
        top:50%;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 1000;
        &.disabled{
            opacity: 0.2;
            pointer-events: none;
        }
        &:hover{
            background-color:white;
            svg *{
                fill: $deepBlue;
            }
        }
        svg{
            position: absolute;
            top:50%;
            left:50%;
        }
        &.nav_btn_prev{
            left:0;
            svg{
                transform: translate(-50%,-50%);
            }   
        }
        &.nav_btn_next{
            right:0;
            svg{
                transform: translate(-50%,-50%) rotate(180deg);
            }
        }
      }
    }

    @media (max-width: 1149px) {
        #frisepage{
            #event_container{
                top:32px;
                #event_image_container{
                    #event_title{
                        left:50%;
                        margin-left:-200px;
                        top:288px;
                        position: relative;
                    }
                    #event_buttons{
                        position:relative;
                        bottom:auto;
                        top:288px;
                        left:50%;
                        margin-left:-200px;
                        transform: translateX(0);
                        width: 348px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        .event_button{
                            
                        }
                    }
                }
                
            }
        }
    }
    

    @media (max-width: 979px) {
        #frisepage{
            top:60px;
            #event_container{
                top:12px;
                &.prev_animation{
                    #event_image_container{
                        #event_title{
                            margin-left:-170px;
                        }
                        #event_buttons{
                            margin-left:-170px;
                        }
                    }
                }
                &.next_animation{
                    #event_image_container{
                        #event_title{
                            margin-left:-170px;
                        }
                        #event_buttons{
                            margin-left:-170px;
                        }
                    }
                }
                #event_image_container{
                    top:8px;
                    #event_image{
                        width: 344px;
                        height: 229px;
                    }
                    #event_title{
                        left:50%;
                        margin-left:-170px;
                        top:244px;
                        position: relative;
                        
                    }
                    #event_buttons{
                        position:relative;
                        bottom:auto;
                        top:248px;
                        left:50%;
                        margin-left:-170px;
                        transform: translateX(0);
                        width: 340px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        .event_button{
                            width: 150px;
                        }
                    }
                }
                
            }
        }
    }
  
  
  </style>
  