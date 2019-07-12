<template>
	<div class="body-content">
		<!--  style="height: 50px;padding-top: 10px;" -->
		<el-row style="height: 50px;padding-top: 10px;">
			<el-form :inline="true" :model="condition" class="query-form" size="mini">
				<el-form-item label="用户代码">
					<el-input v-model="condition.userCode" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="用户名称">
					<el-input v-model="condition.userName" placeholder=""></el-input>
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
			 <el-button type="primary" v-on:click="addUser" size="mini">新增</el-button>
			 <el-button type="primary" v-on:click="editUser" size="mini">编辑</el-button>
			 <el-button type="primary" v-on:click="deleteUser" size="mini">删除</el-button>
		</el-row>
		<el-row id="table">
		 <el-table ref="multipleTable" :data="tableData.data" style="width: 100%" :max-height="tableHeight" border
		 	 highlight-current-row  @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
		 	  <el-table-column
		      type="selection"
		      width="30">
		    </el-table-column>
		    <el-table-column
		      prop="userCode"
		      label="用户代码"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="userName"
		      label="用户名称"
		      width="220">
		    </el-table-column>
		    <el-table-column
		      prop="sex"
		      label="性别"
			   width="50">
			   <template slot-scope="scope">
					<span v-if="scope.row.sex==1">男</span>
					<span v-if="scope.row.sex==-1">女</span>
				</template>
		    </el-table-column>
			<el-table-column
		      prop="age"
		      label="年龄"
			   width="50">
		    </el-table-column>
			<el-table-column
		      prop="tell"
		      label="电话">
		    </el-table-column>
			<el-table-column
		      prop="addr"
		      label="地址">
		    </el-table-column>
		  </el-table>
		</el-row>
		<!--  -->
		 <el-pagination class="pagination"
	      @size-change="handleSizeChange"
	      @current-change="paginationCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40,50]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="tableData.count">
	    </el-pagination>
		<el-dialog title="新增/编辑" :visible.sync="userdialog">
		<!--  style="text-align: right;" -->
			<el-form :inline="true" :label-position="labelPosition" :model="addForm">
				<el-row>
					<el-col :span="12">	
						<el-form-item label="用户代码" >
							<el-input v-model="addForm.userCode" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio v-model="addForm.sex" label='1' style="margin-left:60px;">男</el-radio>
  							<el-radio v-model="addForm.sex" label='-1'>女</el-radio>
						</el-form-item>
						<el-form-item label="电话" >
							<el-input v-model="addForm.tell"></el-input>
						</el-form-item>
						<el-form-item label="角色" >
							<el-select v-model="roleUuids" multiple placeholder="请选择" style="width:183px">
								<el-option v-for="item in roleList" :key="item.roleUuid"
									:label="item.roleName"
									:value="item.roleUuid">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户名称" >
							<el-input v-model="addForm.userName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="年龄" >
							<el-input-number v-model="addForm.age" :min="1" :max="100"></el-input-number>
						</el-form-item>
						<el-form-item label="地址" >
							<el-input v-model="addForm.addr"></el-input>
						</el-form-item>
						
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="userdialog = false">取 消</el-button>
				<el-button type="primary" @click="saveUser">保存</el-button>
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
					userCode:null,
					userName:null,
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
				userdialog:false,
				formLabelWidth:80,
				addForm:{
					userCode:null,
					userName:null,
					sex:null,
					age:null,
					tell:null,
					addr:null
				},
				roleList:[],
				roleUuids:[],
				labelPosition:"left",
				typeDisabled:false

			}
		},
		methods:{
			query(){
				let params =this.condition;//{'condition':this.condition};//JSON.stringify(this.condition)
				let url="base/user/userList";
	        	http.Post(url,params).then((result) => {
	                   this.tableData=result;
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			addUser(){
				//新增
				this.addForm={};
				this.userdialog=true; 
			},
			editUser(){
				if(this.multipleSelection.length==1){
					//编辑
					this.roleUuids=[];
					let urList=this.multipleSelection[0].urList;
					urList.forEach(item=>{
						this.roleUuids.push(item.roleUuid);
					})
					this.addForm=Object.assign({}, this.multipleSelection[0]);//拷贝对象
					this.addForm.sex=this.addForm.sex+'';
                    this.userdialog=true;
				}else{
					alert("不可选择多条数据！");
				}
			},
			deleteUser(){
				if(this.multipleSelection.length==0){
					return;
				}
				let uuids=new Array();
				this.multipleSelection.forEach(item => {
					uuids.push(item.userUuid);
				});
				http.Post("base/user/delete",uuids).then((result) => {
	                   this.query();
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			saveUser(){
				let params ={"user":JSON.stringify(this.addForm),"roleUuids":JSON.stringify(this.roleUuids)};//{'condition':this.condition};//JSON.stringify(this.condition)
				let url="base/user/save";
	        	http.Post(url,params).then((result) => {
					   this.userdialog=false;
					   this.query();
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			handleCurrentChange(val){//单选触发事件
				console.log(val);
				this.$refs.multipleTable.clearSelection();
				this.$refs.multipleTable.toggleRowSelection(val);
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
        
        	let params ={'condition': JSON.stringify(this.condition)}
        	var url="base/user/userList";
        	http.Post(url,this.condition).then((result) => {
                   this.tableData=result;
                }).catch(err=>{
                   console.log(err)
				});
        	http.Get("base/role/allRole",{"keyword":""}).then((result) => {
                   this.roleList=result;
                }).catch(err=>{
                   console.log(err)
                });
		} 
	}
</script>

<style scoped>
	
</style>