<script setup>
import Header from './components/ui_parts/MainHeader.vue'
import Footer from './components/ui_parts/MainFooter.vue'
import { ref, onMounted, onUpdated } from 'vue'

let setScrollbarWidth = () => {
  let width = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.setProperty('--scrollbarWidth', `${width}px`)
  console.log(width)
}
setScrollbarWidth()
window.addEventListener('resize', () => {
  setScrollbarWidth()
})
</script>

<template>
  <Header></Header>
  <div class="main">
    <router-view />
  </div>
  <Footer></Footer>
</template>

<style>
:root {
  --scrollbarWidth: 0px;
}
@font-face {
  font-family: 'customFont';
  src: url('../NotoSerifJP-Regular_.woff');
}
.main {
  width: calc(100vw - var(--scrollbarWidth));
}
.router-link-active {
  font-weight: bold;
}
</style>
