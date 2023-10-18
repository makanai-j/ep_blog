<script setup>
/*idea
 *タグにホバーした時に関連するblogタイトルを
 *吹き出しのような形で表示する
 */

defineProps({
  tag: String,
})
</script>

<template>
  <router-link class="tag" :to="'/diaryList/tag-' + tag" style="text-decoration: none">
    <span>#</span><slot></slot>
  </router-link>
</template>

<style>
.tag {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: baseline;
  white-space: nowrap;
  color: rgb(30, 30, 30);
  margin: 2px;
  padding: 5px 5px;
  font-size: 12px;
  font-weight: 400;
  background-color: rgb(200, 200, 200, 0.5);
}
.tag:hover {
  color: rgb(90, 90, 90, 0.6);
}
</style>
