<template>
  <el-container style="min-height:710px;*+height:100%;_height:400px;">
    <el-header style="max-height: 40px">
      <HeaderTop></HeaderTop>
    </el-header>
    <el-container style="background-color: aliceblue;">
      <el-aside width="200px" style="overflow-y: hidden">
        <div class="shadow">
          <br/>
          <el-divider content-position="left"><h3>Personal Homepage</h3></el-divider>
          <el-menu
            default-active="1"
            background-color="#fdfdfd"
            text-color="#909399"
            active-text-color="#000000"
            class="el-menu-vertical-demo"
            @select="selectHandle">
            <el-menu-item index="1">
              <i class="el-icon-user"></i>
              <span slot="title">Personal Information</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">Post an article</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-document"></i>
              <span slot="title">My Articles{{articles.length === 0?'':'('+articles.length+')'}}</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-star-off"></i>
              <span slot="title">My favourite{{favorites.length === 0?'':'('+favorites.length+')'}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="mainwidth">
        <div v-if="tag==='1'">
          <el-tabs type="border-card" style="min-height:570px;*+height:100%;_height:400px;">
            <el-tab-pane label="Personal Information">
              <img :src="require('@/../static/image/avatar.jpeg')" height="80px" width="80px" style="border-radius:50px"/>
              <el-upload class="img-btn"
                         action="#"
                         :show-file-list="false" :before-upload="beforeAvatarUpload"
                         >
                <el-button type="success" plain round size="mini">Change Avatar</el-button>
              </el-upload>
              <el-form label-position="left" label-width="80px">
                <el-form-item label="RegistrationTime">
                  <span>{{user.userRegistetime | formatDate}}</span>
                </el-form-item>
                <el-form-item label="UserName">
                  <el-input v-model="userInfo.userName" v-if="isEdit"></el-input>
                  <span v-else>{{user.userName}}</span>
                </el-form-item>
                <el-form-item label="NickName">
                  <el-input v-model="userInfo.userNickname" v-if="isEdit"></el-input>
                  <span v-else>{{user.userNickname}}</span>
                </el-form-item>
                <el-form-item label="Email">
                  <el-input type="email" v-model="userInfo.userEmail" v-if="isEdit"></el-input>
                  <span v-else>{{user.userEmail}}</span>
                </el-form-item>
                <el-form-item label="Signature">
                  <el-input type="textarea" v-model="userInfo.userSignature" v-if="isEdit"></el-input>
                  <span v-else>{{user.userSignature}}</span>
                </el-form-item>
                <el-button v-if="!isEdit" @click="toEdit()" type="success" plain>Modify Information</el-button>
                <el-button v-if="!isEdit" @click="editPasswordClick()" type="danger" plain>Change Password</el-button>
                <el-button v-if="isEdit" @click="cancel()" type="info" plain>cancel</el-button>
                <el-button v-if="isEdit" @click="toUpdate()" type="primary" plain>submit</el-button>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="tag==='2'">
          <el-tabs type="border-card">
            <el-tab-pane label="Post article">
              <PostArticle></PostArticle>
            </el-tab-pane>
          </el-tabs>

        </div>
        <div v-if="tag==='4'">
          <el-tabs type="border-card">
            <el-tab-pane label="My articles">
              <ArticleSummary :article="article" :edit-flag="true" v-for="(article,index) in articles"
                              :key="index"></ArticleSummary>
              <br>
              <el-pagination
                v-if="this.articleTotal != 0"
                @size-change="handleArtSizeChange"
                @current-change="handleArtCurrentChange"
                :current-page.sync="this.articleQuery.pageNum"
                :page-sizes="[6]"
                :page-size="this.articleQuery.pageSize"
                layout="sizes, prev, pager, next, jumper"
                >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="tag==='8'">
          <el-tabs type="border-card">
            <el-tab-pane label="My favourite">
              <ArticleSummary :article="favorite" :edit-flag="false" v-for="(favorite,index) in favorites"
                              :key="index"></ArticleSummary>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <Footer></Footer>
    </el-footer>
    <el-dialog title="Change Password" :visible.sync="passwordEditVisible" width="40%"
               :close-on-click-modal="false">
      <el-form :model="password" :rules="rules" ref="form">
        <el-form-item label="Old Password" label-width="100px" prop="oldPassword">
          <el-input v-model="password.oldPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="New Password" label-width="100px" prop="newPassword">
          <el-input v-model="password.newPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" label-width="100px" prop="rePassword">
          <el-input v-model="password.rePassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditPassword()">cancel</el-button>
        <el-button type="primary">submit</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
  import Footer from "../../components/Footer/Footer";
  import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
  import PostArticle from "../../components/PostArticle/PostArticle";
  import {reqFavoriteArticle} from "../../api/favorite"
  import {formatTimeToStr} from "../../utils/date";
  import {getArticleByUserid} from "../../api/article";
  import {updateUser} from "../../api/user";
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        passwordEditVisible: false,
        password: {
          oldPassword: '',
          newPassword: '',
          rePassword: ''
        },
        rules: {
          oldPassword: [
            {
              required: true,
              message: 'Please enter old password',
              trigger: 'blur'
            }
          ],
          newPassword: [
            {
              required: true,
              message: 'Please enter new password',
              trigger: 'blur'
            }
          ],
          rePassword: [
            {
              required: true,
              message: 'Please enter new password',
              trigger: 'blur'
            }
          ]
        },
        imageUrl: '',
        isLogin: true,
        tag: '1',
        articles: [],
        favorites: [],
        isEdit: false,
        articleTotal: 0,
        userStatus: 1,
        userInfo: {
          userName:'',
          userNickname: '',
          userSignature: '',
          userEmail: '',
          userPicture: '',
        },
        articleQuery: {
          pageSize: 6,
          pageNum: 1,
          keyword: '',
          userNickname: ''
        }
      }
    },
    watch: {
      items: {
        handler: function () {
          alert(this.$refs.type.value + this.$refs.content.value);
        },
        deep: true
      }
    },
    filters: {
      formatDate: function (time) {
        if (time != null && time != "") {
          var date = new Date(time);
          return formatTimeToStr(date, "yyyy-MM-dd");
        } else {
          return "";
        }
      }
    },
    inject: ["reload"],
    methods: {
      toEdit() {
        this.userInfo.userName = this.user.userName
        this.userInfo.userNickname = this.user.userNickname
        this.userInfo.userEmail = this.user.userEmail
        this.userInfo.userSignature = this.user.userSignature
        this.isEdit = true
      },
      cancel() {
        this.isEdit = false
      },
      update() {
        updateUser(this.user.userId, this.userInfo.userName, this.userInfo.userNickname, this.userStatus, this.userInfo.userEmail, null, null, this.userInfo.userSignature).then(result => {
          if (result.status === 200) {
            this.$message.success("Successful")
            this.user.userName = this.userInfo.userName
            this.user.userNickname = this.userInfo.userNickname
            this.user.userEmail = this.userInfo.userEmail
            this.user.userSignature = this.userInfo.userSignature
            this.reload()
          } else {
            this.$message.error("Something wrong")
          }
        })
      },
      editPasswordClick() {
        this.passwordEditVisible = true
      },
      cancelEditPassword() {
        this.passwordEditVisible = false
        this.$refs['form'].resetFields()
      },
      toUpdate() {
        if (this.userInfo.userName === '') {
          this.$message.warning("Please enter your user name")
          return
        }
        if (this.userInfo.userNickname === '') {
          this.$message.warning("Please enter your user nickname")
          return
        }
        if (this.userInfo.userEmail === '') {
          this.$message.warning("Please enter your email")
          return
        }
        if (this.userInfo.userNickname == '') {
          this.$message.warning("Please enter your nickname")
          return
        } else {
          this.update()
        }
      },
      /* uploadImg(f) {
        console.log(f)
        let formdata = new FormData()
        formdata.append('file', f.file)
        axios({
          url: 'http://localhost:8080/uploadImage',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then(res => {
          updateUser(this.user.userId, null, null, null, res.data.data).then(result => {
            if (result.status === "success") {
              this.$message.success(result.resMsg)
              this.user.userPicture = res.data.data
              this.reload()
            } else {
              this.$message.error(result.resMsg)
            }
          })
        }).then(error => {
          console.log(error)
        })
      }, */
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = (file.size / 1024 / 1024) < 2

        if (!isJPG) {
          this.$message.error('Upload avatar images in JPG format only!')
        }
        if (!isLt2M) {
          this.$message.error('The size of the uploaded avatar image must not exceed 2MB!')
        }
        return isJPG && isLt2M
      },
      selectHandle(index) {
        this.tag = index
      },
      getArticleList() {
        getArticleByUserid(this.user.userId, this.articleQuery.pageNum).then(result => {
          this.articles = result.data
        })
      },
      handleArtSizeChange(val) {
        this.articleQuery.pageSize = val
        this.getArticleList()
      },
      handleArtCurrentChange(val) {
        this.articleQuery.pageNum = val
        this.getArticleList()
      },
    },
    computed: {
      ...mapState(['user', 'IMAGE_URL']),
    },
    mounted() {
      /* this.imageUrl = this.IMAGE_URL + this.user.userPicture */
      this.getArticleList()

      reqFavoriteArticle(this.user.userId).then(result => {
        if (result.status === 200) {
          this.favorites = result.data
        }
      })

    },
    name: "PersonalSpace",
    components: {PostArticle, ArticleSummary, Footer, HeaderTop}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mainwidth
    margin-right 130px

  .shadow
    background-color #fdfdfd
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

  .el-footer
    margin-top 10px
    margin-bottom 20px


  .el-aside
    margin-left 150px
    margin-top 40px
    margin-bottom 5px

  .el-main
    margin-top 20px
    margin-bottom 5px

  .el-button
    border 0px

  .login
    margin-top 10px
    margin-left 400px

  .unlogin
    margin-top 10px
    margin-left 350px
</style>
