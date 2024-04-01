<style lang="less">

.SpinCard {
  width: 602px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* 3D变形 */
  transform-style: preserve-3d;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
}
.SpinCard__item {
  width: 198px;
  height: 268px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-bottom: 40px;
  position: relative;
  transition: all .3s;
  transform-style: preserve-3d;
  &.act::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 138px;
    left: 72px;
    width: 108px;
    height: 118px;
    animation: scale 1s ease-in-out 0s forwards infinite;
    background-image: url('./images/hand.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  &.play {
    transform: rotateY(180deg);
  }
}
@keyframes scale
{
  0%   {
    transform: scale(.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.8);
  }
}

.SpinCard__front, .SpinCard__back {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.SpinCard__front {
  transform: rotateY(0deg);
}

.SpinCard__back {
  transform: rotateY(180deg);
}
</style>

<template>
  <!-- 抽奖卡片 -->
  <div class="SpinCard">
    <div
      v-for="item, index in cards" :key="index"
      @click="handleOpenCard($event, index)"
      :class="`SpinCard__item${activeCard === index ? ' act' : ''}${openIndex === index ? ' play' : ''}`"
      >
        <div :style="`background-image: url(${item.image})`" class="SpinCard__front"></div>
        <div :style="`background-image: url(${item.image_disabled})`" class="SpinCard__back"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getCode, getAssetsFile } from '../../utils'
  const _getCode = () => {
    return getCode()
  }
  const cards = ref([
    {
      image: getAssetsFile('/src/components/SpinCard/images/bg.png'),
      image_disabled: getAssetsFile('/src/components/SpinCard/images/f1.png'),
    }, {
      image: getAssetsFile('/src/components/SpinCard/images/bg.png'),
      image_disabled: getAssetsFile('/src/components/SpinCard/images/m1.png'),
    }, {
      image: getAssetsFile('/src/components/SpinCard/images/bg.png'),
      image_disabled: getAssetsFile('/src/components/SpinCard/images/x1.png'),
    }, {
      image: getAssetsFile('/src/components/SpinCard/images/bg.png'),
      image_disabled: getAssetsFile('/src/components/SpinCard/images/h1.png'),
    }, {
      image: getAssetsFile('/src/components/SpinCard/images/bg.png'),
      image_disabled: getAssetsFile('/src/components/SpinCard/images/x2.png'),
    }, {
      image: getAssetsFile('/src/components/SpinCard/images/bg.png'),
      image_disabled: getAssetsFile('/src/components/SpinCard/images/h2.png'),
    },
  ])

  const drawNum = ref([])
  const cardsTimer = ref(false)
  const activeCard = ref(-1)
  const openIndex = ref(-1)
  const showHand = ref(true)
  
  onMounted(() => {
    startHandMove()
  })

  // 开卡片
  const handleOpenCard = (ev, index, hasOpen) => {
    if (cardsTimer.value) clearInterval(cardsTimer.value) // 停止手势的定时器
    cardsTimer.value = null // 重置定时器变量
    activeCard.value  = -1 // 关闭展示手势
    openIndex.value = index
    // nextTick(() => {
    //   setTimeout(() => {
    //     const card_item_arr = document.querySelectorAll('.card_item')
    //     for (let i of card_item_arr) {
    //       i.className = 'card_item'
    //     }
    //     ev.srcElement.className = 'card_item play'
    //   }, 100)
    // })

    // 卡片的翻转动画会影响弹窗消失的动画闪烁 所以延迟260毫秒 等卡片快翻转结束后弹出弹窗
    setTimeout(() => {
      // todo
      console.log("点击了卡片", index)
    }, 260)
  }
  
  const closeFn = () => {
    if (showHand) {
      activeCard.value  = index // 展示手势
      startHandMove() // 开始手势的动画
    }
    openIndex.value = -1 // 取消翻转
  }

  const startHandMove = () => {
    // 开卡片手势动态切换
    if (!cardsTimer.value) {
      // 按顺序
      const addFn = (num) => {
        if (num < cards.value.length - 1) num += 1;
        else num = 0;
        if (
          drawNum.value.length < cards.value.length - 1
        ) {
          if (drawNum.value.includes(String(num))) return addFn(num)
          else return num
        } else {
          return num
        }
      }
      activeCard.value = addFn(activeCard.value)
      
      cardsTimer.value = window.setInterval(() => {
        activeCard.value = addFn(activeCard.value)
      }, 2000)
    }
  }
</script>