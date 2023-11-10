<template>
  <Header />
  <div class="container view">
    <router-view />
  </div>
  <Footer />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
body,
html {
  background-color: black !important;
  color: white !important;
  font-family: 'Anton', sans-serif !important;
  background-image: url('@/assets/Background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

<script lang="ts" setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>