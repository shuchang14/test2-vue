<template>
	<div class="body-content">
		<!--  style="height: 50px;padding-top: 10px;" -->
		<el-row style="height: 50px;padding-top: 10px;">
			<el-form :inline="true" :model="condition" class="query-form" size="mini">
				<el-form-item label="角色代码">
					<el-input v-model="condition.roleCode" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="角色名称">
					<el-input v-model="condition.roleName" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-date-picker
					v-model="condition.twoTime"
					type="daterange"
					value-format="yyyy-MM-dd"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="query" size="mini">查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row class="toolbar">
			 <el-button type="primary" v-on:click="addRole" size="mini">新增</el-button>
			 <el-button type="primary" v-on:click="editRole" size="mini">编辑</el-button>
			 <el-button type="primary" v-on:click="deleteRole" size="mini">删除</el-button>
		</el-row>
		<el-row id="table">
		 <el-table ref="roleTable" :data="tableData.data" style="width: 100%" :max-height="tableHeight" border
		 	 highlight-current-row  @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
		 	  <el-table-column
		      type="selection"
		      width="30">
		    </el-table-column>
		    <el-table-column
		      prop="roleCode"
		      label="角色代码"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="roleName"
		      label="角色名称"
		      width="220">
		    </el-table-column>
		    <el-table-column
		      prop="grade"
		      label="grade">
		    </el-table-column>
		
		  </el-table>
		</el-row>
		 <el-pagination class="pagination"
	      @size-change="handleSizeChange"
	      @current-change="paginationCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40,50]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="tableData.count">
	    </el-pagination>
		<el-dialog title="新增/编辑" :visible.sync="roledialog">
			<el-form :inline="true" :label-position="labelPosition" :model="addForm" style="text-align: right;">
				<el-row>
					<el-col :span="12">
						
						<el-form-item label="角色代码" >
							<el-input v-model="addForm.roleCode" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="grade" >
							<el-input v-model="addForm.grade" autocomplete="off"></el-input>
						</el-form-item>
					
					</el-col>
					<el-col :span="12">
						<el-form-item label="角色名称" >
							<el-input v-model="addForm.roleName" autocomplete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="roledialog = false">取 消</el-button>
				<el-button type="primary" @click="saveRole">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import http from '../http.js'
	export default{
		name:'Menu',
		data(){
			return{
				tableHeight:parseInt(localStorage.getItem("boxHeight"))-50-35-35,//box总高度-查询条件高度-toolbar高度-分页高度
				condition:{
					roleCode:null,
					roleName:null,
					currentPage:1,
					pageSize:10,
					twoTime:[]
				},
				currentPage:1,
				pageSize:10,
				tableData:{
					code:0,
					count:0,
					msg:null,
					data:[]
				},
				multipleSelection:[],
				roledialog:false,
				formLabelWidth:80,
				addForm:{
					roleCode:null,
					roleName:null,
					grade:null
				},
				labelPosition:"left",
				typeDisabled:false

			}
		},
		methods:{
			query(){
				let params =this.condition;//{'condition':this.condition};//JSON.stringify(this.condition)
				let url="base/role/roleList";
	        	http.Post(url,params).then((result) => {
	                   this.tableData=result;
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			addRole(){
				//新增
				this.addForm={};
				this.roledialog=true; 
			},
			editRole(){
				if(this.multipleSelection.length==1){
					//编辑
					this.addForm=Object.assign({}, this.multipleSelection[0]);//拷贝对象
                    this.roledialog=true;
				}else{
					alert("不可选择多条数据！");
				}
			},
			deleteRole(){
				if(this.multipleSelection.length==0){
					return;
				}
				let uuids=new Array();
				this.multipleSelection.forEach(item => {
					uuids.push(item.roleUuid);
				});
				http.Post("base/role/delete",uuids).then((result) => {
	                   this.query();
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			saveRole(){
				let params =this.addForm;//{'condition':this.condition};//JSON.stringify(this.condition)
				let url="base/role/save";
	        	http.Post(url,params).then((result) => {
					   this.roledialog=false;
					   this.query();
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			handleCurrentChange(val){//单选触发事件
				console.log(val);//roleTable
				this.$refs.roleTable.clearSelection();
				this.$refs.roleTable.toggleRowSelection(val);
			},
			handleSelectionChange(val){//多选触发事件
				console.log(val);
				this.multipleSelection=val;
			},
			handleSizeChange(val){
				 console.log('每页: '+val);
				 this.condition.pageSize=val;
				 this.query();
			},
			paginationCurrentChange(val) {
		        console.log('当前页: '+val);
		        this.condition.currentPage=val;
		         this.query();
		    }
		},
        created:function(){//用于数据初始化
           
        },
        mounted() {
        	var url="base/role/roleList";
        	http.Post(url,this.condition).then((result) => {
                   this.tableData=result;
                }).catch(err=>{
                   console.log(err)
				});
		} 
	}
</script>

<style scoped>
	
</style>