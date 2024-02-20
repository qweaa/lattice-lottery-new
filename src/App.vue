<script setup>
import WzlReport from "@/lib";

const report = new WzlReport({
  name: "高荣强",
});

const onButtonClick = () => {
  console.log("版本：", report);
  report.showName();
};
</script>

<template>
  <div>
    <h2>点击埋点</h2>
    <button @click="onButtonClick">按钮</button>
  </div>
</template>

<style scoped>
</style>
