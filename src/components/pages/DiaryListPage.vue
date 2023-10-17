<script setup>
import { useRoute } from 'vue-router'
import GetData from '../../data_base/GetData'

const header = useRoute()
let id = header.params.id

let getData = async () => {
  informations.value = await new GetData('diary', 'select * from diaries where ').fetchData()
}
</script>

<template>
  <p>{{ str.params.id }}</p>
</template>
