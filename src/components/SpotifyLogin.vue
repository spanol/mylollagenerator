<template>
  <button @click="loginWithSpotify" type="button" class="btn btn-lg btn-success">Log in with spotify</button>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';

const store = useStore();
const loginWithSpotify = () => {
  store.dispatch('loginWithSpotify');
};
</script>