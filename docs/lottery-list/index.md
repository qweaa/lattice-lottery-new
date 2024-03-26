# LotteryList

宫格抽奖组件。该组件会展示`list`数组中所有的值。

<demo src="../components/LotteryList/index.vue"></demo>

<script setup>
  import { ref } from "vue"
  const initOptions = ref([
    {
      label: 'element',
      desc: 'dom元素的类名或Id值',
      type: 'string',
      values: '必填',
      default: ''
    },
    {
      label: 'list',
      desc: '奖品列表数据',
      type: 'array',
      values: '必填',
      default: ''
    }, {
      label: 'circleTimes',
      desc: '动画圈数',
      type: 'string, number',
      values: '-',
      default: '3'
    }, {
      label: 'velocity',
      desc: '动画效果',
      type: 'string',
      values: '匀速：invariance；慢快慢：speed',
      default: 'speed'
    }, {
      label: 'btnText',
      desc: '抽奖按钮文案',
      type: 'string',
      values: '-',
      default: '抽奖'
    }, {
      label: 'onsubmit',
      desc: '点击组件内的抽奖按钮的回调',
      type: 'function',
      values: '-',
      default: ''
    }, {
      label: 'onend',
      desc: '抽奖动画结束的回调',
      type: 'function',
      values: '-',
      default: ''
    },
  ])
  const listOptions = ref([
    {
      label: 'label',
      desc: '奖品名称',
      type: 'string',
      values: '-',
      default: ''
    }, {
      label: 'image',
      desc: '奖品图',
      type: 'string',
      values: '-',
      default: ''
    },
  ])
</script>

## 初始化传参

<OptionTable :list="initOptions" />

## list参数

<OptionTable :list="listOptions" />

## 执行动画

```js{2}
const oLottery = new LotteryList({...})
oLottery.go(1)
```

当调用组件对象的`go`函数之后，组件便会开始执行抽奖动画。

::: tip
索引值从 0 开始，即需要中奖落在第一个格子请传入 0：`oLottery.go(0)`
:::
