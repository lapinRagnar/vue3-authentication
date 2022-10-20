<template>

  <NavBar/>

  <div class="container">
    <router-view/>
  </div>

</template>

<script setup>

  import NavBar from '@/components/NavBar.vue'
  import { onMounted } from '@vue/runtime-core'

</script>

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
