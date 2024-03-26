<script setup>
import { onMounted } from 'vue';
import LotteryList from 'lattice-lottery-new/LotteryList'
const list = [
  {
    label: "华为Mate 60 Pro+",
  },
  {
    label: "1000元现金红包",
  },
  {
    label: "三等奖",
  },
  {
    label: "500元现金红包",
  },
  {
    label: "谢谢参与",
  },
  {
    label: "六等奖",
  },
  {
    label: "7等奖",
  },
  {
    label: "8等奖",
  },
  {
    label: "9等奖",
  },
]

onMounted(() => {
  const oLottery = new LotteryList({
    element: '.lottery',
    list,
    onend: (e) => {
      alert(e.label)
    },
    onsubmit: () => {
      oLottery.go(2)
    }
  })
})

</script>

<template>
  <div class="lottery"></div>
</template>

<style lang="less" scoped>
.lottery {
  display: flex;
  justify-content: center;
}
</style>