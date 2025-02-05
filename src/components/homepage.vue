<template>
  <div id="homepage">
    <div>Homepage</div>
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
  }


</style>
