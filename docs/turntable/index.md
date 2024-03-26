# Turntable

大转盘抽奖组件。`list`的值必须与转盘背景的奖品值数量对应。

如转盘背景图有六个奖品，那么`list`的值应该有6个。

<demo src="../components/Turntable/index.vue"></demo>

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
      label: 'tableBg',
      desc: '转盘背景图',
      type: 'string',
      values: '必填',
      default: ''
    }, {
      label: 'tableBtn',
      desc: '转盘按钮背景图',
      type: 'string',
      values: '必填',
      default: ''
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
    }
  ])
</script>

## 初始化传参

<OptionTable :list="initOptions" />

## list参数

<OptionTable :list="listOptions" />

## 执行动画

```js{2}
const oLottery = new Turntable({...})
oLottery.go(1)
```

当调用组件对象的`go`函数之后，组件便会开始执行抽奖动画。

::: tip
索引值从 0 开始，即需要中奖落在第一个格子请传入 0：`oLottery.go(0)`
:::
