<script setup>
import { useRoute } from 'vue-router'

const header = useRoute()
let id = header.params.id
</script>

<template>
  {{ id }}
</template>
