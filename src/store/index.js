import Axios from 'axios'
import { createStore } from 'vuex'
import { SIGNUP_ACTION } from './storeConstants'

export default createStore({

  state: {
    name: "essai"
  },
  getters: {
  },
  mutations: {
  },

  actions: {

    async [SIGNUP_ACTION](_, payload){

      let postData = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }

      let response = await Axios({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_ENV_API_KEY}`,
        data: postData
      }) 
      .then(function (response) {
        console.log(response);
        })
      .catch(function (error) {
        console.log(error);
      })

    }

  },
  modules: {
  }
})
