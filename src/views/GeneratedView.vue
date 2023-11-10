<template>
  <div class="generated">
    <div class="d-flex justify-content-center">
      <LIneupCard :artists="artists" />
    </div>
    
    <DownloadAsPNG elementClass=".template-wrapper" />
  </div>
</template>

<style lang="scss">
.generated{
  padding-block: 180px;
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { Artist } from '@/types/SpotifyTypes';
import { toast } from 'vue3-toastify';

import DownloadAsPNG from '@/components/DownloadAsPNG.vue';
import LIneupCard from '@/components/LIneupCard.vue';
import router from '@/router';

const store = useStore();
const route = useRoute();
const accessToken = ref<string | null>(null);
const artists = ref<Artist[] | null>(null);



onMounted(async () => {
  const code = route.query.code as string | null;
  console.log(code)
  
  if (!code) {
    router.push({ path: '/' });
    toast.error('Something went wrong!');
  }

  try {
    accessToken.value = await store.dispatch('getAccessToken', code);
    if (accessToken.value) {
      artists.value = await store.dispatch('getTop', 'artists');
      toast.success('Your Lollapalooza line-up is ready!!!');
      console.log(artists.value)
    }
  } catch (error) {
    console.error('Erro ao obter o token de acesso', error);
    router.push({ path: '/' });
    setTimeout(()=> toast.error('Não foi possível autenticar o usuário!!!'), 1000);
  }
});
</script>