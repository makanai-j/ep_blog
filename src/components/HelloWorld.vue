<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  content: String,
  count: Number,
})
const emit = defineEmits(['plus', 'changeFn'])

let plus_ = () => {
  emit('plus', num.value)
  emit('changeFn')
}

const num = ref(4)
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ content }}</p>
  <button @click="plus_">plus {{ num }}</button>
  <h3>{{ count }}</h3>
  <slot name="firstName" :text="fn"></slot>
</template>
