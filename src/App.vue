<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import HomeFooter from './components/HomeFooter.vue'

let title = 'ep'
const content = ref('')
const count = ref(0)

let plus = (x) => {
  count.value += x
}

let changeFn = () => {
  if (fn.value == 'makanai') {
    fn.value = 'jumpei'
  } else {
    fn.value = 'makanai'
  }
}
</script>

<template>
  <div class="main">
    <HelloWorld :title="title" :content="content" @plus="plus" @change-fn="changeFn" :count="count">
      <template #firstName="{ text }">
        {{ text }}
      </template>
    </HelloWorld>
    <input v-model="content" />
    <HomeFooter></HomeFooter>
  </div>
</template>

<style>
.main {
  width: 100vw;
}
</style>
