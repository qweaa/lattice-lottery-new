# 快速开始

## 安装依赖

```sh
npm install lattice-lottery-new --save
```

## 按需引入

```js
import LotteryGrid from 'lattice-lottery-new/LotteryGrid'

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
]

// 初始化
oLotteryGrid = new LotteryGrid({
  element: '.LotteryGrid', // dom class name or id name
  list,
  onend: (val) => {
    console.log("结束", val)
  },
  onsubmit: () => {
    oLotteryGrid.go(4) // index position, start at 0
  }
})
```
