<template>
  <div class="interaction d-flex flex-column justify-content-center mt-5 text-center">
    <div class="informative">
      Make your own Lollapalooza line-up based on your Spotify top artists!!!
    </div>

    <div class="mt-5">
      <SpotifyLogin/>
    </div>

    <!-- <div class="d-flex flex-column mt-4">
      <label for="basic-url" class="form-label"> You can also connect your Last.fm
      </label>
      <div class="input-group mb-3 px-5">
        <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
        <input type="text" placeholder="Your nickname here..." class="form-control" id="basic-url"
          aria-describedby="basic-addon3">
        <button type="button" class="btn btn-danger">Log in with Last.fm</button>
      </div>
    </div> -->

  </div>
</template>

<script setup lang="ts">
import SpotifyLogin from '@/components/SpotifyLogin.vue'
</script>

<style lang="scss">
.interaction{
  min-height: 100vh;
}
</style>
