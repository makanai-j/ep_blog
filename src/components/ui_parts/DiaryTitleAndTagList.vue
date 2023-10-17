<script setup>
import TagButton from './TagButton.vue'

const props = defineProps({
  tags: String,
  id: String,
})
</script>

<template>
  <article>
    <p class="date"><slot name="date"></slot></p>
    <h2>
      <router-link class="title" :to="'/diary/id-' + props.id" style="text-decoration: none">
        <slot name="title"></slot>
      </router-link>
    </h2>
    <div class="tags">
      <Tag-Button v-for="tag in props.tags" :key="tag" :tag="tag"> {{ tag }} </Tag-Button>
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
  font-family: 'customFont', serif;
  font-size: 25px;
  font-weight: bold;
}
article .title:hover {
  color: rgb(100, 100, 100, 0.7);
}
article .date {
  font-size: 11px;
}
article .date,
article .title {
  text-align: start;
  color: black;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>
