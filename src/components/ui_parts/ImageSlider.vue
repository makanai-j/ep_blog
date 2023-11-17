<script setup>
import { ref } from 'vue'

const images = ref([])

let getData = () => {
  let i = 0
  for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    images.value.push(i)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getData()
})
</script>

<template>
  <div class="slider-container">
    <div class="slider">
      <div class="slides">
        <div v-for="image in images" :key="image" class="slide">
          {{ image }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slider {
  position: relative;
}
.slides {
  display: flex;
  position: relative;
  overflow: hidden;
}
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 50%;
  height: 100px;
  box-sizing: border-box;
}
</style>
