<template>
  <footer class="footer mt-5 d-flex flex-column text-center justify-content-center">
    <div class="author">
      <p>Developed by: Vinicius Spanol</p>
    </div>

    <div class="socials">
      <div class="">
        <a class="icon" v-for="icon in icons" :key="icon.name" :href="icon.link" target="_blank">
          <i :class="icon.icon"></i>
        </a>
      </div>
    </div>

    <div class="help-me">
      
    </div>

  </footer>
</template>

<script setup lang="ts">
const icons = [
  {
    name: 'Facebook', icon: 'bi-facebook', link: 'https://www.facebook.com/'
  },
  {
    name: 'Instagram', icon: 'bi-instagram', link: 'https://www.instagram.com/'
  },
  {
    name: 'Twitter', icon: 'bi-twitter', link: 'https://twitter.com/'
  },
  {
    name: 'Linkedin', icon: 'bi-linkedin', link: 'https://www.linkedin.com/'
  }
]
</script>

<style scoped lang="scss">
.footer{
  position: relative;
  bottom: 0px;
  width: 100%;
  background-color: #1FDF64;
}
.link{
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
}

.icon{
  color: black;
  margin: 0 1rem;
  border-radius: 50%;
}
</style>