import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'
import {
  buildPlugin
} from 'vite-plugin-build'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const _resolve = (path) => resolve(__dirname, path)

export default defineConfig({
  plugins: [vue(),
    // css 代码并入js中
    cssInjectedByJsPlugin({
      topExecutionPriority: false
    }),
    // 多入口 实现按需引入
    buildPlugin({
      fileBuild: false,
      libBuild: {
        buildOptions: [{
            lib: {
              entry: _resolve('src/lib/index.js'),
              name: 'index',
              formats: ['es', 'umd'],
              fileName: (mode) => `index.${mode}.js`,
            },
          }, {
            lib: {
              entry: _resolve('src/lib/SlotMachine/index.js'),
              name: 'SlotMachine',
              formats: ['es', 'umd'],
              fileName: (mode) => `SlotMachine.${mode}.js`,
            },
          },
          {
            lib: {
              entry: _resolve('src/lib/Lottery/lottery-grid.js'),
              name: 'LotteryGrid',
              formats: ['es', 'umd'],
              fileName: (mode) => `LotteryGrid.${mode}.js`,
            },
          },
          {
            lib: {
              entry: _resolve('src/lib/Lottery/lottery-list.js'),
              name: 'LotteryList',
              formats: ['es', 'umd'],
              fileName: (mode) => `LotteryList.${mode}.js`,
            },
          },
          {
            lib: {
              entry: _resolve('src/lib/Turntable/index.js'),
              name: 'Turntable',
              formats: ['es', 'umd'],
              fileName: (mode) => `Turntable.${mode}.js`,
            },
          },
        ],
      },
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': _resolve('src')
    }
  },
})