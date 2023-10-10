<script setup>
import TagButton from './TagButton.vue'

const props = defineProps({ tags: String })
</script>

<template>
  <article>
    <div>
      <p class="date"><slot name="date"></slot></p>
    </div>
    <div>
      <h2>
        <a class="title" href="./" style="text-decoration: none"><slot name="title"></slot></a>
      </h2>
    </div>
    <div class="tags">
      <Tag-Button v-for="tag in props.tags" :key="tag"> {{ tag }} </Tag-Button>
    </div>
  </article>
</template>

<style>
article {
  min-height: 7em;
}
article .title {
  margin: 5px 0 10px 0;
  color: white;
  font-size: 25px;
}
article .title:hover {
  color: rgb(255, 255, 255, 0.7);
}
article .date {
  font-size: 11px;
}
article .data,
article .title {
  text-align: left;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>
