<template>
	<div id="adminBody">
		<el-container>
		  <el-header ref="homeHead">
		  	<el-row  class="head-class">
					<el-col :span="3">
						<h4>AdminHome</h4>
					</el-col>
					<el-col :span="16" style="position: relative;">
						<i class="el-icon-s-unfold show-hide-menu" v-if="isCollapse==true" v-on:click="changeMenu(false)"></i><!--收起-->
						<i class="el-icon-s-fold show-hide-menu" v-else v-on:click="changeMenu(true)"></i><!--展开-->
					</el-col>
					<el-col :span="5">
						<div style="    position: absolute;right: 20px;">
							
							<el-dropdown>
								<span class="el-dropdown-link">
									<img src="../assets/logo.png" style="height: 40px;margin-top: 10px;margin-right: 10px;">
									<span class="user-span-text">{{userInfo.userCode}}</span>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
									<el-dropdown-item icon="el-icon-setting">更改密码</el-dropdown-item>
									<el-dropdown-item icon="el-icon-close">安全退出</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
						
						
					</el-col>
			</el-row>
		  </el-header>
		  <el-container>
		  	  <transition name="el-zoom-in-left">
		           	<el-menu v-show="isCollapse==false" ref="menuRef" class="el-menu-vertical-demo transition-left adminmenu" v-bind:style="menuStyle"
				      @open="handleOpen"
				      @close="handleClose"
				      background-color="#545c64"
				      text-color="#fff"
				      active-text-color="#ffd04b">
					  <!-- el-icon-star-off   el-icon-tickets-->
					    <template v-for="item in menuList">
							<el-submenu :key="item.menuUuid" :index="item.menuUuid" class="menuitem" v-if="item.subMenuList.length>0">
								<template slot="title">
								<i v-if="item.iconUrl !=null && item.iconUrl !=''" :class="item.iconUrl"></i>
								<i v-else class="el-icon-star-off"></i>
								<span slot="title">{{item.menuName}}</span>
								</template>
								<el-menu-item v-for="child in item.subMenuList" :key="child.menuUuid" :index="child.menuUuid" 
									v-on:click="addTab(child)">
									<i v-if="child.iconUrl !=null && child.iconUrl !=''" :class="child.iconUrl"></i>
								    <i v-else class="el-icon-tickets"></i>
									{{child.menuName}}
								</el-menu-item>
						    </el-submenu>
						 </template>
					</el-menu>
		     </transition>
			 <el-main style="padding: 0;" class="main-class">
			    	<el-tabs id="menuTabs" v-model="currTab" type="card" closable @tab-remove="removeTab" width="100%">
				  <el-tab-pane 
				    v-for="item in tabList"
				    :key="item.name"
				    :label="item.title"
				    :name="item.name"
				    :closable="item.closable"
				  >
				  <div v-bind:style="tabContenStyle">
				  	<component :is=item.component :key="keyChange"></component>
				  </div>
				  </el-tab-pane>
				</el-tabs>
			</el-main>
		  </el-container>
		</el-container>
	    <div id="menuToolId">
            <ul>
				<li v-on:click="closeCurrTab">关闭当前页</li>
				<li v-on:click="closeAll">关闭所有页</li>
				<li v-on:click="closeOutsitCurrTab">关闭之外所有页</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {menuRouter} from '../router/menuRouter'
	import http from '../http.js'
	export default{
		name:'AdminHome',
		data(){
			return{
				menuList:[{
					menuUuid:'1001',
					menuCode:'G1001',
					menuName:'系统管理',
					url:'',
					subMenuList:[{
						menuUuid:'10012',
						menuCode:'MENU01',
						menuName:'菜单管理',
						url:'/menu',
						subMenuList:[]
					},{
						menuUuid:'10013',
						menuCode:'MENU03',
						menuName:'角色管理',
						url:'/role',
						subMenuList:[]
					},{
						menuUuid:'10014',
						menuCode:'MENU04',
						menuName:'用户管理',
						url:'/user',
						subMenuList:[]
					}]
				},{
					menuUuid:'1002',
					menuCode:'',
					menuName:'菜单组02',
					url:'',
					subMenuList:[{
						menuUuid:'100177',
						menuCode:'MEs04',
						menuName:'噶看安定',
						url:'/user',
						subMenuList:[]
					}]
				},{
					menuUuid:'1003',
					menuCode:'',
					menuName:'菜单组03',
					url:'',
					subMenuList:[]
				}],
				routes:this.$router.options.routes,
				collapse: false,
				isCollapse: false,
				currTab:"home",
				tabList:[{
					name:"home",
					title:"首页",
					closable:false,
					component: menuRouter('/helloworld')
				}
				],
				boxHeight:'gggggggggg',
				asideStyle:{
					width:'201px'
				},
				menuStyle:{
					height:'300px'
				},
				tabContenStyle:{
					height:'300px',
					overflow:'auto'
				},
				menuTool:false,
				keyChange:'',
				userInfo:{
					userCode:null,
					password:null
				}
			}
		},
		methods:{
			handleNodeClick:function(data){
				//alert(data);
				console.log(data);
			},
			changeMenu(flag){
			
				if(flag){
					this.isCollapse=flag;
					this.asideStyle.width='65px';
				}else{
					this.asideStyle.width='201px';
					this.isCollapse=flag;
				}
				
			},
			handleOpen(key, keyPath) {
		        console.log(key, this.routes);
		    },
		    handleClose(key, keyPath) {
		        console.log(key, keyPath);
			},
		    addTab(menu){
		    	for(var i=0;i<this.tabList.length;i++){
		    		if(this.tabList[i].name==menu.menuUuid){
		    			this.currTab = menu.menuUuid;
		    			return;
		    		}
		    	}
	    		this.tabList.push({
		          title: menu.menuName,
		          name: menu.menuUuid,
		          closable:true,
		          component: menuRouter(menu.url)
		        });
		        this.currTab = menu.menuUuid;
		    	
		    },
		    removeTab(targetName){
		    	if(targetName=='home'){
		    		return;
		    	}
		    	let tabs = this.tabList;
		        let activeName = this.currTab;
		        if (activeName === targetName) {
		          tabs.forEach((tab, index) => {
		            if (tab.name === targetName) {
		              let nextTab = tabs[index + 1] || tabs[index - 1];
		              if (nextTab) {
		                activeName = nextTab.name;
		              }
		            }
		          });
		        }
		        this.currTab = activeName;
                this.tabList = tabs.filter(tab => tab.name !== targetName);
			},
			closeCurrTab(){
			   this.removeTab(this.currTab);
			   $("#menuToolId").css({"position":"absolute","top":10,"left":100,"display":"none"});
			},
			closeAll(){
				this.tabList = this.tabList.filter(tab => tab.name == 'home');
				this.currTab='home';
				 $("#menuToolId").css({"position":"absolute","top":10,"left":100,"display":"none"});
			},
			closeOutsitCurrTab(){
				this.tabList = this.tabList.filter(tab => (tab.name == 'home'||tab.name==this.currTab));
				 $("#menuToolId").css({"position":"absolute","top":10,"left":100,"display":"none"});
			},
			handleTabsEdit(targetName, action) {
				if (action === 'add') {
					//let newTabName = ++this.tabIndex + '';
					// this.tabList.push({
					// 	title: 'New Tab',
					// 	name: newTabName,
					// 	content: 'New Tab content'
					// });
					// this.editableTabsValue = newTabName;
				}
				if (action === 'remove') {
					let tabs = this.tabList;
					let activeName = this.currTab;
					if (activeName === targetName) {
						tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
							activeName = nextTab.name;
							}
						}
						});
					}
					this.currTab = activeName;
					this.editableTabs = tabs.filter(tab => tab.name !== targetName);
				}
			}
		}, 
		created:function(){//用于数据初始化
		   this.userInfo.userCode=sessionStorage.getItem("userCode");
		   console.log(this.userInfo);
		   //加载菜单
			// http.Get("base/menu/getMenuList",{"userCode":""}).then((result) => {
			// 		this.menuList=result;
			// 	}).catch(err=>{
			// 		console.log(err)
			// 	});
        },
        mounted() {
			$(".el-tabs__nav").bind("contextmenu",function(e){
				//禁用默认的右击事件
				return false;
			});
			$(".el-tabs__nav").mousedown(function(e) {
				//自定义右击事件
				var c = e.target._prevClass;
				if (3 == e.which) {
					//右键为3
					$("#menuToolId").css({"position":"absolute","top":e.pageY,"left":e.pageX,"display":"block"});
				}
			})
			$("#adminBody").mousedown(function(e) {
				//点击任意地方关闭tab工具栏
				//console.log(e.which);
				var c = e.target._prevClass;
				//左键为1
                if (1 == e.which) {
					//左键为1 target.innerHTML
					if(e.target.innerHTML=='关闭当前页'||e.target.innerHTML=='关闭所有页'||e.target.innerHTML=='关闭之外所有页'){
						return true;
					}
					$("#menuToolId").css({"position":"absolute","top":e.screenY,"left":e.screenX,"display":"none"});
				}
			})
        	var headHeight = this.$refs.homeHead.height;
            console.log(headHeight);
            var _headHeight=parseInt(headHeight);
            console.log(_headHeight);
		    var h = window.innerHeight
		    console.log(h-_headHeight)
		    var menuHeight=h-_headHeight
		    this.menuStyle.height=menuHeight+'px';
		    this.tabContenStyle.height=(menuHeight-40-1)+'px';
		    this.boxHeight=(menuHeight-40-1)+'px';
			localStorage.setItem("boxHeight",(menuHeight-40-1)+'px');

		  } 
	}
