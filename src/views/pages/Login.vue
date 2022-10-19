<template>
  
  <div class="row centrer ">
    <div class="col-md-6 ladiv">
      <h1 class="titre">Login - {{ name }} </h1>
      <div>
        <form @submit.prevent="onLogin">
          
          <div class="form-group mb-3">
            
            <input type="email" class="form-control" placeholder="email" v-model="email">
            
            <div class="error" v-if="errors.email"> {{ errors.email }} </div>
            
          </div>

          <div class="form-group mb-3">
            
            <input type="password" class="form-control" placeholder="mot de passe" v-model="password">
          
            <div class="error" v-if="errors.password"> {{ errors.password }} </div>
          
          </div>


          <div class="my-3">
            <button type="submit" class="btn btn-primary btn-sm" style="width: 100%; margin-top: 20px;">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import SignupValidations from '../../services/SignupValidations.js'


export default {

  data(){
    return {
      email: '',
      password: '',
      errors: [],
    }
  },

  computed: {
    ...mapState({
      name: state => state.name
    })
  },

  methods: {
    onLogin(){
      // la chercher la validation
      let validations = new SignupValidations(this.email, this.password)

      this.errors = validations.checkValidations()

      if (this.errors.length) {
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .centrer{
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ladiv{
      width: 400px;
      height: 100%;
      background-color: rgba(71, 157, 49, 0.852);
      padding: 40px;
      border-radius: 2px;
    }

    .titre {
      margin-bottom: 20px;
    }

  }

  .error {
    margin-top: 10px;
    background-color: rgb(198, 77, 77);
    border-radius: 2px;
    color: white;
  }


</style>

