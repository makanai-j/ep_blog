<template>
  <a class="tag" style="text-decoration: none">
    <slot></slot>
  </a>
</template>

<style>
.tag {
  display: inline-block;
  color: rgb(37, 37, 37);
  margin: 2px;
  padding: 5px 5px;
  font-size: 12px;
  background-color: rgb(255, 255, 255, 0.85);
}
</style>
