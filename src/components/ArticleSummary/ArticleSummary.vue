<template>
  <div class="shadow textleft" >
    <div>
      <a class="articlehref"  @click="toArticle()">
        <div>
          <h4 class="title">
            <span>{{article.articleTitle}}</span>
            <el-tag v-for="(tag,index) in article.tags" :key="index">{{tag}}</el-tag>
          </h4>
        </div>
        <div>
          <p class="summary">{{article.articleSummary}}</p>
        </div>
      </a>
      <div align="left">
        &nbsp;&nbsp;
        <i class="el-icon-chat-dot-round"></i><span class="summary">×{{article.articleComments}}</span>

        <i class="el-icon-star-on"></i><span class="summary">×{{article.articleComments}}</span>
        &nbsp;&nbsp;
        <i class="el-icon-view"></i><span class="summary">&nbsp;{{article.articlePageviews}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="summary">{{article.userName}}</span>
        <span class="summary time">{{formattedTime}}</span>
      </div>
    </div>
    <div v-if="this.editFlag" style="display: inline-block">
      <el-button type="primary" @click="editClick"><i class="el-icon-edit"></i></el-button>
      &nbsp;&nbsp;
      <el-button type="danger" @click="deleteClick(article.articleId)"><i class="el-icon-delete"></i></el-button>
    </div>
    <el-dialog title="Edit" :visible.sync="editDialog" width="80%">
      <EditArticle :article="article" ></EditArticle>
    </el-dialog>
  </div>
</template>

<script>
  import {deleteArticle} from "../../api/article";
  import EditArticle from "../EditArticle/EditArticle";

  export default {
    components: {EditArticle},
    data() {
      return{
        editDialog: false,
        formattedTime: null,
      }
    },
    mounted() {
    // 解析原始时间字符串
    const rawTime = new Date(this.article.publishdate);

    // 使用Date对象的方法来获取需要的信息，例如：
    const year = rawTime.getFullYear();
    const month = rawTime.getMonth() + 1; // 月份从0开始，所以需要加1
    const day = rawTime.getDate();
    const hours = rawTime.getHours();
    const minutes = rawTime.getMinutes();
    const seconds = rawTime.getSeconds();

    // 构建正常格式时间字符串
    this.formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
    props: {
      article: Object,
      editFlag: Boolean
    },
    name: "ArticleSummary",
    inject:["reload"],
    methods:{
      toArticle(){
        console.log(this.article)
        this.$router.push({
          path: `/article/${this.article.articleId}`,
        })
      },
      editClick(){
        this.editDialog = true
      },
      deleteClick(articleId){
        this.$confirm('Do you want to delete this article？', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          deleteArticle(articleId).then(result =>{
            if (result.status === 200) {
              this.$message.success("Successful")
              this.reload()
            } else {
              this.$message.error("Something wrong")
            }
          })
        }).catch(() => {
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .time
    float right
    margin-right  10px
  .articlehref
    cursor pointer
    text-decoration none
  .summary
    color #909399
    font-size 14px
    text-align left
    text-decoration none
  .title
    color #303133
    text-align left
    text-decoration none
</style>
