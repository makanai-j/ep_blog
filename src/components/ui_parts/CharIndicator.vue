<script setup>
import { computed, nextTick, onMounted } from 'vue'

const props = defineProps({
  numItems: {
    type: Number,
    required: true,
  },
})

const centerSlide = defineModel('centerSlide')

const epArray = computed(() => {
  return Array.from(Array(props.numItems), (_, i) => {
    return 'image-' + i == centerSlide.value ? 'p' : 'e'
  })
})
</script>

<template>
  <div class="indicator-outer">
    <div id="circle"></div>
    <div class="indicator-group">
      <div v-for="(char, index) in epArray" :key="index" class="indicator" :id="'image-' + index + '-indicator'">
        <button style="border: none" @click="$emit('adjustCenter', 'image-' + index)">{{ char }}</button>
      </div>
    </div>
  </div>
</template>

<style>
.indicator-outer {
  position: relative;
  display: flex;
  justify-content: center;
}

#circle {
  border-radius: 50%;
  background: #aaa;
  z-index: -1;
}

.indicator button,
#circle {
  margin: 2vw;
  width: var(--indicatorSize);
  max-width: 15vw;
  height: var(--circleSize);
  max-height: 15vw;
}
.indicator-group {
  display: flex;
  --indicatorSize: 35px;
  justify-content: center;
  overflow-wrap: normal;
}

.indicator button {
  font-size: 15px;
  text-align: center;
  font-family: serif;
  font-weight: bold;
  color: black;
  border: none;
  outline: none;
}
</style>
