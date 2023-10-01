<template>
  <Header />
  <div class="view d-flex justify-content-center align-items-center">
    <router-view />
  </div>
  <Footer />
</template>

<style>
body,
html {
  min-height: 100vh !important;
  background-color: black !important;
  color: white !important;
}

.view {
  min-height: 400px;
}
</style>

<script lang="ts" setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>