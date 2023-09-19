<script setup>
import TagButton from './TagButton.vue'

const props = defineProps({ tags: String })
</script>

<template>
  <article class="outside">
    <div>
      <p class="date"><slot name="date"></slot></p>
    </div>
    <div>
      <h2>
        <a class="title" style="text-decoration: none"><slot name="title"></slot></a>
      </h2>
    </div>
    <div>
      <ol>
        <li v-for="tag in props.tags" :key="tag">
          <Tag-Button> {{ tag }} </Tag-Button>
        </li>
      </ol>
    </div>
  </article>
</template>
