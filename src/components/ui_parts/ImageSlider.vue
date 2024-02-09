<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const centerSlide = defineModel('centerSlide')

const validScrollMouse = ref(false)
const validScrollTouch = ref(false)

const intervalId = ref()

const slides = ref(null)

onMounted(async () => {
  /*
  Array.from(slides.value.children).forEach((slide, index) => {
    slide.classList.add('slide')
    if (index < slides.value.children.length / 2) {
      slides.value.append(slide)
    }
  })

  let centerNum = Math.floor(slides.value.children.length / 2)
  gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })
  autoSlide()
  
  await nextTick(() => {
    console.log(slides.value.children.length)
    Array.from(slides.value.children).forEach((slide, index) => {
      slide.classList.add('slide')
      console.log(slide)
      if (index < slides.value.children.length / 2) {
        slides.value.append(slide)
        console.log(slide)
      }
    })

    let centerNum = Math.floor(slides.value.children.length / 2)
    gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })
    autoSlide()
  })*/
})

let onMountedCustom = async (e) => {
  console.log(e)
  /*


ここから
どうにかして、以下のイベントを v-for の最後の要素がマウントされたときに発火させるようにする


  Array.from(slides.value.children).forEach((slide, index) => {
    slide.classList.add('slide')
    if (index < slides.value.children.length / 2) {
      slides.value.append(slide)
    }
  })

  let centerNum = Math.floor(slides.value.children.length / 2)
  gsap.to(slides.value, { duration: 0, scrollTo: slides.value.children[centerNum] })
  autoSlide()*/
}

let mouseX = -10
let startTime = 0
let distanceX = 0
let spead = 0

let scroll = (element) => {
  clearInterval(intervalId.value)
  intervalId.value = null
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
    if (element.type == 'mousemove' || element.type == 'touchmove') {
      slides.value.scrollTo(leftOffset, 0)
    }
  } else {
    startTime = Date.now()
  }
  mouseX = x
}

let scrollCancel = () => {
  let windowOffsetCenter = window.innerWidth / 2
  if (Math.abs(spead) > 200 && windowOffsetCenter > Math.abs(distanceX)) {
    adjustCenter(spead)
  } else {
    adjustCenter()
  }

  spead = 0
  validScrollMouse.value = false
  validScrollTouch.value = false
  mouseX = -10
}

let autoSlide = () => {
  intervalId.value = setInterval(() => {
    adjustCenter(1)
  }, 6000)
}

let adjustCenter = (place = 0) => {
  let windowOffsetCenter = window.innerWidth / 2
  let slideElements = slides.value.children
  for (let element of slideElements) {
    let slidesOffsetCenter = slides.value.scrollLeft + windowOffsetCenter

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
        onComplete: (dist, targetId) => {
          replaceImage(dist)

          if (intervalId.value == null) {
            autoSlide()
          }

          centerSlide.value = targetId
        },
        onCompleteParams: [place, targetId],
      })
      break
    }
  }
}

let replaceImage = (dist) => {
  if (dist > 0) {
    slides.value.append(slides.value.children[0])
  } else if (dist < 0) {
    slides.value.prepend(slides.value.children[slides.value.children.length - 1])
  }
  let centerNum = Math.floor(slides.value.children.length / 2)
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
