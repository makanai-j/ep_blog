<script setup>
import { ref } from 'vue'
import DiaryList from '../ui_parts/DiaryList.vue'
import ImageSlider from '../ui_parts/ImageSlider.vue'
import TopicCard from '../ui_parts/TopicCard.vue'

const images = ref([])
let getData = () => {
  let i = 0
  for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    images.value.push(i)
  }
}
getData()
</script>

<template>
  <TopicCard>
    <template #title> </template>
    <template #content>bbbb</template>
  </TopicCard>
  <DiaryList></DiaryList>
  <ImageSlider>
    <!--<div class="empty-slide"></div>-->
    <div v-for="image in images" :key="image" class="image">{{ image }}</div>
    <!--<div class="empty-slide"></div>-->
  </ImageSlider>
</template>

<style>
:root {
  --slideWidth: 100%;
}
.image {
  width: var(--slideWidth);
  height: 250px;
  background: rebeccapurple;
}
.empty-slide {
  width: calc((100% - var(--slideWidth)) / 2);
}
</style>
