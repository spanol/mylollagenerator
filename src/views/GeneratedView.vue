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
import { validateState } from '@/services/api';
import { toast } from 'vue3-toastify';

import DownloadAsPNG from '@/components/DownloadAsPNG.vue';
import LIneupCard from '@/components/LIneupCard.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import router from '@/router';

const store = useStore();
const route = useRoute();

let isLoading = ref<boolean>(false);
const artists = ref<Artist[] | null>(null);

onMounted(async () => {
  const code = route.query.code as string | null;
  const state = route.query.state as string | null;
  isLoading.value = true;

  if (!code || !validateState(state)) {
    router.push({ path: '/' });
    toast.error('Something went wrong!');
    return;
  }

  try {
    await store.dispatch('getAccessToken', code);
    artists.value = await store.dispatch('getTop', 'artists');
    toast.success('Your Lollapalooza line-up is ready!!!');
  } catch (error) {
    console.error('Failed to authenticate with Spotify', error);
    router.push({ path: '/' });
    setTimeout(() => toast.error('Could not authenticate. Please try again.'), 1000);
  } finally {
    isLoading.value = false;
  }
});
</script>
