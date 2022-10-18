<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid justify-content-end">
      <router-link to="/" class="navbar-brand">TutoAuth</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse">
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