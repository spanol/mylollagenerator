<template>
  <footer class="mt-5 d-flex flex-column text-center justify-content-center">
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
    name: 'Facebook', icon: 'bi-facebook', link: 'https://www.facebook.com/zast.oficial'
  },
  {
    name: 'Instagram', icon: 'bi-instagram', link: 'https://www.instagram.com/zast.oficial'
  },
  {
    name: 'Twitter', icon: 'bi-twitter', link: 'https://twitter.com/zast_delivery'
  },
  {
    name: 'Youtube', icon: 'bi-youtube', link: 'https://www.youtube.com/channel/UC-nulVD2BotUooH-p17wbWA'
  },
  {
    name: 'Linkedin', icon: 'bi-linkedin', link: 'https://www.linkedin.com/company/zast/?viewAsMember=true'
  }
]
</script>

<style scoped lang="scss">
.link{
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
}

.icon{
  font-size: 2rem;
  color: #fff;
  margin: 0 1rem;
  border-radius: 50%;
}
</style>