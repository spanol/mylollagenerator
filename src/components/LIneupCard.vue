<template>
  <div v-if="artists" class="template-wrapper rounded-4 shadow-lg pt-5">
    <div class="lineup d-flex justify-content-around align-items-sm-center pt-0 pt-md-5">
      <div class="featured text-end ps-3">
        <template v-for="featuredArtist in featuredArtists">
          <h2>
            {{ featuredArtist.name }}
          </h2>
        </template>
      </div>

      <div class="standard d-flex flex-wrap ps-3">
        <template v-for="(artist, index) in artists?.slice(7)">
          <span class="artist-name" :class="{ 'mr-2': index < (artists.length - 1) - 7 }">
            {{ artist.name }}
          </span>
          <i v-if="index < (artists.length - 1) - 7" class="bullet-point text-success">&nbsp;•&nbsp;</i>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.template-wrapper {
  background-image: url('@/assets/Lolla-template.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 800px;
  height: 916px;

  @media (max-width: 992px) {
    width: 700px;
    height: 808px;
  }

  @media (max-width: 768px) {
    width: 600px;
    height: 604px;
  }

  @media (max-width: 368px) {
    width: 400px;
    height: 500px;
  }



  .lineup {
    margin-top: 85px;
    color: black;
    text-transform: uppercase;

    @media (max-width: 992px) {
      margin-top: 55px;
    }

    @media(max-width: 576px){
      max-height: 305px;
      overflow: hidden;
    }

    .featured {
      h2 {
        font-size: 3rem !important;

        @media (max-width: 992px) {
          font-size: 2.5rem !important;
        }

        @media (max-width: 768px) {
          font-size: 2rem !important;
        }

        @media (max-width: 576px) {
          font-size: 1.9rem !important;
        }

        @media (max-width: 368px) {
          font-size: 1.5rem !important;
        }
      }
    }

    .standard {
      font-size: 1.7rem !important;

      @media (max-width: 992px) {
        font-size: 1.5rem !important;
      }

      @media (max-width: 768px) {
        font-size: 1.1rem !important;
      }

      @media (max-width: 576px) {
        font-size: 1rem !important;
      }

      @media (max-width: 368px) {
          font-size: .8rem !important;
        }
    }

  }

}
</style>

<script lang="ts" setup>
import { Artist } from '@/types/SpotifyTypes';
import { PropType, computed } from 'vue';

const props = defineProps({
  artists: {
    type: Object as PropType<Artist[] | null>,
    required: true
  }
})

const featuredArtists = computed(() => props.artists?.slice(0, 7));
</script>