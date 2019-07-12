function menuRouter(path){
	for (var i = 0; i < dynamicRouter.length; i++) {
	    var route = dynamicRouter[i];
	    if (route.path == path) {
	      return route.component;
	    }
  	}
}
/**
 * 路由定义
 * path跟配置里的资源标示对应,同时跟url地址对应
 */
const dynamicRouter = [
  {
    path: '/helloworld',
    component: resolve => require(['@/components/HelloWorld.vue'], resolve)
  }, 
  {
    path: '/adminHome',
    component: resolve => require(['@/components/AdminHome.vue'], resolve)
  }, 
  {
    path: '/menu',
    component: resolve => require(['@/components/Menu.vue'], resolve)
  }, 
  {
    path: '/user',
    component: resolve => require(['@/components/User.vue'], resolve)
  }, 
  {
    path: '/role',
    component: resolve => require(['@/components/Role.vue'], resolve)
  }, 
  {
    path: '/roleMenu',
    component: resolve => require(['@/components/RoleMenu.vue'], resolve)
  }
]
export {menuRouter}