</script>

<style>
	/*.el-input__inner{
		height: 30px;
	}*/
	.el-tabs__header {
	    padding: 0;
	    position: relative;
	    margin: 0 0 0px;
	}
	.body-content{
		padding-left: 10px;
	}
	.query-form{
		text-align: left;
		padding-left: 10px;
	}
	.pagination{
		height: 30px;
		padding: 0;
		padding-top: 5px;
		float: left;
	}
	.toolbar{
		text-align: left;
		background-color: #eaf2f2;
		padding-left: 5px;
   		height: 35px;
		line-height: 34px;
	}
	.el-table td, .el-table th {
   		 padding: 8px 0;
	}
</style>
<style scoped>
	body{
		padding: 0;
		margin: 0;
	}
	.adminmenu{
		text-align: left;
	}
	/* .menuitem .el-submenu__title{
		text-align: left;
	}
	.menuitem .el-submenu .el-menu-item{
		text-align: left;
	} */
	.el-header {
		padding: 0;
	}
	.head-class{
		background-color: #545c64;
		color: whitesmoke;
		/*height: 200;*/
	}
	.head-right{
		    position: absolute;
			right: 0px;
			top: 20px;
			 padding-right: 18px;
			background-color: darkgray;
	}
	.user-span-text{	   
		color: antiquewhite;
		vertical-align: top;
		display: inline-block;
		margin-top: 18px;
		font-size: 20px;
	}
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  /*  min-height: 400px;*/
    }
	#menuToolId{
		display: none;
	}
    .show-hide-menu{
    	font-size: 40px;
    	position:absolute;
    	top: 10px;
    	left: 10px;
    }
    .show-hide-menu:hover{
    	background-color: #42B983;
    	cursor:pointer;
    }
    
     .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
   #menuToolId ul li{
	margin-top: 0px;
	padding-top: 12px;
    font-weight: 600;
    color: darkgray;
    background-color: aliceblue;
  }
  #menuToolId ul li{
	list-style: none;
	text-align: left;
	font-size: 12px;
    padding-bottom: 5px;
    margin-top: 0px;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 5px;
    margin-left: -20px;
    background-color: aliceblue;
  }
  #menuToolId ul li:hover{
    
		color: aquamarine;
    	cursor:pointer;
    }
</style>