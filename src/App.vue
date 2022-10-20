<template>

  <NavBar/>

  <TheLoader v-if="showLoading" />

  <div class="container">
    <router-view/>
  </div>

</template>

<script>

  import NavBar from '@/components/NavBar.vue'
  import TheLoader from '@/components/TheLoader.vue'
  import { computed } from 'vue'
  import { mapState } from 'vuex';

  export default{
    
    name: 'App',
    components: {
      TheLoader, NavBar
    },
    computed: {
      ...mapState({
        showLoading: state => state.showLoading
      }),
    }


  }
</script>

<!-- <script setup>

  import NavBar from '@/components/NavBar.vue'
  import TheLoader from '@/components/TheLoader.vue'
  import { computed } from 'vue'


</script> -->



<style lang="scss">
  
  * {
  
    a:link { 
      text-decoration:none;
    } 
    
    a {
      
      &:hover{
        background-color: green;
        border-radius: 3px;
      }
    }
    
  }
</style>
