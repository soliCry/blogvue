// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'vue-awesome/icons/thumbs-up'
import 'element-ui/lib/theme-chalk/index.css';
import locale from '../node_modules/element-ui/lib/locale/lang/en'
import Icon from 'vue-awesome/components/Icon';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.component('v-icon', Icon)
Vue.use(ElementUI,{locale});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
