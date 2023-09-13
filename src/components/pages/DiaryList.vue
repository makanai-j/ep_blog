<script setup>
import { ref } from 'vue'
import DiaryTitleAndTagList from '../ui_parts/DiaryTitleAndTagList.vue'
import GetData from '../../data_base/GetData'

let diaryDBObj = new GetData('diary', 'select * from blogs')
const data = ref(diaryDBObj.fetchData())
//通常時

//tag選択時
</script>
<template>
  {{ data }}
  <DiaryTitleAndTagList></DiaryTitleAndTagList>
</template>
