<script setup></script>

<template>
  <div class="topic-container">
    <div class="topic-title">
      <slot name="title"></slot>
    </div>
    <div class="topic-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style>
.topic-container {
  position: relative;
}
.topic-title,
.topic-content {
  position: absolute;
}
.topic-title {
  padding: 5px;
  border-radius: 5px;
  z-index: 2;
}
.topic-content {
  padding: 10px 15px;
  margin: 20px 10px;
  border-radius: 5px;
}
</style>
