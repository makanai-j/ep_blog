<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const users = ref([])

let id = parseInt(route.params.id)

const fetchUser = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const data = await response.json()
  users.value = data
}

onMounted(() => {
  fetchUser()
  watch(route, () => {
    id = parseInt(route.params.id)
    fetchUser()
  })
})
</script>
<template>
  <h1>aboutVue : {{ id }}</h1>
</template>
