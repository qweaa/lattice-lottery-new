import {
  defineConfig
} from 'vitepress'
const isProd = process.env.NODE_ENV === 'production'
import demoblock from 'vitepress-demoblock';

export default defineConfig({
  base: '/lattice-lottery-new/',
  title: 'lattice-lottery-new',
  description: '兼容Vue、react、微信小程序等框架的活动抽奖组件',
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
    search: {
      provider: 'algolia',
      options: {
        appId: '...',
        apiKey: '...',
        indexName: '...'
      }
    },
    nav: [{
      text: 'GitHub',
      link: 'https://github.com/qweaa/lattice-lottery-new'
    }],
    sidebar: [{
      text: '指南',
      items: [{
          text: '介绍',
          link: '/guide/'
        }, {
          text: '快速开始',
          link: '/guide/start.html'
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
        text: 'LotteryGrid',
        link: '/lottery-grid/'
      }, ]
    }, {
      text: '宫格抽奖',
      items: [{
        text: 'LotteryList',
        link: '/lottery-list/'
      }, ]
    }, {
      text: '老虎机',
      items: [{
        text: 'SlotMachine',
        link: '/slot-machine/'
      }, ]
    }, {
      text: '大转盘',
      items: [{
        text: 'Turntable',
        link: '/turntable/'
      }, ]
    }, {
      text: 'Demo',
      items: [{
        text: '九宫格抽奖',
        link: '/demo/'
      }, ]
    }]
  },
})