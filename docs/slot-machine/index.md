# SlotMachine

老虎机抽奖组件

<demo src="../components/SlotMachine/index.vue"></demo>

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
      label: 'moveTime',
      desc: '动画时间，单位秒',
      type: 'number',
      values: '-',
      default: '4'
    }, {
      label: 'colCount',
      desc: '滚筒列数',
      type: 'number',
      values: '-',
      default: '3'
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

```js
const oLottery = new SlotMachine({...})
oLottery.go([1,2,3]) // [!code focus]
```

当调用组件对象的`go`函数之后，组件便会开始执行抽奖动画。

`go`函数接收一个数组参数，数组的值对应每一列需要停下来的奖品索引值，索引值从`0`开始。

::: tip
中了第二个奖品：`oLottery.go([1,1,1])` 数组的长度对应老虎机的列数。

如不中奖：`oLottery.go([1,2,3])` 值为随机即可
:::
