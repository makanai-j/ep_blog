<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GetData from '../../data_base/GetData'

const header = useRoute()
let id = header.params.id
let listData = ref('')

let getData = async () => {
  listData.value = await new GetData('diary', 'select * from diaries').fetchData()
}
</script>

<template>
  <p>{{ str.params.id }}</p>
</template>
