<template>
  <div class="d-flex justify-content-center mt-4">
    <button class="btn btn-large btn-primary" @click="downloadImage">Download as PNG and share with your friends!!!</button>
  </div>
</template>

<script lang="ts" setup>
import html2canvas from 'html2canvas';

const props = defineProps({
  elementClass: {
    type: String,
    required: true,
  },
});

const downloadImage = async () => {
  const element = document.querySelector(props.elementClass) as HTMLElement;

  if (element) {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = 'lineup-image.png';
    link.click();
  }
};
</script>