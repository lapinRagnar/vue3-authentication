import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/pages/Login.vue'
import SignUp from '../views/pages/SignUp.vue'
import PostView from '@/views/pages/PostView.vue'
import store from '@/store'
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostView,
    meta: {
      auth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      auth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  
  console.log("je suis dans beforeEach dans le router", to)
  console.log(" le store", store)

  if ( 'auth' in to.meta && to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]){
    next('/login')
  }else if ( 'auth' in to.meta && to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]) {
    next('/posts')
  } else {
    next()
  }
  
  
})


export default router
