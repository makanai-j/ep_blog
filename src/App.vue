<script setup>
import Header from './components/ui_parts/MainHeader.vue'
import Footer from './components/ui_parts/MainFooter.vue'
</script>

<template>
  <Header></Header>
  <div class="main">
    <router-view />
  </div>
  <Footer></Footer>
</template>

<style>
@font-face {
  font-family: 'customFont';
  src: url('../NotoSerifJP-Regular_.woff');
  /*src: url('../_other/NotoSerifJP-Bold.otf');*/
}
.main {
  width: 100vw;
}
.router-link-active {
  font-weight: bold;
}
</style>
