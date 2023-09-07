<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  disabled: Boolean,
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['change-show'])

onMounted(() => {
  if (props.closeOnClickOutside) {
    document.addEventListener('click', clickOutside)
  }
})

onUnmounted(() => {
  if (props.closeOnClickOutside) {
    document.removeEventListener('click', clickOutside)
  }
})

//refでdomを取得
//対象のdomにrefで変数と同じ名前をつける
const target = ref(null)
let clickOutside = (event) => {
  if (!target.value.contains(event.target) && props.closeOnClickOutside && props.disabled) {
    emit('change-show')
  }
}
</script>
<template>
  <div ref="target">
    <h1>title: <slot name="title"></slot></h1>
    <button @click="$emit('change-show')">show button</button>
    <p v-show="disabled">text:<slot name="text"></slot></p>
  </div>
</template>
