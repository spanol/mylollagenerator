<template>
  Hello generated
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const accessToken = ref<string | null>(null);

onMounted(async () => {
  const code = route.query.code as string | null;
  console.log(code)
  if (code) {
    try {
      accessToken.value = await store.dispatch('getAccessToken', code);
      const topArtists =  await store.dispatch('getTopArtists')
      console.log(topArtists)
    } catch (error) {
      console.error('Erro ao obter o token de acesso', error);
    }
  }
});


</script>