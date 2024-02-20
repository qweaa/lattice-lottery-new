import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.js'),
      name: 'WzlReport',
      fileName: () => 'wzl-report.js',
      formats: ['umd'],
    },
  },
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '^/api': {
        target: 'https://qyzx.smartreply.iflyvoice.com:20104', //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
})