import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'
import {
  libInjectCss,
} from 'vite-plugin-lib-inject-css';

const _resolve = (path) => resolve(__dirname, path)

export default ({
  mode
}) => defineConfig({
  plugins: [vue(), libInjectCss()],
  resolve: {
    alias: {
      '@': _resolve('src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Put chunk files at <output>/chunks
        chunkFileNames: 'chunks/[name].[hash].js',
        // Put chunk styles at <output>/styles
        assetFileNames: 'assets/[name][extname]',
      },
    },
    lib: {
      entry: {
        index: _resolve('src/lib/index.js'), // Don't forget the main entry!
        SlotMachine: _resolve('src/lib/SlotMachine/index.js'),
        LotteryGrid: _resolve('src/lib/Lottery/lottery-grid.js'),
        LotteryList: _resolve('src/lib/Lottery/lottery-list.js'),
      },
    },
  },
})