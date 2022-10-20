<template>

  <div>
  
    <h1>Post</h1>
  
    <table class="table table-hover table-responsive">
      <thead class="table-striped table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">id</th>
          <th scope="col">titre</th>
          <th scope="col">contenu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, key) in posts" :key="post.id">
          <th scope="row">{{ key + 1 }}</th>
          <td>{{post.id}}</td>
          <td>{{post.title}}</td>
          <td>{{post.body}}</td>
        </tr>
      </tbody>
    </table>
  
  </div>

</template>

<script>

import axiosInstance from '@/services/AxiosTokenInstance'
import { mapGetters, mapMutations } from 'vuex'
import { GET_USER_TOKEN_GETTER, LOADING_SPINNER_SHOW_MUTATION } from '@/store/storeConstants'

export default {

  data(){
    return {
      posts: []
    }
  },

  computed:{

    ...mapGetters({
      token: GET_USER_TOKEN_GETTER
    })

  },

  async mounted(){

    this.showLoading(true)

    await axiosInstance({
      method: 'get',
      url: `https://vue3-auth-tuto-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
    })
    .then(response => {
      
      console.log(' dans le mounted, la reponse de axios',response)
      this.formatPosts(response.data)

      this.showLoading(false)
    })
    .catch(() => this.showLoading(false))

    this.showLoading(false)

  },

  methods: {

    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION
    }),

    formatPosts(posts){
      for (let key in posts){
        this.posts.push({...posts[key], id: key})
        console.log('dans la fonction formatPost',this.posts)
      }
    }

  }

}
</script>

