<template>
  <nav class="d-flex flex-column text-center">
    <div class="d-flex">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
    </div>

    <div class="title mt-3">
      <h1>Lollapalooza</h1>
      <h5>Line-up Generator</h5>
    </div>
    
  </nav>
</template>

<script setup lang="ts">
console.log(process.env.clientId)
</script>