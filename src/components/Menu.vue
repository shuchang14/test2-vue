<template>
	<div class="body-content">
		<!--  style="height: 50px;padding-top: 10px;" -->
		<el-row style="height: 50px;padding-top: 10px;">
			<el-form :inline="true" :model="condition" class="query-form" size="mini">
				<el-form-item label="菜单代码">
					<el-input v-model="condition.menuCode" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="菜单名称">
					<el-input v-model="condition.menuName" placeholder=""></el-input>
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
			 <el-button type="primary" v-on:click="addMenu" size="mini">新增</el-button>
			 <el-button type="primary" v-on:click="editMenu" size="mini">编辑</el-button>
			 <el-button type="primary" v-on:click="deleteMenu" size="mini">删除</el-button>
		</el-row>
		<el-row id="table">
		 <el-table :data="tableData.data" style="width: 100%" :max-height="tableHeight" border
		 	 highlight-current-row  @selection-change="handleSelectionChange">
		 	  <el-table-column
		      type="selection"
		      width="30">
		    </el-table-column>
		    <el-table-column
		      prop="menuCode"
		      label="菜单代码"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="menuName"
		      label="菜单名称"
		      width="220">
		    </el-table-column>
		    <el-table-column
		      prop="url"
		      label="url">
		    </el-table-column>
			<el-table-column
		      prop="num"
		      label="序号">
		    </el-table-column>
		  </el-table>
		</el-row>
		 <el-pagination class="pagination"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40,50]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="tableData.count">
	    </el-pagination>
		<el-dialog title="新增/编辑" :visible.sync="menudialog">
			<el-form :inline="true" :label-position="labelPosition" :model="addForm" style="text-align: right;">
				<el-row>
					<el-col :span="12">
						<el-form-item label="菜单类型" >
							<el-select v-model="addForm.type" placeholder="请选择" @change="menuTypeChange">
								<el-option label="菜单组" value="group"></el-option>
								<el-option label="菜单" value="menu"></el-option>
								<el-option label="按钮" value="button"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="菜单代码" >
							<el-input v-model="addForm.menuCode" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="序号" >
							<el-input v-model="addForm.num" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="iconUrl" >
							<el-input v-model="addForm.iconUrl"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="菜单组" >
							<el-select v-model="addForm.preMenuUuid" :disabled="typeDisabled" placeholder="请选择">
								<el-option label="" value=""></el-option>
								<el-option v-for="group in groupList" v-bind:key="group.menuUuid" 
								   :label="group.menuName" :value="group.menuUuid"></el-option>	
							</el-select>
						</el-form-item>
						<el-form-item label="菜单名称" >
							<el-input v-model="addForm.menuName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="url" >
							<el-input v-model="addForm.url" :disabled="typeDisabled" autocomplete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="menudialog = false">取 消</el-button>
				<el-button type="primary" @click="saveMenu">保存</el-button>
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
					menuCode:null,
					menuName:null,
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
				menudialog:false,
				formLabelWidth:80,
				addForm:{
					menuCode:null,
					menuName:null,
					preMenuUuid:null,
					url:null,
					iconUrl:null,
					num:null,
					iconUrl:null,
					type:null
				},
				labelPosition:"left",
				typeDisabled:false,
				groupList:[]

			}
		},
		methods:{
			query(){
				let params =this.condition;//{'condition':this.condition};//JSON.stringify(this.condition)
				let url="base/menu/menuListBody";
				// let url="base/menu/postMenus";
				// http.Post(url,{"type":"aaa","menu":"gggg","name":"nnnn"}).then((result)=>{
				// 	console.log(result);
				// }).catch(err=>{

				// });
	        	http.Post(url,params).then((result) => {
	                   this.tableData=result;
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			addMenu(){
				//新增
				this.addForm={};
				this.menudialog=true; 
			},
			editMenu(){
				if(this.multipleSelection.length==1){
					//编辑
					this.addForm=Object.assign({}, this.multipleSelection[0]);//拷贝对象
					if(this.addForm.type=="group"){
					    this.typeDisabled=true;
					}else{
						this.typeDisabled=false;
					}
                    this.menudialog=true;
				}else{
					alert("不可选择多条数据！");
				}
			},
			deleteMenu(){
				if(this.multipleSelection.length==0){
					return;
				}
				let uuids=new Array();
				this.multipleSelection.forEach(item => {
					uuids.push(item.menuUuid);
				});
				http.Post("base/menu/delete",uuids).then((result) => {
	                   this.query();
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			saveMenu(){
				let params =this.addForm;//{'condition':this.condition};//JSON.stringify(this.condition)
				let url="base/menu/save";
	        	http.Post(url,params).then((result) => {
					   this.menudialog=false;
					   this.query();
					   if(this.addForm.type=='group'){
						   http.Get('base/menu/getMenus',{"type":"group"}).then((result) => {
							this.groupList=result;
							}).catch(err=>{
							console.log(err)
							});
					   }
	                }).catch(err=>{
	                   console.log(err)
	                });
			},
			menuTypeChange(val){
				if(val=="group"){
					this.addForm.preMenuUuid=null;
					this.typeDisabled=true;
				}else{
					this.typeDisabled=false;
				}
			},
			handleCurrentChange(val){//单选触发事件
				console.log(val);
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
			handleCurrentChange(val) {
		        console.log('当前页: '+val);
		        this.condition.currentPage=val;
		         this.query();
		    }
		},
        created:function(){//用于数据初始化
           
        },
        mounted() {
		
        
        	let params ={'condition': JSON.stringify(this.condition)}
        	var url="base/menu/menuList";
        	http.Post(url,this.condition).then((result) => {
                   this.tableData=result;
                }).catch(err=>{
                   console.log(err)
				});
        	var url="base/menu/getMenus";
        	http.Get(url,{"type":"group"}).then((result) => {
                   this.groupList=result;
                }).catch(err=>{
                   console.log(err)
                });
		} 
	}
</script>

<style scoped>
	
</style>