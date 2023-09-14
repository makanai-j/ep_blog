<script setup>
import { ref, watch } from 'vue'
import DiaryTitleAndTagList from '../ui_parts/DiaryTitleAndTagList.vue'
import GetData from '../../data_base/GetData'

let diaryDBObj = new GetData('diary', 'select * from diaries')
const data = ref(diaryDBObj.fetchData())
/*
console.log(data)
watch(data, () => {
  console.log(data)
})*/

//通常時

//tag選択時
</script>
<template>
  {{ data }}
  <DiaryTitleAndTagList></DiaryTitleAndTagList>
</template>
