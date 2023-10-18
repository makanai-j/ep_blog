<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GetData from '../../data_base/GetData'

const header = useRoute()

let id = header.params.id
console.log(id)

const detailData = ref('')
const content = ref('')
const isGetData = ref(true)

let getData = async () => {
  detailData.value = (await new GetData('diary', `select * from diaries where id_diary = ${id}`).fetchData()).data
  if (detailData.value != false) {
    let element = document.getElementById('detailContent')
    console.log(decodeURI(detailData.value[0]['diary_content']))
    element.innerHTML = decodeURI(detailData.value[0]['diary_content'])
    return
  } else {
    isGetData.value = false
  }
}

getData()
</script>

<template>
  <div v-if="isGetData" id="detailContent"></div>
  <div v-else id="false">データの取得に失敗しました。</div>
</template>
