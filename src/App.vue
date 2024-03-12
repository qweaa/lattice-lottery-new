<script setup>
import { onMounted } from 'vue'
import {SlotMachine, LotteryGrid, LotteryList} from '@/lib'
// import SlotMachine from '/dist/SlotMachine'
import { getAssetsFile } from '@/utils'

let oSlotMachine = null
let oLotteryGrid = null
let oLotteryList = null

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
    image: getAssetsFile("/src/assets/images/prize1.png"),
  },
]

onMounted(() => {
  oSlotMachine = new SlotMachine('.SlotMachine', {
    list,
    onend: (val) => {
      console.log("结束", val)
    }
  })

  oLotteryGrid = new LotteryGrid('.LotteryGrid', {
    list,
    onend: (val) => {
      console.log("结束", val)
    },
    onsubmit: () => {
      oLotteryGrid.go(4)
    }
  })
  oLotteryList = new LotteryList('.LotteryList', {
    list,
    onend: (val) => {
      console.log("结束", val)
    },
    onsubmit: () => {
      oLotteryList.go(4)
    }
  })
})

const play = () => {
  if (oSlotMachine) {
    oSlotMachine.go([1,2,3])
  }
}

const play2 = () => {
  if (oLotteryGrid) {
    console.log(oLotteryGrid)
    oLotteryGrid.go(2)
  }
}
const play3 = () => {
  if (oLotteryList) {
    console.log(oLotteryList)
    oLotteryList.go(2)
  }
}
</script>

<template>
  <div>
    <div class="SlotMachine"></div>
    <div @click="play" class="SlotMachine">go</div>

    <hr />

    <div class="LotteryGrid"></div>
    <div @click="play2" class="LotteryGrid">go</div>
    
    <hr />

    <div class="LotteryList"></div>
    <div @click="play3" class="LotteryList">go</div>
  </div>
</template>

<style scoped>
</style>
