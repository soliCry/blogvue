<template>
  <div class="shadow">
    <el-row style="min-height:800px;*+height:100%;_height:400px;">
      <el-col :span="24" class="marginleft">
        <h2 align="left">
          <span>{{article.articleTitle}}</span>
          <el-tag v-for="(tag,index) in article.tags" :key="index">{{tag}}</el-tag>
          <el-button style="float: right;margin-right: 50px" type="primary" @click="favoriteClick" plain>
            <i v-if="isFavorited" class="el-icon-star-on"></i>
            <i v-else class="el-icon-star-off"></i>
            Favourite
          </el-button>
        </h2>
      </el-col>
      <el-col :span="24" align="left" class="marginleft time">

        <img @click="toUser" :src="require('@/../static/image/avatar.jpeg')"
             style="width: 40px;height: 40px;border-radius: 50px;cursor: pointer"/>
        <span @click="toUser" style="cursor: pointer">{{article.userNickname}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>{{article.publishdate | formatDate}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>Read：{{article.articlePageviews}}</span>
        &nbsp;
        <span>Favorite：{{article.articleFavorites}}</span>
      </el-col>
      <el-col>
        <div style="margin-right: 10px;margin-left: 10px;">
          <el-divider></el-divider>
        </div>
      </el-col>
      <el-col :span="24" align="left" style="padding: 0px 20px 0px 20px">
        <div v-html="article.htmlcontent"></div>
      </el-col>
    </el-row>
    <div class="edittime">
      <span>Article last edited on&nbsp;{{article.edittime}}</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {favorite, checkFavorited, cancelFavorite} from "../../api/favorite";

  export default {
    data() {
      return {
        isFavorited: false,
      }
    },
    name: "ArticleDetail",
    props: {
      article: Object,
    },
    mounted() {
      checkFavorited(null, this.user.userId,this.article.articleId,null,1).then(result => {
        if (result.status === 200) {
          this.isFavorited = true
        }
      })
    },
    methods: {
      toUser() {
        this.$router.push({
          path: `/userpage/${this.article.userId}`,
        })
      },
      favoriteClick() {
        if (this.user.userId) {
          if (this.isFavorited == true) {
            this.$confirm('Do you want to cancel favourite？', 'Notice', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              cancelFavorite(null, this.user.userId,this.article.articleId,null,1).then(result => {
                if (result.status === 200) {
                  this.$message.success("Successful")
                  this.isFavorited = false
                } else
                  this.$message.error("Something wrong")
              })
            });
          } else {
            if (this.article.userId == this.user.userId) {
              this.$message.warning("Sorry, can't favourite your own article")
              return
            }
            favorite(null, this.user.userId,this.article.articleId,null,1).then(result => {
              if (result.status === 200) {
                this.$message.success("Successful")
                this.isFavorited = true
              } else
                this.$message.error("Something wrong")
            })
          }
        }else {
          this.$message.warning("Login to favourite")
        }
      },
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .edittime
    color #909399
    font-size 14px
    text-align right
    margin-right 10px

  .href
    text-decoration none

  .time
    color #909399
    font-size 16px
    text-align left

  .height
    height 200px

  .marginleft
    margin-left 20px

  .marginright
    margin-right 20px
</style>
