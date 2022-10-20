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
  import { AUTH_AUTO_LOGIN_ACTION } from './store/storeConstants';
  import store from '@/store'

  export default{
    
    name: 'App',
    components: {
      TheLoader, NavBar
    },

    computed: {

      ...mapState({

        showLoading: state => state.showLoading,

        autoLogout: (state) => {
          console.log("dans app - computed -autoLogout", state.autoLogout)
          // state.auth.autoLogout
          return state.autoLogout
        }

      }),


    },

    watch: {
      autoLogout(curValue, oldValue) {
        
        console.log('dans watch - current value - old value', curValue, oldValue)

        if (curValue && curValue != oldValue){

          this.$router.replace('/login')

        }

      }
    },

    created() {
      console.log(AUTH_AUTO_LOGIN_ACTION)
      console.log('dans created dans app', store.dispatch(AUTH_AUTO_LOGIN_ACTION))
      // this.$store.dispatch(`auth/${AUTH_AUTO_LOGIN_ACTION}`)
      store.dispatch(AUTH_AUTO_LOGIN_ACTION)
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
