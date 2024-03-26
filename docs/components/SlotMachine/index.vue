<script setup>
import { onMounted } from 'vue';
import SlotMachine from 'lattice-lottery-new/SlotMachine'
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
let oLottery = null

onMounted(() => {
  oLottery = new SlotMachine({
    element: '.lottery',
    list,
    onend: (e) => {
      alert(e)
    },
    onsubmit: () => {
    }
  })
})

const onsubmit = () => {
  if (oLottery) oLottery.go([1,2,3])
}

</script>

<template>
  <div class="box">
    <div class="lottery"></div>
    <br />
    <div @click="onsubmit" class="lottery-btn">抽奖</div>
  </div>
</template>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>