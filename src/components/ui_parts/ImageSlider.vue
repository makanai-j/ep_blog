<script setup>
import { onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const numberSlide = defineModel('numberSlide')
const isAutoSlide = defineModel('isAutoSlide')

watch(numberSlide, (newNum, oldNum) => {
  if (isAutoSlide.value) {
    adjustCenter(1)
  }
})

const validScrollMouse = ref(false)
const validScrollTouch = ref(false)

const slides = ref(null)
onMounted(() => {
  Array.from(slides.value.children).forEach((slide, index) => {
    slide.classList.add('slide')
    if (index < slides.value.children.length / 2) {
      slides.value.append(slide)
    }
  })

  let centerNum = Math.floor(slides.value.children.length / 2)
  gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })
})

let mouseX = -10
let startTime = 0
let distanceX = 0
let spead = 0
let wheelTimeout = null

let scroll = (element) => {
  getSpeed(element)
}
/*
次：「(タッチイベントやマウスダウンイベントの開始地点から終了地点までの距離) > (スライド幅 / 2) 」の時に次のスライドへ移動

あと、countのrefがある意味なくなってきたかも、ターゲットがずっと中心にいるようにすれば
*/
let getSpeed = (element) => {
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
    let leftOffset = Math.abs(slides.value.scrollLeft) + diff
    if (element.type == 'mousemove') {
      slides.value.scrollTo(leftOffset, 0)
    }
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
    //let harfWidth = element.clientWidth / 2

    if (element.offsetLeft <= slidesOffsetCenter && element.offsetLeft + element.clientWidth >= slidesOffsetCenter) {
      let targetId = element.id
      let num = Array.from(slideElements).indexOf(element)

      if (place > 0 && num < slideElements.length - 1) {
        targetId = slideElements[(num + 1) % slideElements.length].id
      } else if (place < 0 && num > 0) {
        targetId = slideElements[(num - 1) % slideElements.length].id
      }

      gsap.to(slides.value, {
        duration: 0.5,
        scrollTo: { x: '#' + targetId },
        onComplete: replaceImage,
        onCompleteParams: [place],
      })
      break
    }
  }
}

let replaceImage = (dist) => {
  if (dist >= 0) {
    slides.value.append(slides.value.children[0])
  } else if (dist < 0) {
    slides.value.prepend(slides.value.childre[slides.value.children.length - 1])
  }
  let centerNum = Math.floor(slides.value.children.length / 2)
  gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })

  isAutoSlide.value = true
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
    <div class="slider">
      <div
        ref="slides"
        class="slides"
        v-on="{
          mousedown: () => {
            if (!validScrollTouch) {
              isAutoSlide = false
              validScrollMouse = true
            }
          },
          mouseup: validScrollMouse ? scrollCancel : undefined,
          pointercancel: validScrollMouse ? scrollCancel : undefined,
          pointerleave: validScrollMouse ? scrollCancel : undefined,
          mousemove: validScrollMouse ? scroll : undefined,

          touchstart: () => {
            if (!validScrollMouse) {
              isAutoSlide = false
              validScrollTouch = true
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
