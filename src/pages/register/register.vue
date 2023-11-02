<template>
    <div class="login clearfix">
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="registerForm" :model="registerForm" status-icon label-width="80px">
            <h3>Register</h3>
            <hr>
            <el-form-item prop="username" label="Username">
              <el-input v-model="registerForm.userName" placeholder="Please enter your username"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input v-model="registerForm.userEmail" placeholder="Please enter your email"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="Password">
              <el-input v-model="registerForm.userPassword" show-password placeholder="Please enter your password"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="Repassword">
              <el-input v-model="registerForm.rePassword" show-password placeholder="Please confirm your password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon @click="registerClick('registerForm')">Register</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </template>
   
  <script>
  import {register} from "../../api/user";

  export default {
    name: "register",
    data() {
      return {
        registerForm: {
          userName: '',
          userPassword: '',
          rePassword: '',
          userEmail: '',
        },
      };
    },
    created() {
      // console.log($);
      // console.log("1111");
    },
    methods: {
        registerClick(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let passwordFlag = false
            if (!this.registerForm.userName) {
            this.$message.error("Please enter your username");
            } else if (!this.registerForm.userEmail) {
            this.$message.error("Please enter your email");
            } else {
                var emailRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!emailRegex.test(this.registerForm.userEmail)) {
                    this.$message.error("Please enter a valid email");
                } else if (!this.registerForm.userPassword) {
                    this.$message.error("Please enter your password");
                } else if (!this.registerForm.rePassword) {
                    this.$message.error("Please confirm your password");
                } else if (this.registerForm.userPassword !== this.registerForm.rePassword) {
                    this.$message.error("Inconsistency between two password entries");
                } else {
                    // 所有验证通过，可以继续注册逻辑
                    passwordFlag = true;
                }
            }

            //注册
            if (passwordFlag) {
            register(this.registerForm.userName, this.registerForm.userPassword, this.registerForm.userEmail).then(result => {
                if (result.status === 200) {
                this.$router.push({ path: "/" });
                } else {
                alert("User name has been registered")
                }
              })
            }
          }
        })
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
    height: 500px;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 20px;
  }
   
  h3 {
    color: #0babeab8;
    font-size: 24px;
  }
  hr {
    background-color: #444;
    margin: 20px auto;
  }
   
  .el-button {
    width: 80%;
    margin-left: -50px;
  }
  </style>