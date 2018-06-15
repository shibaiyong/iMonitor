// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueResource from 'vue-resource'


import base from './assets/js/base'


import './assets/css/common/common.css'
// import 'font-awesome/css/font-awesome.min.css'
import './assets/css/common/ZC_Common.css';


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(base)

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

Vue.prototype.getLineUnitWidth = function (num){
  return window.screen.width * 0.78 / num
}

Vue.prototype.initPageSize = function () {
  // console.log(this)
  this.contentMarginLeft = window.screen.width * 0.15
  this.sliderWidth = window.screen.width * 0.15 - 1
  if (!this.showSiderbar) {
    this.contentMarginLeft = 0
    this.sliderWidth = 0
  }
  this.contentWidth = window.screen.width - this.contentMarginLeft
  var content = document.getElementsByClassName("showSiderbar")
  var marginLeftpx = this.contentMarginLeft
  setTimeout(function () {
    if(content[0]){
      var width = "calc(100% - " + marginLeftpx + "px)"
      content[0].style.width = width
    }
  }, 200)
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
