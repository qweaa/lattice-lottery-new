import DefaultTheme from 'vitepress/theme'; //引入默认主题
import demo from 'vitepress-demoblock/demo.vue'
export default {
  ...DefaultTheme,
  enhanceApp({
    app
  }) {
    app.component('demo', demo)
  }
}

// // https://vitepress.dev/guide/custom-theme
// import Theme from 'vitepress/theme'
// // your demo component
// import CustomDemoContainer from '../../components/home/index.vue'

// export default {
//   ...Theme,
//   enhanceApp({
//     app,
//     router,
//     siteData
//   }) {
//     app.component('demo-container', CustomDemoContainer)
//   },
// }