<template>
  <div v-if="artists" class="generated">
    <div class="d-flex justify-content-center">
      <LIneupCard :artists="artists" />
    </div>

    <DownloadAsPNG elementClass=".template-wrapper" />
  </div>

  <div v-else class="loading d-flex justify-content-center align-items-center">
    <LoadingComponent />
  </div>
</template>

<style lang="scss">
.loading{
  min-height: 100vh;
}

.generated, .loading {
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
import LoadingComponent from '@/components/LoadingComponent.vue';
import router from '@/router';

const store = useStore();
const route = useRoute();

let isLoading = ref<boolean>(false);
const accessToken = ref<string | null>(null);
const artists = ref<Artist[] | null>(null);



onMounted(async () => {
  const code = route.query.code as string | null;
  isLoading.value = true;
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
    setTimeout(() => toast.error('Não foi possível autenticar o usuário!!!'), 1000);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }
});
</script>
      
