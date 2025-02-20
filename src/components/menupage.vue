<template>
    <div id="menupage" :class="{'open':menuOpen}">
        <div id="menu_container">
            <div id="menu_wrapper" @click.self="handleContainerClick">
                <div id="menu_close" @click="toggleMenu()"></div>
                <div id="menu_title" @click="callChangeAppState('homepage')">
                    <span>Nos Temps Forts</span>
                </div>
                <div id="menu_month_selector">
                    <div id="menu_month_selector_title" :class="{'open':openMonthSelector}" @click="openMonthSelector = !openMonthSelector">Parcourir <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><mask id="mask0_218_4203" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9"/></mask><g mask="url(#mask0_218_4203)"><path d="M12 15L7 10H17L12 15Z" fill="#483D8B"/></g></svg></div>
                    <div id="menu_month_selector_wrapper" :class="{'open':openMonthSelector}">
                        <div class="year_wrapper" v-for="year in yearsList" :key="year.year">
                            <div class="year_wrapper_year">{{ year.year }}</div>
                            <div class="year_wrapper_month" @click="findEvent(year.year,month)" v-for="month in year.months" :key="month">{{ numberToMonth[parseInt(month)-1][month] }}</div>
                        </div>
                    </div>
                </div>
                <div class="menu_link_container">
                    <div class="menu_link_title">NOTRE SITE INTERNET</div>
                    <a href="https://www.assurance-prevention.fr/" target="_blank"><div class="menu_link_btn">Visiter</div></a>
                </div>
                <div class="menu_link_container">
                    <div class="menu_link_title">NOTRE NEWSLETTER</div>
                    <a href="https://www.assurance-prevention.fr/" target="_blank"><div class="menu_link_btn">S’abonner</div></a>
                </div>
                <div class="share_container">
                    <div class="share_title">Partager</div>
                    <div class="share_btn_container">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://assurance-prevention-temps-forts.fr/" target="_blank">
                            <div class="share_btn share_btn_fb"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M7.69003 11.22V19.75H3.88004V11.22H0.780029V7.69H3.88004V5C3.88004 1.94 5.70002 0.25 8.49002 0.25C9.83002 0.25 11.22 0.49 11.22 0.49V3.49H9.68002C8.16002 3.49 7.69003 4.43 7.69003 5.4V7.69H11.08L10.54 11.22H7.70001H7.69003Z" fill="#483D8B"/></svg></div>
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://assurance-prevention-temps-forts.fr/" target="_blank">
                            <div class="share_btn share_btn_li"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.51508 4.58869C1.38508 4.58869 0.465088 3.64869 0.465088 2.51869C0.465088 1.78869 0.855077 1.10869 1.48508 0.748691C2.11508 0.378691 2.90506 0.378691 3.53506 0.748691C4.16506 1.11869 4.55508 1.78869 4.55508 2.51869C4.55508 3.64869 3.63507 4.58869 2.50507 4.58869H2.51508ZM4.28506 17.5287H0.745087V6.13869H4.28506V17.5287ZM17.5251 17.5287H13.9951V11.9787C13.9951 10.6587 13.9651 8.95869 12.1551 8.95869C10.3451 8.95869 10.0351 10.3987 10.0351 11.8787V17.5187H6.50507V6.13869H9.89508V7.68869H9.94507C10.4151 6.78869 11.5751 5.84869 13.2951 5.84869C16.8751 5.84869 17.5351 8.20869 17.5351 11.2687V17.5287H17.5251Z" fill="#483D8B"/></svg></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>

  import store from '@/store'
  
  export default {
    name: 'Menupage',
    components: {
      
    },
    data(){
      return {
        numberToMonth:[{"1":"Janvier"},{"2":"Février"},{"3":"Mars"},{"4":"Avril"},{"5":"Mai"},{"6":"Juin"},{"7":"Juillet"},{"8":"Août"},{"9":"Septembre"},{"10":"Octobre"},{"11":"Novembre"},{"12":"Décembre"}],
        openMonthSelector:false
      }
    },
    props: {
      menuOpen: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      myData(){
        return store.state.myData
      },
      reverseOrderEvents(){
        return [...this.myData].reverse()
      },
      yearsList() {
        const currentDate = new Date();
        const months = [];
        let currentYear = currentDate.getFullYear();
        let startYear = 2019;

        // Loop from current year down to 2019
        for (let year = currentYear; year >= startYear; year--) {
            let yearMonths = [];
            
            // For current year, only include months up to current month
            const monthLimit = (year === currentYear) ? currentDate.getMonth() + 1 : 12;
            const startMonth = (year === startYear) ? 0 : 0;
            
            for (let month = startMonth; month < monthLimit; month++) {
            yearMonths.push(month + 1); // Adding 1 since getMonth() is 0-based
            }

            if (yearMonths.length > 0) {
            months.push({
                year: year,
                months: yearMonths.reverse() // Reverse months to show most recent first
            });
            }
        }
        return months;
      }
    },
    methods: {
      callChangeAppState(state){
        this.$parent.$parent.changeAppState(state)
        window.history.pushState({}, '', '/')
      },
      handleClickOutside(event) {
        const selector = document.getElementById('menu_month_selector_title');
        if (this.openMonthSelector && selector && !selector.contains(event.target)) {
          this.openMonthSelector = false;
        }
      },
      handleContainerClick(){
        this.toggleMenu();
      },
      toggleMenu(){
        this.$parent.toggleMenu()
      },
      findEvent(year,month){
        let currentMonth = month;
        let currentYear = year;
        let event;
        while (currentYear >= 2019) {
            while (currentMonth >= 1) {
                event = this.myData.find(event => event.annee == currentYear && event.mois == currentMonth);
                if (event) {
                    break;
                }
                currentMonth--;
            }
            if (event) {
                break;
            }
            currentYear--;
            currentMonth = 12;
        }

        if (event) {
            this.$parent.jumpToEvent(event);
            this.$parent.toggleMenu();
        }
        
        
      }
    },
  
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
  
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
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
    #menupage{
      width: 100%;
      height: 100%;
      background-color: rgba(41,46,107,0); 
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      display: flex;
      pointer-events: none;
      transition: background-color 0.3s ease;
      &.open{
        background-color: rgba(41,46,107,0.8); 
        pointer-events: all;
        #menu_container{
            left:0;
        }
      }
      #menu_container{
        width: 346px;
        height: 100%;
        background-color: white;
        opacity: 1;
        position:absolute;
        left:-346px;
        transition: left 0.3s ease;
        #menu_wrapper{
            width: 90%;
            height: 100%;
            margin: 0 auto;
            padding-top: 20px;
            #menu_close{
                width:56px;
                height:56px;
                background-color: white;
                border-radius: 50%;
                margin-bottom: 10px;
                cursor: pointer;
                position: relative;
                transition: background-color 0.2s ease-in-out;
                &:after{
                    content: "";
                    width:25px;
                    height:2px;
                    background-color: $nightBlue;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%) rotate(45deg);
                    transition: background-color 0.2s ease-in-out;
                }
                &:before{
                    content: "";
                    width:25px;
                    height:2px;
                    background-color: $nightBlue;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%) rotate(-45deg);
                    transition: background-color 0.2s ease-in-out;
                }
                &:hover{
                    background-color: $nightBlue;
                    &:after{
                        background-color: white;
                    }
                    &:before{
                        background-color: white;
                    }
                }
            }
            #menu_title{
                font-family: "Figtree-Bold";
                font-size: 30px;
                color: $deepBlue;
                margin-bottom: 10px;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
            #menu_month_selector{
                margin-bottom: 32px;
                #menu_month_selector_title{
                    font-family: "Figtree-Regular";
                    font-size: 16px;
                    color: $violet;
                    position: relative;
                    width:282px;
                    border-radius: 3px;
                    border: 2px solid rgba(72, 61, 139, 0.20);
                    display: flex;
                    padding: 10px 8px 10px 16px;
                    justify-content: space-between;
                    align-items: center;
                    align-self: stretch;
                    cursor: pointer;
                    &:hover{
                        border:2px solid $violet;
                    }
                    &.open{
                        border: 2px solid rgba(72, 61, 139, 0);
                        background: rgba(72, 61, 139, 0.20);
                        &:hover{
                            border: 2px solid rgba(72, 61, 139, 0);
                        }   
                    }
                }
                #menu_month_selector_wrapper{
                    position: absolute;
                    width:305px;
                    height: 0px;
                    overflow:scroll;
                    border-radius: 3px;
                    z-index: 999;
                    &.open{
                        height: 336px;
                        border:2px solid $violet;
                    }
                    .year_wrapper{
                        .year_wrapper_year{
                            font-family: "Figtree-Regular";
                            font-size: 16px;
                            color: rgba(72, 61, 139, 0.50);
                            border-bottom: 2px solid #F5F0F3;
                            padding:8px 26px 8px 16px;
                            background-color: white;
                        }
                        .year_wrapper_month{
                            font-family: "Figtree-Regular";
                            font-size: 16px;
                            color: $violet;
                            padding:8px 26px 8px 26px;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                            &:nth-child(even){
                                background-color: white;
                            }
                            &:nth-child(odd){
                                background-color: #F5F0F3;
                            }
                        }
                    }
                }
            }
            .menu_link_container{
                margin-bottom: 22px;
                .menu_link_title{
                    font-family: "Figtree-Bold";
                    font-size: 16px;
                    color: $nightBlue;
                    margin-bottom: 8px;
                }
                .menu_link_btn{
                    font-family: "Figtree-Bold";
                    font-size: 16px;
                    color: #2d2b2c;
                    background-color: $yellow;
                    padding: 12px 26px;
                    border-radius: 40px;
                    cursor: pointer;
                    display: inline-block;
                    width: auto;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .share_container{
                display: flex;
                align-items: center;
                .share_title{
                    font-family: "Figtree-Bold";
                    font-size: 16px;
                    color: $nightBlue;
                    margin-bottom: 8px;
                    margin-right: 120px;
                }
                .share_btn_container{
                    .share_btn{
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                        margin-right: 10px;
                        position: relative;
                        transition: background-color 0.2s ease-in-out;
                        svg{
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            path{
                                transition: fill 0.2s ease-in-out;
                            }
                        }
                        &:hover{
                            background-color: $nightBlue;
                            svg{
                                path{
                                    fill: white;
                                }
                            }
                        }
                    }
                }
            }
        }
      }
    }

    @media (max-width: 979px) {

        #menupage{
            #menu_container{
                width: 100%;
                left: -100%;
            }
            &.open{
                #menu_container{
                    left:0;
                }
            }
        }
       
    }
  
  
  </style>
  