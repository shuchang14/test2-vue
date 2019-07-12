import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import AdminHome from '@/components/AdminHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      nameText:'欢迎',
      component: HelloWorld
    },{
    	path:'/home',
    	name:'Home',
    	nameText:'首页',
    	component:Home
    },{
    	path:'/adminHome',
    	name:'AdminHome',
    	nameText:'管理',
    	component:AdminHome
    }
  ]
})
