import DefaultTheme from 'vitepress/theme'; //引入默认主题
import demo from 'vitepress-demoblock/demo.vue'
import OptionTable from '../../components/OptionTable/index.vue'
export default {
  ...DefaultTheme,
  enhanceApp({
    app,
    router,
  }) {
    app.component('demo', demo)
    app.component('OptionTable', OptionTable)
    router.onBeforeRouteChange = (to) => {
      if (typeof window._hmt !== 'undefined') {
        window._hmt.push(['_trackPageview', to]);
      }
    };
  }
}