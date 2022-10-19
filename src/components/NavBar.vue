<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid justify-content-end">
      <router-link to="/" class="navbar-brand" style="color:coral">TutoAuth</router-link>
      
      <div class="navbar-collapse collapse" >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
      </div>
      <div class=" navbar-collapse collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <span class="material-icons">face</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">
              <span class="material-icons">logout</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>

</script>

<style>

</style>