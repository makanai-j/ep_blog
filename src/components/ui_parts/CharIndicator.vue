<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  time: Number,
  chars: [String],
})

const count = defineModel('count')
const isAutoSlide = defineModel('isAutoSlide')

const timeOutId = ref()

let startScrollIndicator = (el) => {
  if ('i-' + (props.chars.length - 1) == el.id) {
    moveScrollIndicator()
  }
}

let moveScrollIndicator = () => {
  let circle = document.getElementById('circle')
  let target = document.getElementById('i-' + (count.value % props.chars.length))
  gsap.to(target, {
    rotate: 360,
    duration: props.time,
    onComplete: async () => {
      gsap.set(target, { rotate: '0rad' })
      if (isAutoSlide.value) {
        await count.value++
        moveScrollIndicator()
      }
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
      <div v-for="(char, index) in chars" :key="index" class="indicator" :id="'i-' + index">
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
  line-height: var(--indicatorSize);
  margin: var(--indicatorSize);
  width: var(--indicatorSize);
  height: var(--circleSize);
}

.indicator-group {
  display: flex;
  --indicatorSize: 35px;
  justify-content: center;
}

.indicator button {
  text-align: center;
  font-family: serif;
  font-weight: bold;
  color: black;
}
</style>
