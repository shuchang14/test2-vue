<template>
  <div class="login-body" :style="bodyStyle">
            <el-form ref="form" :model="userInfo" label-width="80px" class="login-box" :style="loginBoxStyle">
                <el-form-item label="账号:">
                    <el-input v-model="userInfo.userCode"></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input type="password" v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="login" size="small">登录</el-button>
                    <el-button type="warning" plain @click="register" size="mini">注册新用户</el-button>
                </el-form-item>
            </el-form>
        <el-dialog title="注册" :visible.sync="userdialog" >
            <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px" style="width:620px;">
                 <el-form-item label="账号:">
                    <el-input v-model="addForm.userCode"></el-input>
                </el-form-item>
                 <el-form-item label="名称:">
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="addForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="addForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveUser('addForm')">注册</el-button>
                    <el-button @click="resetForm('addForm')">重置</el-button>
                </el-form-item>
            </el-form>
			<!-- <div slot="footer" class="dialog-footer">
				<el-button @click="userdialog = false">取 消</el-button>
				<el-button type="primary" @click="saveUser">保存</el-button>
			</div> -->
		</el-dialog>
  </div>
</template>

<script>
import http from '../http.js'
export default {
    name: 'Login',
    data () {
         var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.addForm.checkPass !== '') {
                    this.$refs.addForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.addForm.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            msg: '',
            userInfo:{
                userCode:null,
                password:null
            },
            userdialog:false,
           
           addForm: {
                userCode:'',
                userName:'',
                password: '',
                checkPass:'',
                age: ''
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            },
            bodyStyle:{
                height:'100px'
            },
            loginBoxStyle:{
                left:'300px'
            }
        }
    },
    methods:{
        login(){
            sessionStorage.setItem("userCode",this.userInfo.userCode);
            this.$router.push({path:'/adminHome'});
        },
        register(){
           this.userdialog=true;
        },
        saveUser(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params ={"user":JSON.stringify(this.addForm)};
                    let url="base/user/save";
                    http.Post(url,params).then((result) => {
                            this.userdialog=false;
                            this.$message({
                                message: '注册成功！',
                                type: 'success'
                            });
                }).catch(err=>{
                    console.log(err)
                });
                   // alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
          
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.addForm={};
        }
    },
    mounted(){
         var h = window.innerHeight;
         var w = window.innerWidth;
         var _width=w/2-338/2;
         this.bodyStyle.height=h+'px';
         this.loginBoxStyle.left=_width+'px';
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-body{
    background-image: url("../assets/login_back.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: -535px;
    position: relative;
}
.login-box{
        /* margin: 0 auto; */
    width: 338px;
    /* margin-top: 160px; */
    background-color: #abc0db9e;
    /* margin-top: 15px; */
    padding-top: 50px;
    padding-right: 30px;
    padding-bottom: 5px;
    position: absolute;
    top: 120px;
}
</style>
