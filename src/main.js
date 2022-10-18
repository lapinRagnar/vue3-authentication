import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App).use(BootstrapVue).use(IconsPlugin).use(store).use(router).mount('#app')
