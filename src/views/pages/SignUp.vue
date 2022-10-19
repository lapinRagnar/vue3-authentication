<template>
  
  <div class="row centrer ">

    <div class="col-md-6 ladiv">
      
      <h1 class="titre">Créer un compte</h1>
      
      <div>
        <form @submit.prevent="onSignup">

          <div class="form-group mb-3">

            <input type="email" class="form-control" placeholder="email" v-model.trim="email">

            <div class="error" v-if="errors.email"> {{ errors.email}} </div>

          </div>


          <div class="form-group mb-3">

            <input type="password" class="form-control" placeholder="mot de passe" v-model.trim="password">

            <div class="error" v-if="errors.password"> {{ errors.password}} </div>

          </div>


          <div class="my-3">
            <button type="submit" class="btn btn-primary btn-sm" style="width: 100%; margin-top: 20px;">valider</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
  
<script>

import SignupValidations from '@/services/SignupValidations'
import { mapActions } from 'vuex'
import { SIGNUP_ACTION } from '@/store/storeConstants'

export default {

  data(){
    return {
      email: '',
      password: '',
      errors: [],
    }
  },

  methods: {

    ...mapActions({
      signup: SIGNUP_ACTION
    }),

    onSignup(){

      let validations = new SignupValidations(this.email, this.password)

      this.errors = validations.checkValidations()

      if ('email' in this.errors || 'password' in this.errors) {
        return false
      }

      // registration
      this.signup({
        email: this.email,
        password: this.password,
      })
      
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