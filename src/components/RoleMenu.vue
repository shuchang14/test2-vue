<template>
	<div class="body-content">
		<el-row>
			<el-col :span="8">
				<div style="padding: 5px;">
					<el-row style="background-color: #b4d4ee;">
						<div style="padding-top: 8px; padding-left: 10px;padding-bottom: 35px;text-align: left;">
							<el-col :span="6">
								<span style="font-weight: bold;font-size: 18px;color: #4f465e;">角色列表</span>
							</el-col>
							<el-col :span="13">
								<el-input size="mini"
										placeholder="角色代码/角色名称"
										prefix-icon="el-icon-search"
										v-model="condition.search">
								</el-input>
							</el-col>
							<el-col :span="5">
								<div style="margin-left: 15px;">
									<el-button type="primary" size="mini" @click="queryRole">查询</el-button>
								</div>

							</el-col>
						</div>
					</el-row>
					<!--表格-->
					<el-table
							:data="tableData.data"
							border
							highlight-current-row
							@row-click="getRoleMenu"
							style="width: 100%">
					<!--  <el-table-column type="selection">
						</el-table-column>-->
						<el-table-column
								prop="roleCode"
								label="角色代码">
						</el-table-column>
						<el-table-column
								prop="roleName"
								label="角色名称">
						</el-table-column>
						
					</el-table>
					<el-pagination
							@size-change="handleSizeChange"
							@current-change="paginationCurrentChange"
							:current-page="condition.currentPage"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="condition.pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="tableData.count">
					</el-pagination>
				</div>
			</el-col>
			<el-col :span="8">
				<div style="padding: 5px;">
					<el-row style="background-color: #b4d4ee;">
						<div style="padding-top: 8px; padding-left: 10px;padding-bottom: 35px;">
							<el-col :span="20" style="text-align: left;">
								<span style="font-weight: bold;font-size: 18px;color: #4f465e;">菜单/权限</span>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" size="mini" @click="saveMenu">保存</el-button>
							</el-col>
						</div>

				</el-row>
					<!--分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点 :default-expanded-keys="expandedKeys"-->
					<el-tree
							ref="menuTree"
							:data="menuList"
							show-checkbox
							@node-click="menuTreeClick"
							node-key="menuUuid"
							 default-expand-all
							:default-checked-keys="checkedKeys"
							:props="defaultProps"
							style="background-color: beige;">
					</el-tree>
				</div>
			</el-col>
			<el-col :span="8">
				<div style="padding: 5px;">
				<el-row style="background-color: #b4d4ee;">
					<div style="padding-top: 8px; padding-left: 10px;padding-bottom: 35px;">
					<el-col :span="20" style="text-align: left;">
						<span style="font-weight: bold;font-size: 18px;color: #4f465e;"> 按钮</span>
					</el-col>
					<el-col :span="4">
					<el-button type="primary" size="mini" @click="saveBtn">保存</el-button>
					</el-col>
					</div>
				</el-row>
				<el-row>
					<div  style="padding-left: 35px;">
						<el-tree
								ref="btnTree"
								:data="btnMenuList"
								show-checkbox
								node-key="menuUuid"
								:default-checked-keys="btnCheckedKeys"
								:props="defaultProps">
						</el-tree>
					</div>
				</el-row>
				</div>
			</el-col>
        </el-row>
	</div>
</template>

<script>
	import http from '../http.js'
	export default{
		name:'Menu',
		data(){
			return{
				tableHeight:parseInt(localStorage.getItem("boxHeight")),//box总高度-查询条件高度-toolbar高度-分页高度
				condition:{
					search:null,
					currentPage:1,
					pageSize:10
				},
				tableData:{
					code:0,
					count:0,
					msg:null,
					data:[]
				},
				menuList:[],
				btnMenuList:[],
				expandedKeys:[],
				checkedKeys:[],
				defaultProps: {
					children: 'subMenuList',
					label: 'menuName'
				},
				btnCheckedKeys:[],
				roleUuid:null,
				preMenuUuid:null
			}
		},
		methods:{
			queryRole(){
				let params =this.condition;//{'condition':this.condition};//JSON.stringify(this.condition)
				let url="base/role/roleList";
	        	http.Post(url,params).then((result) => {
	                   this.tableData=result;
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			getRoleMenu(row){
				this.checkedKeys=[];
				this.$refs.menuTree.setCheckedKeys([]);
                this.roleUuid=row.roleUuid;
                http.Get("base/menu/roleMenus",{"roleUuid":this.roleUuid}).then(result=>{
					this.checkedKeys=result;
					console.log(this.checkedKeys);
                }).catch(error=>{
                    console.log(error);
                });
			},
			saveMenu(){
				var menuUuids =  this.$refs.menuTree.getCheckedKeys();
				http.Post("base/menu/saveRoleMenu",{"roleUuid":this.roleUuid,"menuUuids":JSON.stringify(menuUuids)}).then((result) => {
					    // http.Get("base/menu/roleMenus",{"roleUuid":this.roleUuid}).then(result=>{
						// 	app.checkedKeys=result;
						// }).catch(error=>{
						// 	console.log(error);
						// });
						this.$message({
							message: '保存成功！',
							type: 'success'
						});
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			menuTreeClick(obj,note,com){
				this.preMenuUuid=note.key;
				http.Get("base/menu/btnList",{"roleUuid":this.roleUuid,"preMenuUuid":this.preMenuUuid}).then((result) => {
					   this.btnMenuList=result.btnList;
					   this.btnCheckedKeys=result.roleBtnList;
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			saveBtn(){
				let url="base/menu/saveRoleMenu";
				var menuUuids =  this.$refs.btnTree.getCheckedKeys();
	        	http.Post(url,{"roleUuid":this.roleUuid,"preMenuUuid":this.preMenuUuid,"menuUuids":JSON.stringify(menuUuids)}).then((result) => {
					  this.$message({
							message: '保存成功！',
							type: 'success'
						});
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			handleSizeChange(val){
				 console.log('每页: '+val);
				 this.condition.pageSize=val;
				 this.queryRole();
			},
			paginationCurrentChange(val) {
		        console.log('当前页: '+val);
		        this.condition.currentPage=val;
		         this.queryRole();
		    }
		},
        created:function(){//用于数据初始化
		   //加载角色
        	http.Post("base/role/roleList",this.condition).then((result) => {
                   this.tableData=result;
                }).catch(err=>{
                   console.log(err)
				});
		   //加载菜单
        	http.Get("base/menu/getMenuTreeList").then((result) => {
                   this.menuList=result;
                }).catch(err=>{
                   console.log(err)
				});
        },
        mounted() {
        	
		} 
	}
</script>

<style scoped>
	
</style>