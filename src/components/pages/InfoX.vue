<script setup>
import { ref } from 'vue'
import GetData from '../../data_base/GetData'

const informations = ref('')

let getData = async () => {
  informations.value = await new GetData('info', 'select * from informations').fetchData()
}

getData()

function formatDate(dateStr) {
  var date = new Date(dateStr)
  var options = {
    year: 'numeric', //年の形式
    month: 'long', //月の形式
    day: 'numeric', //日の形式
  }
  var dateJP = new Intl.DateTimeFormat('ja-JP', options).format(date)
  return dateJP
}
</script>

<template>
  <div class="info_area">
    <div class="info_innerarea">
      <p class="info_area_title">info</p>
      <ul>
        <li v-for="info in informations.data" :key="info['id_information']" style="list-style: none">
          <article class="info_article">
            <p class="created_date">
              {{ info['created_date'] }}
            </p>
            <h3 class="subject">
              {{ info['subject'] }}
            </h3>
            <div v-if="info['text'] != null" class="speech_bubble">
              <div class="triangle"></div>
              <p class="text">
                {{ info['text'] }}
              </p>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.info_area {
  width: 100%;
  height: fit-content;
  display: flex;
}
.info_innerarea {
  width: 70%;
  min-width: 340px;
  max-width: 530px;
  margin: 0 auto;
  padding: 17px 0;
}
.info_area_title {
  text-align: start;
  font-weight: bold;
  font-size: 25px;
}
.info_article {
  text-align: start;
  margin: 0 auto;
  padding-top: 10px;
  width: 100%;
  max-width: 1000px;
  height: fit-content;
  line-height: 1.5em;
}
.info_article .created_date {
  font-size: 9px;
}
.info_article .subject {
  margin-left: 10px;
  margin-bottom: 3px;
  font-size: 15px;
  font-weight: normal;
  word-wrap: break-word;
}
.info_article .speech_bubble {
  position: relative;
  width: fit-content;
  max-width: 100%;
}
.info_article .triangle {
  box-sizing: border-box;
  width: 14px;
  margin-right: 20px;
  margin-left: 35%;
  border-right: solid transparent 12px;
  border-left: solid transparent 3px;
  border-bottom: solid rgb(200, 200, 200) 13px;
}
.info_article .text {
  margin-left: 30px;
  padding: 6px 10px;
  font-size: 13px;
  background-color: rgb(200, 200, 200);
  border-radius: 4px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
