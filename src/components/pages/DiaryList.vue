<script setup>
import { ref } from 'vue'
import DiaryTitleAndTagList from '../ui_parts/DiaryTitleAndTagList.vue'
import GetData from '../../data_base/GetData'

//以下のrefの更新とともにdomも更新される
//diaryの主要なデータ
const diariesData = ref('')
//diaryのtag
const tagsData = ref('')
//取得したtagを成形したものを格納
const tagsGroupData = ref({})

//通常時
//axiosを順次発行
let getData = async () => {
  diariesData.value = await new GetData('diary', 'select * from diaries').fetchData()
  tagsData.value = await new GetData(
    'diary',
    'SELECT t1.id_tag,t1.tag,t2.id_diary FROM tags as t1 LEFT JOIN links as t2 ON t1.id_tag = t2.id_tag ORDER BY id_diary DESC',
  ).fetchData()

  //tagを成形
  tagsData.value.data.forEach((element) => {
    var key = element['id_diary']
    var tag = element['tag']
    //id_diaryをkeyにして
    //key(id_diary)がすでに有ればtagを追加
    if (isset(tagsGroupData.value[key])) {
      tagsGroupData.value[key].push(tag)
      //key(id_diary)が無ければkey:valueのsetを追加
    } else {
      tagsGroupData.value[key] = [tag]
    }
  })

  console.log(tagsGroupData.value)
}
//実行
getData()
//phpのissetと同等の関数
function isset(data) {
  if (typeof data == 'undefined') return false
  else return true
}

function formatDate(dateStr) {
  var date = new Date(dateStr)
  var options = {
    year: 'numeric', //年の形式
    month: 'long', //月の形式
    day: 'numeric', //日の形式
    weekday: 'narrow', //曜日の形式
  }
  var dateJP = new Intl.DateTimeFormat('ja-JP', options).format(date)
  return dateJP
}

//tag選択時
</script>
<template>
  <div class="diaryTitleTags">
    <div class="innerarea">
      <ul>
        <li v-for="data in diariesData.data" :key="data['id_diary']" style="list-style: none">
          <DiaryTitleAndTagList :tags="tagsGroupData[data['id_diary']]">
            <template #date>{{ formatDate(data['created_date']) }}</template>
            <template #title>{{ data['diary_title'] }}</template>
          </DiaryTitleAndTagList>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.diaryTitleTags {
  position: relative;
  width: 100%;
  height: fit-content;
  margin-top: 0;
}
.innerarea {
  width: 70%;
  min-width: 340px;
  max-width: 530px;
  margin: 0 auto;
  padding: 17px 0;
  padding: 50px 0;
}
</style>
