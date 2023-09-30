<template>
  <button @click="loginWithSpotify" type="button" class="btn btn-success">Log in with spotify</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store';

const store = useStore();
const loginWithSpotify = () => {
  store.dispatch('loginWithSpotify');
};

const accessToken = computed(() => store.getters.accessToken);
console.log(accessToken.value)
</script>