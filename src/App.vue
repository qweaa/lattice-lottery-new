<script setup>
import WzlReport from "@/lib";

const wzlReport = new WzlReport({
  appid: "高荣强",
});

const showAppid = () => {
  console.log("版本：", wzlReport);
  wzlReport.showOptions();
}

const onButtonClick = (id) => {
  wzlReport.report(id)
};
</script>

<template>
  <div>
    <h2>点击埋点</h2>
    <button @click="showAppid">按钮2</button>
    <button @click="onButtonClick(2)">埋点2</button>
    <button @click="onButtonClick(3)">埋点3</button>
  </div>
</template>

<style scoped>
</style>
