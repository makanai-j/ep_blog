<script setup>
import TagButton from './TagButton.vue'

const props = defineProps({ tags: String })
</script>

<template>
  <article>
    <p class="date"><slot name="date"></slot></p>
    <h2>
      <a class="title" href="./" style="text-decoration: none"><slot name="title"></slot></a>
    </h2>
    <div class="tags">
      <Tag-Button v-for="tag in props.tags" :key="tag"> {{ tag }} </Tag-Button>
    </div>
  </article>
</template>

<style>
article {
  min-height: 7em;
}
article h2 {
  margin: 5px 0 10px 0;
  text-align: start;
}
article .title {
  font-size: 25px;
}
article .title:hover {
  color: rgb(255, 255, 255, 0.7);
}
article .date {
  font-size: 11px;
}
article .date,
article .title {
  text-align: start;
  color: white;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>
