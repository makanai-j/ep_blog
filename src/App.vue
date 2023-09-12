<script setup>
import Header from './components/ui_parts/MainHeader.vue'
import Footer from './components/ui_parts/MainFooter.vue'
</script>

<template>
  <div class="main">
    <Header></Header>
    <nav>
      <router-link to="/">Home</router-link><br />
      <router-link to="/diary">diary</router-link><br />
      <router-link to="/about">about</router-link><br />
      <router-link to="/about/1">about1</router-link><br />
      <router-link to="/about/2">about2</router-link><br />
      <button @click="$router.back()">back</button>
    </nav>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<style>
.main {
  width: 100vw;
}
.router-link-active {
  font-weight: bold;
}
</style>
