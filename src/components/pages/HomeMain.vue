<script setup>
import { ref, watch } from 'vue'
import GetData from '../../data_base/GetData'
import DiaryList from '../ui_parts/DiaryList.vue'
import ImageSlider from '../ui_parts/ImageSlider.vue'
import TopicCard from '../ui_parts/TopicCard.vue'

const numItem = 5
const images = ref([])

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
  <ImageSlider :numItems="images.length">
    <div v-for="(image, index) in images" :key="index" class="image">
      <router-link :to="'/diary/' + image['id_diary']" style="text-decoration: none" tabindex="-1" draggable="false">
        <div id="diary-image" :style="{ 'background-image': 'url(' + image['diary_image'] + ')' }"></div>
      </router-link>
    </div>
  </ImageSlider>
  <TopicCard>
    <template #title> </template>
    <template #content></template>
  </TopicCard>
  <DiaryList></DiaryList>
</template>

<style>
.image {
  background: none;
}
.image #diary-image {
  width: 70vw;
  height: 50vh;
  object-fit: cover;
}
</style>
