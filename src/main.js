/*
 * @Author: DeeLMind
 * @Date: 2022-03-15 10:27:05
 * @LastEditTime: 2022-07-30 16:30:39
 * @LastEditors: QKSword 1064615639@qq.com
 * @Description: vue 全局配置
 * @FilePath: \gkattack-front\src\main.js
 */
import Vue from 'vue'

// import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css
import '@/styles/global.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters

import { Message } from 'element-ui'

import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

import vueAwesomeCountdown from 'vue-awesome-countdown'

Vue.use(Autocomplete)

Vue.use(Element, {
  size: localStorage.getItem('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

Vue.use(vueAwesomeCountdown, 'vac')

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 对错误的简单处理
Vue.config.errorHandler = function(err, vm, info) {
  Message({
    message: err,
    type: 'error',
    duration: 2 * 1000
  })
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
