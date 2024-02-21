# WzlReport

联通助理埋点工具。

## 引入插件js

```html
<script src="./dist/wzl-report.js"></script>
```

## 初始化

```js
const wzlReport = new WzlReport({
  appid: 'your appid'
})
```

## 使用

```js
wzlReport.report({
  event: 'event name',
})
```
