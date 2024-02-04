<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  time: Number,
  chars: [String],
})

const count = defineModel('count')

//const count = ref(0)
const timeOutId = ref()

let startScrollIndicator = (el) => {
  if ('i-' + (props.chars.length - 1) == el.id) {
    moveScrollIndicator()
  }
}

let moveScrollIndicator = () => {
  let target = document.getElementById('i-' + (count.value % props.chars.length))
  gsap.to(target, {
    rotate: 360,
    duration: props.time,
    onComplete: () => {
      gsap.set(target, { rotate: '0rad' })
    },
  })
  count.value++
  timeOutId.value = setTimeout(moveScrollIndicator, props.time * 1000)
}

let updateScrollIndicator = (index) => {
  clearTimeout(timeOutId.value)
  count.value = index
  timeOutId.value = setTimeout(moveScrollIndicator, props.time * 1000)
}
</script>

<template>
  <transition-group tag="div" name="outside-indicator" class="outside-indicator" appear @enter="startScrollIndicator">
    <div v-for="(char, index) in chars" :key="index" class="indicator" :id="'i-' + index">
      <button>{{ char }}</button>
    </div>
  </transition-group>
</template>

<style>
.outside-indicator {
  display: flex;
  justify-content: center;
}

.indicator {
  --indicatorSize: 35px;
  text-align: center;
  line-height: var(--indicatorSize);
  margin: var(--indicatorSize);
  width: var(--indicatorSize);
  height: var(--indicatorSize);
  font-family: serif;
  font-weight: bold;
  border-radius: 50%;
  background: #aaa;
  color: black;
}
</style>
