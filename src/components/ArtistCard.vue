<template>
  <div class="card m-2 my-3">
    <div class="image-container">
      <img :src="imageUrl" :alt="'Artist Image:' + name" />
    </div>
    <div class="info">
      <p class="name">{{ name }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';

interface ArtistCardProps {
  name: string;
  imageUrl: string;
}

const props = defineProps<ArtistCardProps>();
const { name, imageUrl } = toRefs(props);
</script>

<style lang="scss">
.card {
  background-color: #121212;
  width: 250px;
  height: 300px;
  pointer-events: none;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  color: #ffffff;
  transition: transform .2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .image-container {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .info {
    padding: 10px;
    .name {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>