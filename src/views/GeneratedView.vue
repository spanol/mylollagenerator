<template>
  <div class="generated">

    <div class="d-flex justify-content-center mb-5">
      <template v-for="(artist, idx) in topArtists">
        <ArtistCard :class="'place-' + idx" :image-url="artist.images[0].url" :name="artist.name" />
      </template>
    </div>

    <!-- <div class="mt-5">
      <Flicking :options="options">
        <div v-for="artist in artists" class="flicking-panel" :key="artist.id">
          <ArtistCard :image-url="artist.images[0].url" :name="artist.name" />
        </div>
      </Flicking>
    </div> -->
  </div>
</template>

<style lang="scss">
.generated {
  .place-1 {
    border: 5px solid gold; // Borda dourada para o primeiro lugar
    border-radius: 10px; // Adiciona bordas arredondadas
  }

  .place-0 {
    border: 5px solid silver; // Borda prateada para o segundo lugar
    border-radius: 10px; // Adiciona bordas arredondadas
  }

  .place-2 {
    border: 5px solid #cd7f32; // Borda de bronze para o terceiro lugar
    border-radius: 10px; // Adiciona bordas arredondadas
  }

  .place-0, .place-2 {
    position: relative;
    top: 100px;
  }
}
</style>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { FlickingOptions } from '@egjs/vue3-flicking';
import { Artist } from '@/types/SpotifyTypes';
import ArtistCard from '@/components/ArtistCard.vue';

const options: Partial<FlickingOptions> = {
  align: 'prev',
  bound: false,
}
const store = useStore();
const route = useRoute();
const accessToken = ref<string | null>(null);
const artists = ref<Artist[] | null>(null);
const topArtists = ref<Artist[] | null>(null);


onMounted(async () => {
  const code = route.query.code as string | null;
  console.log(code)
  if (code) {
    try {
      accessToken.value = await store.dispatch('getAccessToken', code);
      if (accessToken.value) {
        artists.value = await store.dispatch('getTop', 'artists');

        if (artists.value && artists.value.length > 0) {
          topArtists.value = artists.value.slice(0, 3); // Modificado para usar slice ao invés de splice
        
          if (topArtists.value.length > 1) {
            const temp = topArtists.value[0];
            topArtists.value[0] = topArtists.value[1];
            topArtists.value[1] = temp;
          }
        }
      }
      console.log(artists.value)
    } catch (error) {
      console.error('Erro ao obter o token de acesso', error);
    }
  }
});


</script>