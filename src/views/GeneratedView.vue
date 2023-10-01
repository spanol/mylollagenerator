<template>
  <div class="generated d-flex">
    <div class="p-3">
      <Flicking :options="options">
        <div v-for="artist in artists" class="flicking-panel" :key="artist.id">
          <ArtistCard :image-url="artist.images[0].url" :name="artist.name"/>
        </div>
      </Flicking>
    </div>

  </div>
</template>

<style>
.generated{
  overflow-y: hidden;
}
</style>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { FlickingOptions } from '@egjs/vue3-flicking';
import { Artist } from '@/types/SpotifyTypes';
import  ArtistCard  from '@/components/ArtistCard.vue';

const options: Partial<FlickingOptions>= {
horizontal: false,
align: 'prev',
bound: false,
}
const store = useStore();
const route = useRoute();
const accessToken = ref<string | null>(null);
const artists = ref<Artist[] | null>(null);


onMounted(async () => {
  const code = route.query.code as string | null;
  console.log(code)
  if (code) {
    try {
      accessToken.value = await store.dispatch('getAccessToken', code);
      if(accessToken.value){
        artists.value =  await store.dispatch('getTop', 'artists');
        console.log(artists.value)
      }
    } catch (error) {
      console.error('Erro ao obter o token de acesso', error);
    }
  }
});


</script>