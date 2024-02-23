# WzlReport

埋点工具

## 启动

``` sh
npm run dev
```

## 构建

``` sh
npm version prepatch
npm build
```

- `npm version prerelease` package.json 中的版本号1.0.0变为 1.0.1-0 或者 1.0.1-0变为1.0.1-1 一般是指修复版本
- `npm version prepatch` package.json 中的版本号1.0.1-1变为 1.0.2-0 一般是指需求版本
- `npm version preminor` package.json 中的版本号1.0.2-0变为 1.1.0-0 一般是指功能版本
- `npm version premajor` package.json 中的版本号1.1.0-0变为 2.0.0-0 一般是指改版

执行 `npm version` 命令前需要先提交所有变更（1. `git add .` 2. `git commit -m "deploy"`）。
