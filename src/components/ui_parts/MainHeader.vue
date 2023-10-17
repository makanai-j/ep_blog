<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const pathname = ref(location.pathname)
console.log(useRoute())

const pageList = ref([
  {
    pageName: '物語',
    pageURL: '/storyList',
    //最初に読み込まれた時点でstoryListだった場合true
    selected: pathname.value.indexOf('storyList') != -1 ? true : false,
  },
  {
    pageName: '日記',
    pageURL: '/diaryList',
    //最初に読み込まれた時点でdiaryListだった場合true
    selected: pathname.value.indexOf('diaryList') != -1 ? true : false,
  },
])

// pageListのselected更新用
let changedPageOnHeader = (page) => {
  //一度falseで初期化
  pageList.value.forEach((element) => {
    element.selected = false
    //pushされたpageのselectedをtrueに
    if (element.pageName == page) element.selected = true
  })
}

const img_title = ref(null)
const router = ref([])

// browserバック時にpageListのseletectedを更新
window.addEventListener('popstate', () => {
  let path = location.pathname
  if (path.indexOf('story') != -1) {
    changedPageOnHeader(pageList.value[0].pageName)
  } else if (path.indexOf('diary') != -1) {
    changedPageOnHeader(pageList.value[1].pageName)
  } else {
    changedPageOnHeader('index')
  }
})

onMounted(() => {
  //「物語」「日記」
  router.value.forEach((element) => {
    let pName = element.id
    element.addEventListener(
      'click',
      () => {
        changedPageOnHeader(pName)
      },
      false,
    )
  })
  //左上image
  img_title.value.addEventListener(
    'click',
    () => {
      //falseで初期化
      pageList.value.forEach((element) => {
        element.selected = false
      })
    },
    false,
  )
})
onUnmounted(() => {})
</script>

<template>
  <header>
    <div ref="img_title">
      <router-link class="img_title" to="/index.html">
        <img src="../../assets/title_ep_w.png" width="40" height="40" />
      </router-link>
    </div>
    <nav>
      <ol>
        <li
          v-for="page in pageList"
          :id="page.pageName"
          ref="router"
          :key="page.name"
          :class="{ on: page.selected, off: !page.selected }"
        >
          <router-link :to="page.pageURL">
            <span class="pageName">&nbsp;{{ page.pageName }}&emsp;</span>
          </router-link>
        </li>
      </ol>
    </nav>
  </header>
</template>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  margin: 0 0 10px 0;
  background-color: rgb(80, 80, 80);
  z-index: 999;
}
.img_title {
  margin-left: 20px;
  margin-right: 10px;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 1px;
  appearance: none;
}
header nav {
  width: 400px;
  margin: auto;
  height: fit-content;
  width: fit-content;
}
header ol {
  display: flex;
  margin: auto auto;
}
/*ナビゲーションのアニメーション ↓↓*/
header ol li {
  display: block;
  font-size: 12px;
  margin: auto 15px;
}
header ol li .pageName {
  text-decoration: none;
  color: var(--f, white);
}
header ol .on {
  --c: 2px;
  --g: white;
  color: var(--f, white);
  background: linear-gradient(var(--g) 0 0) 0% 50% / var(--c) var(--h, var(--d, 100%)) no-repeat;
  transition: 0.3s;
}
header ol .on:hover {
  --f: rgb(200, 200, 200);
  --h: 100%;
}
header ol .off {
  --c: 2px;
  --g: white;
  color: var(--f, white);
  background: linear-gradient(var(--g) 0 0) 0% 50% / var(--c) var(--h, 0) no-repeat;
  transition: 0.3s;
}
header ol .off:hover {
  --f: rgb(200, 200, 200);
  --h: 100%;
}
header nav:hover {
  --d: 0%;
}
/*--------------------------------*/
</style>
