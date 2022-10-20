import SignupValidations from '@/services/SignupValidations'
import Axios from 'axios'
import { createStore } from 'vuex'
import { GET_USER_TOKEN_GETTER, LOADING_SPINNER_SHOW_MUTATION, LOGING_ACTION, SET_USER_TOKEN_DATA_MUTATION, SIGNUP_ACTION } from './storeConstants'

export default createStore({

  state: {
    name: "essai",
    showLoading: false,
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',

  },

  getters: {

    [GET_USER_TOKEN_GETTER]: (state) => state.token


  },

  mutations: {

    [SET_USER_TOKEN_DATA_MUTATION](state, payload){
      state.email = payload.email
      state.token = payload.token
      state.expiresIn = payload.expiresIn
      state.userId = payload.userId
      state.refreshToken = payload.refreshToken
    },

    [LOADING_SPINNER_SHOW_MUTATION](state, payload){
      state.showLoading = payload
    }


  },

  actions: {

    async [LOGING_ACTION](context, payload){

      let postData = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }

      let response = ''

      try {

        response = await Axios({
          method: 'post',
          url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_ENV_API_KEY}`,
          data: postData
        })


      } catch(err){
        
        console.log('erreur dans le reponse dans le catch', err.response)
        let errorMessage = SignupValidations.getErrorMessageFromCode(err.response.data.error.errors[0].message)

        console.log('erreur dans le reponse', err.response.data)


        throw errorMessage
        

      }

      if (response.status == 200) {

        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
          userId: response.data.localId
        })

      }



    },

    async [SIGNUP_ACTION](context, payload){

      let postData = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }

      let response = ''

      // context.commit(LOADING_SPINNER_SHOW_MUTATION, true)

      try {

        response = await Axios({
          method: 'post',
          url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_ENV_API_KEY}`,
          data: postData
        }) 

      } catch(err){

        // context.commit(LOADING_SPINNER_SHOW_MUTATION, false)
        
        let errorMessage = SignupValidations.getErrorMessageFromCode(err.response.data.error.errors[0].message)

        throw errorMessage

      }

      // context.commit(LOADING_SPINNER_SHOW_MUTATION, false)

      if (response.status == 200) {

        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
          userId: response.data.localId
        })

      }

    }

  },
  modules: {
  }
})
