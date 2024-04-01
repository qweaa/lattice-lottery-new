<script setup>
import { onMounted } from 'vue'
import {SlotMachine, LotteryGrid, LotteryList, Turntable, SpinCard} from './lib'
// import SlotMachine from '/dist/SlotMachine'
import { getAssetsFile } from './utils'

let oSlotMachine = null
let oLotteryGrid = null
let oLotteryList = null
let oTurntable = null
let oShinCard = null

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
  oSlotMachine = new SlotMachine({
    element: '#SlotMachine',
    list,
  })

  oLotteryGrid = new LotteryGrid({
    element: '#LotteryGrid',
    list,
    onend: (val) => {
      console.log("结束", val)
    },
    onsubmit: () => {
      oLotteryGrid.go(4)
    }
  })
  oLotteryList = new LotteryList({
    element: '#LotteryList',
    list,
    onend: (val) => {
      console.log("结束", val)
    },
    onsubmit: () => {
      oLotteryList.go(4)
    }
  })
  oTurntable = new Turntable({
    element: '#Turntable',
    list: list.slice(0, 6),
    tableBg: getAssetsFile("/src/assets/images/tableBg.png"),
    tableBtn: getAssetsFile("/src/assets/images/tableBtn.png"),
    onend: (data) => {
      console.log("结束：", data)
    },
    onsubmit: () => {
      play4()
    }
  })
  const hasDrawIndex = [2,3]
  oShinCard = new SpinCard({
    element: "#SpinCard",
    hasDrawIndex,
    list: [
      {
        front_image: getAssetsFile('/src/assets/images/SpinCard/bg.png'),
        back_image: getAssetsFile('/src/assets/images/SpinCard/f1.png'),
      }, {
        front_image: getAssetsFile('/src/assets/images/SpinCard/bg.png'),
        back_image: getAssetsFile('/src/assets/images/SpinCard/m1.png'),
      }, {
        front_image: getAssetsFile('/src/assets/images/SpinCard/bg.png'),
        back_image: getAssetsFile('/src/assets/images/SpinCard/x1.png'),
      }, {
        front_image: getAssetsFile('/src/assets/images/SpinCard/bg.png'),
        back_image: getAssetsFile('/src/assets/images/SpinCard/h1.png'),
      }, {
        front_image: getAssetsFile('/src/assets/images/SpinCard/bg.png'),
        back_image: getAssetsFile('/src/assets/images/SpinCard/x2.png'),
      }, {
        front_image: getAssetsFile('/src/assets/images/SpinCard/bg.png'),
        back_image: getAssetsFile('/src/assets/images/SpinCard/h2.png'),
      },
    ],
    handImage: getAssetsFile('/src/assets/images/SpinCard/hand.png'),
    onsubmit(val) {
      console.log("点击了卡片：", val)
      oShinCard.open(val)
      // hasDrawIndex.push(val)
      // oShinCard.update({
      //   hasDrawIndex: hasDrawIndex,
      // })
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
const play4 = () => {
  if (oTurntable) {
    console.log(oTurntable)
    oTurntable.go(2)
  }
}
const play5 = () => {
  if (oShinCard) {
    oShinCard.reset()
  }
}
const play6 = () => {
  if (oShinCard) {
    oShinCard.update({
      hasDrawIndex: [2,3,5],
    })
  }
}
</script>

<template>
  <div>
    <div id="SlotMachine"></div>
    <div @click="play" class="SlotMachine">go</div>

    <hr />

    <div id="LotteryGrid"></div>
    <div @click="play2" class="LotteryGrid">go</div>
    
    <hr />

    <div id="LotteryList"></div>
    <div @click="play3" class="LotteryList">go</div>

    <hr />

    <div id="Turntable"></div>
    <div @click="play4" class="Turntable">go</div>

    <hr />

    <div id="SpinCard"></div>
    <div @click="play5" class="SpinCard">重置</div>
    <div @click="play6" class="SpinCard">update</div>

  </div>
</template>

<style scoped>

</style>
