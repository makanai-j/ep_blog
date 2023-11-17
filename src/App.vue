<script setup>
import Header from './components/ui_parts/MainHeader.vue'
import Footer from './components/ui_parts/MainFooter.vue'
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
@font-face {
  font-family: 'customFont';
  src: url('../NotoSerifJP-Regular_.woff');
}
.main {
  width: 100vw;
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
