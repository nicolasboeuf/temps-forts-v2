<template>
    <div id="frisepage" :class="getPageStyle(eventData)" v-if="myData" @click="handleClickOutside">
      <menupage :menuOpen="menuOpen"></menupage>
      <div id="menu_btn" @click="toggleMenu()">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="nav_btn nav_btn_prev" :class="(isFirst())?'disabled':''" @click="jumpToEvent(myData[myData.indexOf(eventData) - 1])"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><mask id="mask0_33_377" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40"><rect width="40" height="40" fill="#D9D9D9"/></mask><g mask="url(#mask0_33_377)"><path d="M11.4933 21.0471L21.4829 31.0254L20 32.5L7.5 20L20 7.5L21.4829 8.97458L11.4933 18.9529H32.5V21.0471H11.4933Z" fill="white"/></g></svg></div>
      <div id="event_container" :class="{'prev_animation': prevAnimation, 'next_animation': nextAnimation, 'is_hidden_prev': isHiddenPrev, 'is_hidden_next': isHiddenNext}">
        <div id="event_date" :class="getTextStyle(eventData)">{{ eventData.datelabel.toUpperCase() }}</div>
        <div id="event_image_container">
            <div id="event_image" :style="{ backgroundImage: 'url(' + require('@/assets/img/event/'+eventData.id+'.png') + ')' }"></div>
            <div id="event_title" :class="getTextStyle(eventData)">
               <div><span v-html="eventData.titre"></span></div>
            </div>
            <div id="event_buttons">
                <a class="event_button" v-if="eventData.bouton1_texte" :href="eventData.bouton1_url" target="_self">
                    <img :src="getIcon(eventData.bouton1_type)">
                    {{ eventData.bouton1_texte }} 
                </a>
                <a class="event_button" v-if="eventData.bouton2_texte" :href="eventData.bouton2_url" target="_self">
                    <img :src="getIcon(eventData.bouton2_type)">
                    {{ eventData.bouton2_texte }} 
                </a>
                <a class="event_button" v-if="eventData.bouton3_texte" :href="eventData.bouton3_url" target="_self">
                    <img :src="getIcon(eventData.bouton3_type)">
                    {{ eventData.bouton3_texte }} 
                </a>
                <a class="event_button" v-if="eventData.bouton4_texte" :href="eventData.bouton4_url" target="_self">
                    <img :src="getIcon(eventData.bouton4_type)">
                    {{ eventData.bouton4_texte }} 
                </a>
            </div>
        </div>
      </div>
      <div class="nav_btn nav_btn_next" :class="(isLast())?'disabled':''" @click="jumpToEvent(myData[myData.indexOf(eventData) + 1])"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><mask id="mask0_33_377" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40"><rect width="40" height="40" fill="#D9D9D9"/></mask><g mask="url(#mask0_33_377)"><path d="M11.4933 21.0471L21.4829 31.0254L20 32.5L7.5 20L20 7.5L21.4829 8.97458L11.4933 18.9529H32.5V21.0471H11.4933Z" fill="white"/></g></svg></div>
      <bottomFrise></bottomFrise>
    </div>
  </template>
  
  <script>
  import store from '@/store'
  import bottomFrise from './bottomFrise.vue'
  import menupage from './menupage.vue'

  export default {
    name: 'Frisepage',
    components: {
      bottomFrise,
      menupage
    },
    data(){
      return {
        prevAnimation:false,
        nextAnimation:false,
        isHiddenPrev:false,
        isHiddenNext:false,
        menuOpen:false,
        appear:false
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
        handleClickOutside(event) {
            const menuContainer = document.getElementById('menu_container');
            const menuBtn = document.getElementById('menu_btn');
            // Don't close if clicking the menu button or inside menu container
            if (this.menuOpen && 
                menuContainer && 
                !menuContainer.contains(event.target) && 
                !menuBtn.contains(event.target)) {
                this.toggleMenu();
            }
        },
        setCurrentEventId(){
            if(window.location.hash) {
                this.$store.commit('setCurrentEventId',window.location.hash.substring(1))
            }else{
                let lastEvent = this.myData[this.myData.length - 1]
                this.$store.commit('setCurrentEventId',lastEvent.dataid)
                window.location.hash = lastEvent.dataid
            }
        },
        prevEvent(eventid){
            var self = this;
            this.prevAnimation = true;
            setTimeout(() => {
                this.$store.commit('setCurrentEventId',eventid)
                window.location.hash = self.currentEventId
                self.isHiddenPrev = true;
                setTimeout(() => {
                    self.isHiddenPrev = false;
                    self.prevAnimation = false;
                }, 20);
            }, 450);
        },
        
        nextEvent(eventid){
            var self = this;
            this.nextAnimation = true;
            setTimeout(() => {
                this.$store.commit('setCurrentEventId',eventid)
                window.location.hash = self.currentEventId
                self.isHiddenNext = true;
                setTimeout(() => {
                    self.isHiddenNext = false;
                    self.nextAnimation = false;
                }, 20);
            }, 450);
        },
        
        jumpToEvent(event){
            if(event){
                if(this.myData.indexOf(this.eventData) > this.myData.indexOf(event)){
                    this.prevEvent(event.dataid)
                }else{
                    this.nextEvent(event.dataid)
                }
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
            }else if(type=='son'){
                return require('@/assets/img/sound-icon.svg')
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
        getPageStyle(event){
            if(this.appear){
                return "appear style"+event.color_theme
            }else{
                return "style"+event.color_theme
            }
        },
        getTextStyle(event){
            if(this.appear){
                return "appear style"+event.color_theme
            }else{
                return "style"+event.color_theme
            }
        },
        toggleMenu(){
            this.menuOpen = !this.menuOpen
        }
    },
  
    watch:{
        dataImport:function(){
            this.setCurrentEventId()
        },
        '$route.hash': function() {
            this.setCurrentEventId()
        }
    },
  
    created(){
      if(this.myData){this.setCurrentEventId()}
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
    #frisepage{
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 0;
      transition: background-color 0.5s ease-in-out;
      &.style1{
        background-color:$mintBlue;
      }
      &.style2{
        background-color:$orange;
      }
      &.style3{
        background-color:$springGreen;
      }
      &.style4{
        background-color:$violet;
      }
      &.style5{
        background-color:$paleFushia;
      }
      &.style6{
        background-color:$tropicalBlue;
      }
      &.appear{
        #event_container{
            transform: translateX(0);
            #event_image_container{
                #event_title{
                    margin-left:208px;
                }
                #event_buttons{
                    margin-left:-208px;
                }
            }
        }
        .nav_btn{
            &.nav_btn_prev{
                left:0;
            }
            &.nav_btn_next{
                right:0;
            }
        }
      }
      #menu_btn{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 40px;
        height: 40px;
        background-color: white;
        cursor: pointer;
        z-index: 100;
        transition: background-color 0.2s ease-in-out;
        div{
            width: 30px;
            height: 2px;
            background-color: $deepBlue;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            transition: background-color 0.2s ease-in-out;
            &:nth-child(1){
                margin-top: -7px;
            }
            &:nth-child(2){
                margin-top: 7px;
            }
        }
        &:hover{
            background-color: $deepBlue;
            div{
                background-color: white;
            }
        }
      }
      #event_container{
        width: 100%;
        position: relative;
        top:55px;
        transform: translateX(-100%);
        transition: transform 0.8s ease-in-out;
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
          display: inline-block;
          padding:6px 12px;
          left:50%;
          transform: translateX(-50%);
          position: relative;
          &.style1{
            color: $springGreen;
            background-color:$fushia;
          }
          &.style2{
            color: $springGreen;
            background-color:$violet;
          }
          &.style3{
            color: $orange;
            background-color:$violet;
          }
          &.style4{
            color: $violet;
            background-color:$yellow;
          }
          &.style5{
            color: $nightBlue;
            background-color:$springGreen;
          }
          &.style6{
            color: $violet;
            background-color:$yellow;
          }
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
                border-radius: 3px;
                border: 2px solid rgba(0, 0, 0, 0.08);
                box-sizing: border-box;
            }
            #event_title{
                font-family: Figtree-ExtraBold;
                font-size: 24px;
                position: absolute;
                display: block;
                left:50%;
                margin-left:0px;
                transition: margin-left 0.9s ease-in-out;
                max-width: 320px;
                span{
                    padding:6px 12px;
                    display: inline;
                    margin-bottom: 4px;
                    box-decoration-break: clone;
                    line-height: 45px;
                }
                &.style1{
                    span{
                        color: $springGreen;
                        background-color:$fushia;
                    }
                }
                &.style2{
                    span{
                        color: $springGreen;
                        background-color:$violet;
                    }
                }
                &.style3{
                    span{
                        color: $orange;
                        background-color:$violet;
                    }
                }
                &.style4{
                    span{
                        color: $violet;
                        background-color:$yellow;
                    }
                }
                &.style5{
                    span{
                        color: $nightBlue;
                        background-color:$springGreen;
                    }
                }
                &.style6{
                    span{
                        color: $violet;
                        background-color:$yellow;
                    }
                }
            }
        }
        #event_buttons{
            position:absolute;
            bottom:-285px;
            left:50%;
            margin-left:0px;
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
        z-index: 100;
        transition: left 0.5s ease-in-out, right 0.5s ease-in-out, background-color 0.2s ease-in-out;
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
            *{
                transition: fill 0.2s ease-in-out;
            }
        }
        &.nav_btn_prev{
            left:-68px;
            svg{
                transform: translate(-50%,-50%);
            }   
        }
        &.nav_btn_next{
            right:-68px;
            svg{
                transform: translate(-50%,-50%) rotate(180deg);
            }
        }
      }
    }

    @media (max-width: 1149px) {
        #frisepage{
            &.appear{
                #event_container{
                    #event_date{
                        font-size:18px;
                        padding:3px 8px;
                    }
                    #event_image_container{
                        #event_title{
                            max-width: 400px;
                            margin-left:-200px;
                        }
                        #event_buttons{
                            margin-left:-200px;
                        }
                    }
                }
            }
            #event_container{
                top:32px;
                #event_image_container{
                    #event_title{
                        left:50%;
                        margin-left:0;
                        top:288px;
                        position: relative;
                    }
                    #event_buttons{
                        position:relative;
                        bottom:auto;
                        top:288px;
                        left:50%;
                        margin-left:0;
                        transform: translateX(0);
                        width: 348px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }
                }
                
            }
        }
    }
    

    @media (max-width: 979px) {
        #frisepage{
            top:60px;
            &.appear{
                #event_container{
                    #event_image_container{
                        #event_title{
                            max-width: 340px;
                            margin-left:-170px;
                        }
                        #event_buttons{
                            margin-left:-170px;
                        }
                    }
                }
                .nav_btn{
                    bottom:0px;
                }
            }
            #menu_btn{
                top:-50px;
                &:hover{
                    background-color: white;
                    div{
                        background-color: $deepBlue;
                    }
                }
            }
            #event_container{
                top:0px;
                overflow: scroll;
                height: 100%;
                &.prev_animation{
                    #event_image_container{
                        #event_title{
                            max-width: 320px;
                            margin-left:0px;
                        }
                        #event_buttons{
                            margin-left:0px;
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
                #event_date{
                    margin-top:8px;
                }
                #event_image_container{
                    top:auto;
                    margin-top:8px;
                    padding-bottom: 120px;
                    #event_image{
                        width: 344px;
                        height: 229px;
                        position: relative;
                    }
                    #event_title{
                        left:50%;
                        margin-left:-170px;
                        top:20px;
                        position: relative;
                    }
                    #event_buttons{
                        position:relative;
                        bottom:auto;
                        top:40px;
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
            .nav_btn{
                top:auto;
                bottom:-68px;
                transform: translateY(0);
                transition: bottom 0.5s ease-in-out;
                &.nav_btn_prev{
                    left:0px;
                }
                &.nav_btn_next{
                    right:-0px;
                }
                &:hover{
                    background-color:$deepBlue;
                    svg *{
                        fill: white;
                    }
                }
            }
        }
    }
  
  
  </style>
  