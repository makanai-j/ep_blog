<script setup>
import { ref, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  time: Number,
  chars: [String],
})

const centerSlide = defineModel('centerSlide')

watch(centerSlide, (newId) => {
  console.log(newId)
})

const timeOutId = ref()
const timeLine = ref()

let startScrollIndicator = (el) => {
  if ('i-' + (props.chars.length - 1) == el.id) {
    //moveScrollIndicator()
  }
}

let moveScrollIndicator = (targetId) => {
  let circle = document.getElementById('circle')
  let target = document.getElementById(targetId)
  gsap.to(target, {
    rotate: 360,
    duration: props.time,
    onComplete: async () => {
      gsap.set(target, { rotate: '0rad' })
    },
  })
  //timeOutId.value = setTimeout(moveScrollIndicator, props.time * 1000)
}

let updateScrollIndicator = (index) => {
  clearTimeout(timeOutId.value)
  count.value = index
  timeOutId.value = setTimeout(moveScrollIndicator, props.time * 1000)
}
</script>

<template>
  <div class="indicator-outer">
    <div id="circle"></div>
    <transition-group tag="div" class="indicator-group" appear @enter="startScrollIndicator">
      <div v-for="(char, index) in chars" :key="index" class="indicator" :id="'image-' + index + '-indicator'">
        <button>{{ char }}</button>
      </div>
    </transition-group>
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
}
</style>
