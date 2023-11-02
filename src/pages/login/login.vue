<template>
    <div class="login" clearfix>
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="loginForm" status-icon label-width="80px">
            <h3>Login</h3>
            <el-form-item prop="username" label="Username">
            <el-input v-model="loginForm.username" placeholder="Please enter your username" prefix-icon></el-input>
            </el-form-item>
            <el-form-item id="password" prop="password" label="Password">
            <el-input v-model="loginForm.password" show-password placeholder="Please enter your password"></el-input>
            </el-form-item>
            <router-link to="/register">Register</router-link>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload" @click="tologin()">Login</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </template>
   
  <script>

  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
        tologin() {
        if (this.loginForm.username === '') {
          this.$message.warning("Please enter user name")
          return
        }
        if (this.loginForm.password === '') {
          this.$message.warning("Please enter password")
          return
        }
        this.$store.dispatch('getLoginUser', this.loginForm)
      },
    }
  };
  </script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .login {
    width: 100%;
    height: 740px;
    background-size: cover;
    overflow: hidden;
  }
  .login-wrap {
    background-size: cover;
    width: 400px;
    height: 300px;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
  }
  #password {
    margin-bottom: 5px;
  }
  h3 {
    color: #0babeab8;
    font-size: 24px;
  }
  hr {
    background-color: #444;
    margin: 20px auto;
  }
  a {
    text-decoration: none;
    color: #aaa;
    font-size: 15px;
  }
  a:hover {
    color: coral;
  }
  .el-button {
    width: 80%;
    margin-left: -50px;
  }
  </style>