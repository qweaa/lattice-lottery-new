import {
  defineConfig
} from 'vitepress'
import path from 'path'
const isProd = process.env.NODE_ENV === 'production'
import demoblock from 'vitepress-demoblock';

export default defineConfig({
  base: '/lattice-lottery/',
  title: 'lattice-lottery',
  description: '基于Vue的九宫格抽奖组件',
  head: [
    isProd ? [
      'script',
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?d98e51720ec70609a3d5998161b75bab";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    ] : ''
  ],
  markdown: {
    config: (md) => {
      md.use(demoblock)
    }
  },
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  themeConfig: {
    displayAllHeaders: true,
    nav: [{
        text: '指南',
        link: '/guide/'
      },
      {
        text: 'Demo',
        link: '/demo/'
      }, {
        text: 'GitHub',
        link: 'https://github.com/h5-group/lattice-lottery'
      }
    ],
    sidebar: [{
      text: '指南',
      items: [{
          text: '介绍',
          link: '/guide/'
        },
        {
          text: '版本日志',
          link: '/guide/version.html'
        },
        {
          text: '联系和反馈',
          link: '/guide/contact.html'
        },
      ]
    }, {
      text: '九宫格',
      items: [{
        text: '介绍',
        link: '/lottery/'
      }, ]
    }]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, './public/images')
      }
    }
  }
})