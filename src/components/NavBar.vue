<template>
  
  <nav class="navbar navbar-expand navbar-dark bg-dark">

    <div class="container-fluid justify-content-end">

      <router-link to="/" class="navbar-brand" style="color:coral">TutoAuth</router-link>
      
      <div class="navbar-collapse collapse" >
        
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <router-link to="/" class="nav-link"  >Home</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/posts" class="nav-link" v-if="!isAuthenticated">Post</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>

        </ul>
      </div>

      <div class=" navbar-collapse collapse">

        <ul class="navbar-nav ms-auto">

          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/login" class="nav-link">
              <span class="material-icons">face</span>
            </router-link>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/signup" class="nav-link">
              <span class="material-icons">group_add</span>
            </router-link>
          </li>
          
          

          <li class="nav-item" v-if="!isAuthenticated">
            
              <span style="cursor: pointer" class="nav-link material-icons" @click.prevent="onLogout">logout</span>
            
          </li>

        </ul>

      </div>

    </div>

  </nav>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION } from '@/store/storeConstants'

export default {
  
  computed: {
    
    ...mapGetters({
      isAuthenticated: IS_USER_AUTHENTICATE_GETTER
    }),


  },

  methods: {

    ...mapActions({

      logout: LOGOUT_ACTION

    }),

    onLogout(){

      this.logout()
      this.$router.replace({name: 'login'})

    }

  }


}
</script>

<style>

</style>