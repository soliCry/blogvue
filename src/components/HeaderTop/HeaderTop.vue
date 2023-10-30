<template>
  <el-container>
    <div style="width: 100%;">
      <el-row>
        <el-col :span="4" class="img">
          <img style="float:right;" src="./image/icon.png"/>
        </el-col>
        <el-col :span="8">
          <el-menu style="height: 40px" :default-active="$route.path" mode="horizontal" @select="handleSelect"
                   active-text-color="#2b2b2b" :router="true">
            <el-menu-item index="/articles">&nbsp;&nbsp;Article&nbsp;&nbsp;</el-menu-item>
            <el-menu-item index="/about">&nbsp;&nbsp;About&nbsp;&nbsp;</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <el-input
            class="input"
            placeholder="Please enter a search"
            v-model="keyword"
            @keyup.enter.native="toSearch">
            <el-select class="select" v-model="select" slot="prepend" placeholder="Select">
            <el-option label="By Title" value="1"></el-option>
            <el-option label="By Summary" value="2"></el-option>
            </el-select>
            <i slot="prefix" class="el-input__icon el-icon-search" @click="toSearch"></i>
          </el-input>
        </el-col>
        <el-col :span="8" align="right" class="login" v-if="user.id">
          <el-dropdown  style="cursor: pointer" trigger="click">
            <span>
            <img :src="require('@/../static/image/avatar.jpeg')" style="height: 30px;width: 30px;border-radius: 50px">
              {{this.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >Logout</el-dropdown-item>
              <el-dropdown-item @click.native="selfClick()">Personal Homepage
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="8" align="right" class="unlogin" v-else>
          <el-button @click="loginFormVisible = true">Login</el-button>
          <span>|</span>
          <el-button @click="registerFormVisible = true">Register</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- LoginForm -->
    <el-dialog @closed="loginFormClose()" :modal="false" :close-on-click-modal="false" :center="true" width="30%"
               title="登录"
               :visible.sync="loginFormVisible">
      <div slot="title" style="background-color: #f5f7fa">
        <h2>Login</h2>
      </div>
      <el-form :model="loginForm">
        <el-form-item label="User Name" label-width="100px">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" label-width="100px">
          <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">cancel</el-button>
        <el-button type="primary" @click="login()">login</el-button>
      </div>
    </el-dialog>
    <!-- RegisterForm -->
    <el-dialog :modal="false" :close-on-click-modal="false" :center="true" width="30%" title="登录"
               :visible.sync="registerFormVisible" @close="cancel('registerForm')">
      <div slot="title" style="background-color: #f5f7fa">
        <h2>Register</h2>
      </div>
      <el-form :model="registerForm" :rules="rules" ref="registerForm">
        <el-form-item label="User ID" label-width="100px" prop="userName">
          <el-input v-model="registerForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" label-width="100px" prop="userPassword">
          <el-input v-model="registerForm.userPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" label-width="100px" prop="rePassword">
          <el-input v-model="registerForm.rePassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" label-width="100px" prop="userEmail">
          <el-input v-model="registerForm.userEmail" type="email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('registerForm')">Cancel</el-button>
        <el-button type="primary" @click="registerClick('registerForm')">Register</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'
  import bcrypt from 'bcryptjs';
  import {nameCheck, register} from "../../api/user";

  export default {
    name: "HeaderTop",
    data() {
      return {
        imageUrl:'',
        activeIndex: 'articles',
        keyword: '',
        loginFormVisible: false,
        registerFormVisible: false,
        select: '',
        loginForm: {
          username: '',
          password: '',
        },
        registerForm: {
          userName: '',
          userPassword: '',
          rePassword: '',
          userEmail: '',
        },
        rules: {
          userName: [
            {
              required: true,
              message: 'Please enter user name',
              trigger: 'blur'
            }
          ],
          userNickname: [
            {
              required: true,
              message: 'Please enter nickname',
              trigger: 'blur'
            }
          ],
          userPassword: [
            {
              required: true,
              message: 'Please enter password',
              trigger: 'blur'
            }
          ],
          rePassword: [
            {
              required: true,
              message: 'Please confirm password',
              trigger: 'blur'
            }
          ],
          userEmail: [
            {
              required: true,
              message: 'Please enter email',
              trigger: 'blur'
            }
          ]
        },
      };
    },
    mounted() {
      this.imageUrl = this.IMAGE_URL+this.user.userPicture
    },
    inject: ["reload"],
    methods: {
      toSearch() {
        let path = '/search';
        if(this.select === '1'){
          path += 'bytitle/';
        }else if(this.select === '2'){
          path += 'bysum/';}
        path += this.keyword;
        this.$router.push({ path });
        if(this.$route.path.indexOf("/search") >= 0){
          this.reload()
        }
      },
      handleSelect(key) {
        this.activeIndex = key
      },
      login() {
        if (this.loginForm.username === '') {
          this.$message.warning("Please enter user name")
          return
        }
        if (this.loginForm.password === '') {
          this.$message.warning("Please enter password")
          return
        }
        this.$store.dispatch('getLoginUser', this.loginForm)
        this.loginFormVisible = false
      },
      loginFormClose() {
        this.imageUrl = this.IMAGE_URL+this.user.userPicture
      },
      cancel(formName) {
        this.registerFormVisible = false
        this.$refs[formName].resetFields()
      },
      registerClick(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let nameFlag = false
            let passwordFlag = false
            //用户名重复检查
            nameCheck(this.registerForm.userName).then(result => {
              if (result.status === 200) {
                nameFlag = true
              } else {
                this.$message.error(result.resMsg)
              }
              //密码验证
              if (this.registerForm.userPassword === this.registerForm.rePassword) {
                passwordFlag = true
              } else {
                this.$message.error("Inconsistency between two password entries")
              }
              //注册
              if (passwordFlag && nameFlag) {
                register(this.registerForm.userName, this.registerForm.userPassword, this.registerForm.userEmail).then(result => {
                  if (result.status === 200) {
                    this.$message.success(result.resMsg)
                    this.registerFormVisible = false
                    this.loginFormVisible = true
                  } else {
                    this.$message.error(result.msg)
                  }
                })
              }
            })
          }
        })
      },
    
      selfClick() {
        this.$router.push('/personalspace')
      }
    },
    computed: {
      ...mapState(['user']),
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-menu-item
    height 40px
    line-height 40px

  .el-button
    line-height 0
    margin-top 5px
    border 0px

  .el-container
    background-color #fdfdfd

  .input
    height 34px
    width: 300px
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

  .select 
    min-width: 110px
    text-align: left
    padding-left: 1px

  
    
</style>
