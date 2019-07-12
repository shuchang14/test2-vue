import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import AdminHome from '@/components/AdminHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      nameText:'登录',
      component: Login
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
