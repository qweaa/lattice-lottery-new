<script setup>
import { onMounted } from 'vue';
import LotteryGrid from 'lattice-lottery-new/LotteryGrid'
import p1 from '../images/LotteryGridDemo/prize1.png'
const list = [
  {
    name: "华为Mate 60 Pro+",
    image: p1,
  },
  {
    name: "1000元现金红包",
    image: p1,
  },
  {
    name: "三等奖",
    image: p1,
  },
  {
    name: "500元现金红包",
    image: p1,
  },
  {
    name: "谢谢参与",
    image: p1,
  },
  {
    name: "六等奖",
    image: p1,
  },
  {
    name: "7等奖",
    image: p1,
  },
  {
    name: "8等奖",
    image: p1,
  },
]

onMounted(() => {
  const oLottery = new LotteryGrid({
    element: '.myLottery',
    list,
    btnText: '',
    onend: (e) => {
      alert(e.name)
    },
    onsubmit: () => {
      oLottery.go(2)
    }
  })
})

</script>

<template>
  <div class="myLottery"></div>
</template>

<style lang="less">
// 注意这里的 style 标签并未设置 scoped

.myLottery {
  display: flex;
  justify-content: center;
}
.myLottery .lottery__box--grid {
  width: 640px;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../images/LotteryGridDemo/bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
/* 奖品列表的蒙层，根据抽奖动画选中的位置被显示出来 */
.myLottery .prize__item__mask {
  background-image: url('../images/LotteryGridDemo/mask.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
  background-color: transparent;
  overflow: hidden;
}
/* 奖品图样式 */
.myLottery .prize__item__image {
  width: 100%;
  height: 100%;
}
/* 九宫格组件样式 为了跟随羡慕的自适应方案 */
.myLottery .lattice__lottery__box {
  width: 560px;
}
/* 奖品块样式 为了跟随羡慕的自适应方案 */
.myLottery .lattice__lottery__item {
  width: 170px;
  height: 170px;
  margin-bottom: 30px;
  border: none;
  font-size: 18px;
  background-color: transparent;
}
/* 抽奖按钮 */
.myLottery .lattice__lottery__btn {
  margin-top: -18px;
  width: 200px;
  height: 206px;
  border: none;
  background-image: url('../images/LotteryGridDemo/btn.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>