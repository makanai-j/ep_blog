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

const centerSlide = ref(0)

let slidesClassName = []

const validScroll = ref(true)
const validScrollMouse = ref(false)
const validScrollTouch = ref(false)

const intervalId = ref()

const slides = ref(null)

let count = 0
let onMountedCustom = async (e) => {
  count++
  console.log(e.key)
  if (count >= props.numItems) {
    slidesClassName = []

    Array.from(slides.value.children).forEach((slide, index) => {
      let ulid = `slide-${index}${Math.floor(Math.random() * 10000)}`
      slide.classList.add('slide', ulid)
      slidesClassName.push(ulid)
    })

    adjustCenterByClassName(slidesClassName[0], 0)
    autoSlide()
  }
}

window.addEventListener('resize', () => {
  let slideLen = slides.value.children.length
  let targetElement = slides.value.children[Math.floor(slideLen / 2)]
  gsap.to(slides.value, { duration: 0, scrollTo: { x: targetElement, offsetX: slideOffsetX(targetElement) } })
})

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
  if (!validScroll.value) return
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
      e.preventDefault()
      slides.value.scrollTo(leftOffset, 0)
    }
  } else {
    startTime = Date.now()
  }
  mouseX = x
}

let scrollCancel = (e) => {
  //e.preventDefault()
  if (Math.abs(totalDistanceX.value) > 1) {
    if (Math.abs(spead) > 200) {
      adjustCenter(spead)
    } else {
      adjustCenter()
    }
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

let getSlidesClassName = (node) => {
  const classList = node.className.split(' ').filter((cn) => {
    return slidesClassName.includes(cn)
  })
  return classList[0]
}

let gsapScrollTo = (target, duration, onCompParas) => {
  validScroll.value = false
  gsap.to(slides.value, {
    duration: duration,
    scrollTo: { x: target, offsetX: slideOffsetX(slides.value.children[0]) },
    onComplete: (className, index) => {
      replaceImage(index)

      if (intervalId.value === null) {
        autoSlide()
      }

      validScroll.value = true
      totalDistanceX.value = 0
      centerSlide.value = slidesClassName.indexOf(className)
    },
    onCompleteParams: onCompParas,
  })
}

let adjustCenter = (place = 0, duration = 0.5) => {
  let windowOffsetCenter = window.innerWidth / 2
  let slideElements = slides.value.children
  let slideLen = slideElements.length
  for (let index = 0; index < slideLen; index++) {
    let element = slideElements[index]
    let slidesOffsetCenter = slides.value.scrollLeft + windowOffsetCenter
    if (element.offsetLeft + element.clientWidth >= slidesOffsetCenter) {
      let targetClassName = getSlidesClassName(element)
      console.log(targetClassName)
      if (place > 0 && index < slideElements.length - 1) {
        targetClassName = getSlidesClassName(slideElements[(index + 1) % slideLen])
        index++
      } else if (place < 0 && index > 0) {
        targetClassName = getSlidesClassName(slideElements[(index - 1) % slideLen])
        index--
      }

      gsapScrollTo('.' + targetClassName, duration, [targetClassName, index])

      break
    }
  }
}

let adjustCenterByClassName = (className, duration = 0.5) => {
  let index = 0
  Array.from(slides.value.children).map((e, i) => {
    if (e.className.includes(className)) {
      index = i
    }
  })
  gsapScrollTo('.' + className, duration, [className, index])
}

let adjustCenterByIndex = (initialIndex, duration = 0.5) => {
  const className = slidesClassName[initialIndex]
  let nowIndex = 0
  Array.from(slides.value.children).map((e, i) => {
    if (e.className.includes(className)) {
      nowIndex = i
    }
  })

  gsapScrollTo('.' + className, duration, [className, nowIndex])
}

let replaceImage = (index) => {
  let slideLen = slides.value.children.length
  let centerNum = Math.floor(slideLen / 2)
  if (index !== null) {
    for (let i = index; i != centerNum; i += i < centerNum ? 1 : -1) {
      if (i > centerNum) {
        slides.value.append(slides.value.children[0])
      } else {
        slides.value.prepend(slides.value.children[slideLen - 1])
      }
    }
  }
  let targetElement = slides.value.children[centerNum]
  //gsapScrollTo(targetElement, 0)
  gsap.to(slides.value, { duration: 0, scrollTo: { x: targetElement, offsetX: slideOffsetX(targetElement) } })
}

let slideOffsetX = (slideElement) => {
  return (window.innerWidth - slideElement.clientWidth) / 2
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
          mousemove: validScrollMouse ? scroll : undefined,

          mouseup: validScrollMouse ? scrollCancel : undefined,
          pointercancel: validScrollMouse ? scrollCancel : undefined,
          pointerleave: validScrollMouse ? scrollCancel : undefined,

          touchstart: () => {
            if (!validScrollMouse) {
              validScrollTouch = true
            }
          },
          touchmove: validScrollTouch ? scroll : undefined,

          touchend: validScrollTouch ? scrollCancel : undefined,
          touchCancel: validScrollTouch ? scrollCancel : undefined,

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
    @adjust-cente="adjustCenterByIndex"
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
