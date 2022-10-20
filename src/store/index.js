import SignupValidations from '@/services/SignupValidations'
import Axios from 'axios'
import { createStore } from 'vuex'
import { 
  AUTH_ACTION, 
  AUTH_AUTO_LOGIN_ACTION, 
  AUTO_LOGOUT_ACTION, 
  GET_USER_TOKEN_GETTER, 
  IS_USER_AUTHENTICATE_GETTER, 
  LOADING_SPINNER_SHOW_MUTATION, 
  LOGING_ACTION, LOGOUT_ACTION, 
  SET_AUTO_LOGOUT_MUTATION, 
  SET_USER_TOKEN_DATA_MUTATION, 
  SIGNUP_ACTION 
} from './storeConstants'

let timer = ''

export default createStore({

  state: {
    name: "essai",
    showLoading: false,
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',
    autoLogout: false,

  },

  getters: {

    [GET_USER_TOKEN_GETTER]: (state) => state.token,

    [IS_USER_AUTHENTICATE_GETTER](state){
      return !state.token
    }


  },

  mutations: {

    [SET_USER_TOKEN_DATA_MUTATION](state, payload){
      state.email = payload.email
      state.token = payload.token
      state.expiresIn = payload.expiresIn
      state.userId = payload.userId
      state.refreshToken = payload.refreshToken
      state.autoLogout = false
    },

    [LOADING_SPINNER_SHOW_MUTATION](state, payload){
      state.showLoading = payload
    },


    [SET_AUTO_LOGOUT_MUTATION](state){
      state.autoLogout = true
    }


  },

  actions: {

    [LOGOUT_ACTION](context){

      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        email: null,
        token: null,
        expiresIn: null,
        refreshToken: null,
        userId: null
      })
      
      localStorage.removeItem('userData')

      if (timer) {
        clearTimeout(timer)
      }

    },

    [AUTO_LOGOUT_ACTION](context){
      
      context.dispatch(LOGOUT_ACTION)
      context.commit(SET_AUTO_LOGOUT_MUTATION)
      
    },

    [AUTH_AUTO_LOGIN_ACTION](context){

      let userDataString = localStorage.getItem('String')

      if (userDataString){

        let userData = JSON.parse(userDataString)
        let expirationTime = userData.expiresIn - new Date().getTime()

        if (expirationTime < 10000){
          // get the token to the refresh token et do the logout
          context.dispatch(AUTO_LOGOUT_ACTION)
        }else {

          timer = setTimeout(() => {
            context.dispatch(AUTO_LOGOUT_ACTION)
          }, expirationTime)
        }

        context.commit(SET_USER_TOKEN_DATA_MUTATION, userData)
      }
    },

    async [LOGING_ACTION](context, payload){

      return context.dispatch(AUTH_ACTION, {
        ...payload,
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_ENV_API_KEY}`
      })

    },


    // gestion de l'authentification
    async [AUTH_ACTION](context, payload){

      let postData = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }

      let response = ''

      try {

        response = await Axios({
          method: 'post',
          url: payload.url,
          data: postData
        })


      } catch(err){
        
        console.log('erreur dans le reponse dans le catch', err.response)
        let errorMessage = SignupValidations.getErrorMessageFromCode(err.response.data.error.errors[0].message)

        console.log('erreur dans le reponse', err.response.data)


        throw errorMessage
        

      }

      if (response.status == 200) {

        // let expirationTime = +response.data.expiresIn * 1000
        let expirationTime = +10 * 1000

        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION)
        }, expirationTime)

        let tokenData = {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: expirationTime,
          refreshToken: response.data.refreshToken,
          userId: response.data.localId
        }

        localStorage.setItem('userData', JSON.stringify(tokenData))

        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)

      }


    },


    // `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_ENV_API_KEY}`

    // créer un compte
    async [SIGNUP_ACTION](context, payload){

      return context.dispatch(AUTH_ACTION, {
        ...payload,
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_ENV_API_KEY}`
      })

    }

  },
  modules: {
  }
})
