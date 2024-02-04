<script setup>
import { ref, watch } from 'vue'
import GetData from '../../data_base/GetData'
import DiaryList from '../ui_parts/DiaryList.vue'
import ImageSlider from '../ui_parts/ImageSlider.vue'
import TopicCard from '../ui_parts/TopicCard.vue'
import CharIndicator from '../ui_parts/CharIndicator.vue'

const numItem = 5
const images = ref([])

const numberIndicator = ref(0)

watch(numberIndicator, (newNum, oldNum) => {})

const chars = ref([])
let getData = async () => {
  let data = (
    await new GetData(
      'diary',
      `select id_diary, diary_title, diary_image from diaries order by id_diary desc limit ${numItem}`,
    ).fetchData()
  ).data
  if (data != false) {
    images.value = data

    for (const content of data) {
      chars.value.push(content['diary_title'].charAt(0))
    }
  }
}
getData()
</script>

<template>
  <ImageSlider :num-item="numItem">
    <div v-for="image in images" :key="image" class="image">
      <router-link :to="'/diary/' + image['id_diary']" style="text-decoration: none" tabindex="-1" draggable="false">
        <div id="diary-image" :style="{ 'background-image': 'url(' + image['diary_image'] + ')' }"></div>
      </router-link>
    </div>
  </ImageSlider>
  <CharIndicator :time="5" :chars="chars" v-model:count="numberIndicator"></CharIndicator>
  <TopicCard>
    <template #title> </template>
    <template #content></template>
  </TopicCard>
  <DiaryList></DiaryList>
</template>

<style>
:root {
  --slideWidth: 100%;
}
.image {
  width: 100vw;
  height: 50vh;
  background: none;
}
.image #diary-image {
  object-fit: cover;
  width: 100vw;
  height: 49.5vh;
}
.empty-slide {
  width: calc((100% - var(--slideWidth)) / 2);
}
</style>
