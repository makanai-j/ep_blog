<script setup>
import { onMounted, ref } from 'vue'

const images = ref([])
const validScroll = ref(false)

let getData = () => {
  let i = 0
  for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    images.value.push(i)
  }
}
getData()

const slides = ref(null)

onMounted(() => {
  for (let slide of slides.value.children) {
    slide.classList.add('slide')
  }
})

let mouseX = -10
let startTime = 0
let distanceX = 0
let spead = 0

let scroll = (element) => {
  let x = element.clientX
  if (mouseX > 0) {
    let diff = mouseX - x
    let elapsedTime = Date.now() - startTime
    if (elapsedTime > 30) {
      distanceX = 0
      startTime = Date.now()
      elapsedTime = 1
    }
    distanceX += diff
    spead = Math.floor((distanceX / elapsedTime) * 100)
    let leftOffset = Math.abs(slides.value.scrollLeft) + diff
    slides.value.scrollTo(leftOffset, 0)
  } else {
    startTime = Date.now()
  }
  mouseX = x
}

let scrollCancel = () => {
  if (Math.abs(spead) > 200) {
    adjustCenter(spead)
  } else {
    adjustCenter()
  }

  spead = 0
  validScroll.value = false
  mouseX = -10
}

let adjustCenter = (place = 0) => {
  let windowOffsetCenter = window.innerWidth / 2
  let slideElements = slides.value.children
  for (let element of slideElements) {
    let slidesOffsetCenter = slides.value.scrollLeft + windowOffsetCenter
    let harfWidth = element.clientWidth / 2

    if (element.offsetLeft <= slidesOffsetCenter && element.offsetLeft + element.clientWidth >= slidesOffsetCenter) {
      let moveDistance = 0
      if (place > 0) {
        moveDistance = element.clientWidth
      } else if (place < 0) {
        moveDistance = -element.clientWidth
      }
      slides.value.scrollTo({
        left: element.offsetLeft + harfWidth - windowOffsetCenter + moveDistance,
        behavior: 'smooth',
      })
      break
    }
  }
}
</script>

<template>
  <div class="slider-container">
    <div class="slider">
      <div
        ref="slides"
        class="slides"
        v-on="{
          pointerdown: () => {
            validScroll = true
          },
          pointerup: validScroll ? scrollCancel : undefined,
          pointercancel: validScroll ? scrollCancel : undefined,
          pointerleave: validScroll ? scrollCancel : undefined,
          selectstart: (e) => {
            e.preventDefault()
          },
          mousemove: validScroll ? scroll : undefined,
        }"
      >
        <slot></slot>
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
  overflow-x: scroll;
  -ms-overflow-style: none;
}
.slides::-webkit-scrollbar {
  display: none;
}
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
}
</style>
