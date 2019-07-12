// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'//
//element-ui/lib/theme-default/index.css
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
/*Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  //console(err+" & "+info);
}*/
const store = new Vuex.Store({
	state: {
		count: 0,
		adminleftnavnum:"1" //管理后台左侧导航
	},
	mutations: {
		increment (state) {
			state.count++
		}
	}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
