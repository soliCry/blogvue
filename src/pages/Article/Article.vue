<template>
  <el-container style="min-height:710px;*+height:100%;_height:400px;">
    <el-header style="max-height: 40px">
      <HeaderTop></HeaderTop>
    </el-header>
    <el-container style="background-color: aliceblue;">
      <el-aside width="300px">
        <AuthorInfo :userInfo="this.userInfo"></AuthorInfo>
      </el-aside>
      <el-main class="mainwidth">
        <ArticleDetail :article="this.article"></ArticleDetail>
        <br/>
        <Comments :comment="comment" v-for="(comment,index) in this.comments" :key="index"></Comments>
        <br/>
        <div class="shadow" v-if="user.userId">
          <div style="margin-left: 10px;margin-right: 10px;">
            <el-input
              style="margin-top: 10px;"
              type="textarea"
              :rows="2"
              placeholder="give some comments"
              v-model="comment">
            </el-input>
          </div>
          <div align="right" style="margin-right: 10px;">
            <el-button type="primary" @click="postComment()" plain>Make a comment</el-button>
          </div>
        </div>
        <span v-else>Please log in to participate in the comments</span>
      </el-main>
    </el-container>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
  import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
  import HeaderTop from "../../components/HeaderTop/HeaderTop";
  import Footer from "../../components/Footer/Footer";
  import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
  import ArticleDetail from "../../components/ArticleDetail/ArticleDetail";
  import Comments from "../../components/Comments/Comments";
  import {reqArticle} from "../../api/article"
  import {reqUserInfo} from "../../api/user"
  import {postComment,reqArticleComments} from "../../api/comment";
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        isLogin: false,
        article: null,
        userInfo:null,
        comments:[],
        comment:'',
        commentstatus: 1
      }
    },
    computed: {
      ...mapState(['user']),
    },
    inject:["reload"],
    methods:{
      postComment(){
        if(this.comment === ''){
          this.$message.warning("Comments cannot be empty")
          return
        }else {
          postComment(null,this.article.articleId,this.user.userId,this.comment,null,this.commentstatus).then(result=>{
            if(result.status === 200){
              this.$message.success("Successful")
              this.comment = ''
              this.reload()
            }else {
              this.$message.error("Something wrong")
            }
          })
        }
      }
    },
    mounted() {
      reqArticle(this.$route.params.id).then(result=>{
        if(result.status === 200){
          this.article = result.data
          console.log(result.data.userId)
          reqUserInfo(result.data.userId).then(result1 => {
            if(result1.status === 200){
              this.userInfo = result1.data
              console.log(this.userInfo)
            }
          })
        }
      }),
      reqArticleComments(this.$route.params.id).then(result => {
        if (result.status === 200) {
          this.comments = result.data
        }
      })
    },
    name: "Article",
    components: {Comments, ArticleDetail, ArticleSummary, Footer, HeaderTop, AuthorInfo}
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
