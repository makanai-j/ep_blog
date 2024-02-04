<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GetData from '../../data_base/GetData'
import unescapeHtml from '../plugins/GlobalPlugin'

const header = useRoute()

let id = header.params.id

const detailData = ref('')
const isGetData = ref(true)

let getData = async () => {
  detailData.value = (await new GetData('diary', `select * from diaries where id_diary = ${id}`).fetchData()).data
  if (detailData.value != false) {
    let element = document.getElementById('detailContent')
    element.innerHTML = unescapeHtml(detailData.value[0]['diary_content'])
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

<style>
.header_title {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  height: 0;
  font-size: 15px;
  font-family: 'kaiso';
  text-align: center;
  color: white;
  background-color: rgb(80, 80, 80);
  z-index: 999;
}
.header_title_text {
  display: none;
  width: fit-content;
  margin: auto;
  padding: 0 10px;
  --c: 1px;
  --b: 5px;
  --d: 8px;
  --g: white;
  background:
    linear-gradient(var(--g) 0 0) 0% 0% / var(--b) var(--c) no-repeat,
    linear-gradient(var(--g) 0 0) 0% 0% / var(--c) var(--d) no-repeat,
    linear-gradient(var(--g) 0 0) 100% 100% / var(--b) var(--c) no-repeat,
    linear-gradient(var(--g) 0 0) 100% 100% / var(--c) var(--d) no-repeat;
}
.outside_main {
  padding-top: 70px;
  padding-bottom: 60px;
}
.title {
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin: 0 auto;
}
.title h1 {
  width: fit-content;
  margin-top: 18px;
  margin-bottom: 1.5em;
  padding: 8px 13px;
  font-family: 'kaiso';
  font-size: 25px;
  --c: 1px;
  --d: 18px;
  --b: 12px;
  --g: black;
  background:
    linear-gradient(var(--g) 0 0) 0% 0% / var(--b) var(--c) no-repeat,
    linear-gradient(var(--g) 0 0) 0% 0% / var(--c) var(--d) no-repeat,
    linear-gradient(var(--g) 0 0) 100% 100% / var(--b) var(--c) no-repeat,
    linear-gradient(var(--g) 0 0) 100% 100% / var(--c) var(--d) no-repeat;
}
.date {
  margin: 0 2.7em;
  font-size: 14px;
}
.toc_list {
  width: 80%;
  max-width: fit-content;
  padding: 20px;
  margin: 1em 2em 2em;
  color: rgb(44, 44, 44);
  border: solid 2px;
  background-color: rgb(255, 255, 255);
  border-color: rgba(0, 0, 0, 0.9);
}
.toc_list .toc_text {
  margin-bottom: 0.5em;
}
.toc_list ul {
  list-style: none;
}
.toc_list ul li {
  width: 100%;
  padding: 1.5em 0 0 1em;
  word-wrap: break-word;
}
.toc_list a {
  width: 100%;
  text-decoration: none;
  color: rgb(44, 44, 44);
}
.toc_list a:hover {
  border-bottom: solid 1px;
  border-color: rgb(44, 44, 44);
}
.f-img {
  display: flex;
  justify-content: center;
  width: 100% + 20px;
  max-height: 400px;
  margin-bottom: 2em;
}
.f-img img {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 400px;
  z-index: -1;
}
.content {
  text-align: left;
  font-family: 'kaiso', serif;
  padding: 40px;
}
.content h2 {
  position: relative;
  font-size: 19px;
  letter-spacing: 5px;
  height: fit-content;
  width: fit-content;
  margin-bottom: 2em;
  padding: 7px 0;
}
.content h2::after {
  content: '';
  position: absolute;
  top: 0;
  left: -50px;
  right: 0;
  width: 100% + 50px;
  height: 100%;
  border: solid 1px;
}
.content p {
  font-size: 15px;
  letter-spacing: 4px;
  line-height: 2em;
}
.content .text {
  margin-bottom: 50px;
}
</style>
