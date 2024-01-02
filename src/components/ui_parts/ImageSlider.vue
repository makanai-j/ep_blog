<script setup>
import { onMounted, ref } from 'vue'

const validScrollMouse = ref(false)
const validScrollTouch = ref(false)

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
let wheelTimeout = null

let scroll = (element) => {
  let x = 0
  if (element.type == 'mousemove') {
    x = element.clientX
  } else if (element.type == 'touchmove') {
    x = element.changedTouches[0].pageX
  }

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
    //speadText.value = spead
    let leftOffset = Math.abs(slides.value.scrollLeft) + diff
    //slides.value.scrollTo(leftOffset, 0)
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
  validScrollMouse.value = false
  validScrollTouch.value = false
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
      let lastElementLeft = element.clientWidth * (slideElements.length - 1)
      let offsetWindowLeft = element.offsetLeft + harfWidth - windowOffsetCenter + moveDistance

      if (slides.value.scrollLeft >= 0 && slides.value.scrollLeft <= lastElementLeft) {
        slides.value.scrollTo({
          left: offsetWindowLeft,
          behavior: 'smooth',
        })
      }

      break
    }
  }
}

let wheelEvent = () => {
  if (!validScrollMouse.value && !validScrollTouch.value) {
    if (wheelTimeout) {
      clearTimeout(wheelTimeout)
    }
    wheelTimeout = setTimeout(() => {
      scrollCancel()
    }, 100)
  }
}
</script>

<template>
  <div class="slider-container">
    <div class="slider" @scrollend="testText = 'slider'">
      <div
        ref="slides"
        class="slides"
        v-on="{
          mousedown: () => {
            if (!validScrollTouch) {
              validScrollMouse = true
              console.log('mousedown')
            }
          },
          mouseup: validScrollMouse ? scrollCancel : undefined,
          pointercancel: validScrollMouse ? scrollCancel : undefined,
          pointerleave: validScrollMouse ? scrollCancel : undefined,
          mousemove: validScrollMouse ? scroll : undefined,

          touchstart: () => {
            if (!validScrollMouse) {
              validScrollTouch = true
              console.log('touchstart')
            }
          },
          touchend: validScrollTouch ? scrollCancel : undefined,
          touchCancel: validScrollTouch ? scrollCancel : undefined,
          touchmove: validScrollTouch ? scroll : undefined,

          wheel: wheelEvent,

          selectstart: (e) => {
            e.preventDefault()
          },
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
