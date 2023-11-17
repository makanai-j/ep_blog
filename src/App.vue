<script setup>
import Header from './components/ui_parts/MainHeader.vue'
import Footer from './components/ui_parts/MainFooter.vue'

onMounted(() => {
  let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`)
})
</script>

<template>
  <Header></Header>
  <div class="main">
    <div class="section-content">
      <router-view />
    </div>
  </div>
  <Footer></Footer>
</template>

<style>
:root {
  --scrollBarWidth: 0px;
}
@font-face {
  font-family: 'customFont';
  src: url('../NotoSerifJP-Regular_.woff');
}
.main {
  width: calc(100vw - var(--scrollBarWidth));
  background: black;
}
.section-content {
  width: 95%;
  margin: auto;
  background: white;
}
.router-link-active {
  font-weight: bold;
}
</style>
