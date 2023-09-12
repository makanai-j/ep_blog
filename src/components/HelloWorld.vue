<script setup>
import { ref } from 'vue'
import helloPlugin from './plugins/GlobalPlugin'
import GetURL from './plugins/GetURL'

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
//テキストの表示と非表示
let disabled = ref(false)
// テキスト以外を押したときにテキストを消す
// 関数の有効・無効
const closeOnClickOutside = ref(true)

const num = ref(4)

let url = GetURL.diary
</script>

<template>
  <h1>{{ url }}</h1>
  <p>{{ content }}</p>
  <button @click="plus_">plus {{ num }}</button>
  <h3>{{ count }}</h3>
  <HelloPlugin :disabled="disabled" :closeOnClickOutside="closeOnClickOutside" @change-show="disabled = !disabled">
    <template #title> EP </template>
    <template #text> 何かしらの何か </template>
  </HelloPlugin>
  <slot name="firstName" :text="fn"></slot>
</template>
