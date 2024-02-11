<script setup>
import { onUnmounted, ref, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import CharIndicator from '../ui_parts/CharIndicator.vue'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const props = defineProps({
  numItems: {
    type: Number,
    required: true,
  },
})

const centerSlide = ref('')

const validScrollMouse = ref(false)
const validScrollTouch = ref(false)

const intervalId = ref()

const slides = ref(null)

let count = 0
let onMountedCustom = async (e) => {
  count++
  console.log(e.key)
  if (count >= props.numItems) {
    /*
    Array.from(slides.value.children).forEach((slide, index) => {
      if (index == 0) {
        centerSlide.value = slide.id
      }
      slide.classList.add('slide')
      if (index < slides.value.children.length / 2) {
        slides.value.append(slide)
      }
    })
    */
    adjustCenterById('image-0', 0)
    centerSlide.value = 'image-0'

    let centerNum = Math.floor(slides.value.children.length / 2)
    gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })
    autoSlide()
  }
}

onUnmounted(() => {
  clearInterval(intervalId.value)
  if (intervalId.value) intervalId.value = null
})

let mouseX = -10
let startTime = 0
let distanceX = 0
const totalDistanceX = ref(0)
let spead = 0

let scroll = (e) => {
  clearInterval(intervalId.value)
  if (intervalId.value) intervalId.value = null
  getSpeed(e)
}

let getSpeed = (e) => {
  let x = 0
  if (e.type == 'mousemove') {
    x = e.clientX
  } else if (e.type == 'touchmove') {
    x = e.changedTouches[0].pageX
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
    totalDistanceX.value += diff
    spead = Math.floor((distanceX / elapsedTime) * 100)
    let leftOffset = Math.abs(slides.value.scrollLeft) + diff
    if (e.type == 'mousemove' || e.type == 'touchmove') {
      slides.value.scrollTo(leftOffset, 0)
    }
  } else {
    startTime = Date.now()
  }
  mouseX = x
}

let scrollCancel = async (e) => {
  e.preventDefault()
  if (Math.abs(totalDistanceX.value) < 2) return
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

onBeforeRouteLeave((to, from, next) => {
  if (Math.abs(totalDistanceX.value) < 2) {
    next()
  } else {
    next(false)
  }
})

let autoSlide = () => {
  intervalId.value = setInterval(() => {
    adjustCenter(1)
  }, 6000)
}

let adjustCenter = (place = 0, duration = 0.5) => {
  let windowOffsetCenter = window.innerWidth / 2
  let slideElements = slides.value.children
  let slideLen = slideElements.length
  for (let index = 0; index < slideLen; index++) {
    let element = slideElements[index]
    let slidesOffsetCenter = slides.value.scrollLeft + windowOffsetCenter
    if (element.offsetLeft <= slidesOffsetCenter && element.offsetLeft + element.clientWidth >= slidesOffsetCenter) {
      let targetId = element.id

      if (place > 0 && index < slideElements.length - 1) {
        targetId = slideElements[(index + 1) % slideLen].id
        index++
      } else if (place < 0 && index > 0) {
        targetId = slideElements[(index - 1) % slideLen].id
        index--
      }

      gsap.to(slides.value, {
        duration: duration,
        scrollTo: { x: '#' + targetId },
        onComplete: (targetId, index) => {
          replaceImage(index)

          if (intervalId.value === null) {
            autoSlide()
          }

          totalDistanceX.value = 0
          centerSlide.value = targetId
        },
        onCompleteParams: [targetId, index],
      })

      break
    }
  }
}

let adjustCenterById = (id, duration = 0.5) => {
  let index = Array.from(slides.value.children)
    .map((e) => e.id)
    .indexOf(id)
  gsap.to(slides.value, {
    duration: duration,
    scrollTo: { x: '#' + id },
    onComplete: (targetId, index) => {
      replaceImage(index)

      if (intervalId.value === null) {
        autoSlide()
      }

      totalDistanceX.value = 0
      centerSlide.value = targetId
    },
    onCompleteParams: [id, index],
  })
}
/*
let replaceImage = (index) => {
  let slideLen = slides.value.children.length
  let centerNum = Math.floor(slideLen / 2)
  for (let i = index; i != centerNum; i += i < centerNum ? 1 : -1) {
    if (i < )
    if (i > centerNum) {
      slides.value.append(slides.value.children[0])
    } else {
      slides.value.prepend(slides.value.children[slideLen - 1])
    }
  }
  gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })
}
*/
let replaceImage = (index) => {
  let slideLen = slides.value.children.length
  let centerNum = Math.floor(slideLen / 2)
  for (let i = index; i != centerNum; i += i < centerNum ? 1 : -1) {
    if (i > centerNum) {
      slides.value.append(slides.value.children[0])
    } else {
      slides.value.prepend(slides.value.children[slideLen - 1])
    }
  }
  gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })
}
</script>

<template>
  <div class="slider-container">
    <div class="slider">
      <div
        ref="slides"
        class="slides"
        v-on="{
          mousedown: () => {
            if (!validScrollTouch) {
              validScrollMouse = true
            }
          },
          mouseup: validScrollMouse ? scrollCancel : undefined,
          pointercancel: validScrollMouse ? scrollCancel : undefined,
          pointerleave: validScrollMouse ? scrollCancel : undefined,
          mousemove: validScrollMouse ? scroll : undefined,

          touchstart: () => {
            if (!validScrollMouse) {
              validScrollTouch = true
            }
          },
          touchend: validScrollTouch ? scrollCancel : undefined,
          touchCancel: validScrollTouch ? scrollCancel : undefined,
          touchmove: validScrollTouch ? scroll : undefined,

          selectstart: (e) => {
            e.preventDefault()
          },
        }"
      >
        <transition-group appear @after-enter="onMountedCustom">
          <slot></slot>
        </transition-group>
      </div>
    </div>
  </div>
  <CharIndicator
    :numItems="numItems"
    @adjust-center="adjustCenterById"
    v-model:centerSlide="centerSlide"
  ></CharIndicator>
</template>

<style>
.slider {
  position: relative;
}
.slides {
  display: flex;
  position: relative;
  overflow-x: hidden;
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
