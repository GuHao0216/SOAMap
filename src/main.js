import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Og0pyGDwquUmTxN8outBAvG5yKfiMcxv'
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
