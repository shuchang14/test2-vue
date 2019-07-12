<template>
	<div v-bind:style="contentStyle">
		<el-row>
		  <el-col :span="6">
		  	<h2>Home</h2>
			<h2>数据绑定</h2>
			<h3>字符串</h3>
			<span v-once>{{msg}}</span>    v-text:<span v-text="msg"></span>
			<h4 v-text="msg" v-once></h4><!--v-once  通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。-->
			html
			<h4 v-html="msg"></h4>
			<h3>路由</h3>
			<router-link to="/">wellCome</router-link>
			<h3>对象</h3>
			 <span>{{user.userCode}}</span>
			 <span>{{user.userName}}</span>
			<h3>集合</h3>
			  <ul>
			  	<li v-for="user in userList">{{user.userCode}}</li>
			  </ul>
		  </el-col>
		  <el-col :span="18">
		  	<h2>双向数据绑定</h2>
			 msg:<input v-model="msg" />
			 user:<input v-model="user.userCode" /><input v-model="user.userName" />
			 <h2>事件触发</h2>
			 <button v-on:click="greet">Greet</button>
		  </el-col>
		</el-row>
		
	</div>
</template>

<script>
	export default{
		name:'Home',
		data(){
			return{
				msg:'HOME',
				contentStyle:{
					height:'300px'
				},
				user:{
					userCode:'shu',
					userName:'树'
				},
				userList:[{
					userCode:'shu1',
					userName:'树1'
				},{
					userCode:'shu2',
					userName:'树2'
				},{
					userCode:'shu2',
					userName:'树2'
				},{
					userCode:'shu2',
					userName:'树2'
				},{
					userCode:'shu2',
					userName:'树2'
				},{
					userCode:'shu2',
					userName:'树2'
				},{
					userCode:'shu2',
					userName:'树2'
				},{
					userCode:'shu2',
					userName:'树2'
				}]
			}
		},
		methods:{
			greet:function(){
				alert('啊啊啊啊啊啊'+this.msg+this.bodyHeight);
				
			}
		},
        mounted() {
        	 this.contentStyle.height=localStorage.getItem("boxHeight");
		  } 
	}
</script>

<style>
</style>