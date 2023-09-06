<template>
  <footer>Thanks you for waching</footer>
</template>

<style>
footer {
  --col_black: rgb(65, 65, 65);
  --col_white: rgb(255, 255, 255);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--col_black);
  background-color: var(--col_white);
}
footer::before,
footer::after {
  content: ''; /*バックグラウンドの線を表示させるために空白にしている*/
  flex-grow: 1;
  height: 1px;
  background: var(--col_black);
}
footer::before {
  margin-right: 20px;
}
footer::after {
  margin-left: 20px;
}
</style>
