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
.main {
  width: 100vw;
}
.router-link-active {
  font-weight: bold;
}
div {
  background: gray;
}
</style>
