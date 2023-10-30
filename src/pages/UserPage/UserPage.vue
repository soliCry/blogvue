<template>
  <el-container style="min-height:710px;*+height:100%;_height:400px;">
    <el-header style="max-height: 40px">
      <HeaderTop></HeaderTop>
    </el-header>
    <el-container style="background-color: aliceblue; ">
      <el-main>
        <div class="shadow" style="background-color: #fdfdfd;width: 75%;margin-left: 13%;">
          <el-row>
            <el-col :span="3">
              <img :src="userInfo.userPicture"
                   style="width: 60px;height: 60px;border-radius: 50px;margin: 30px 20px 20px">
              <span class="time" style="float: left;margin-left: 30px;margin-bottom: 10px">{{userInfo.userRegistetime | formatDate}}</span>

            </el-col>
            <el-col :span="18">
              <el-row>
                <h2 style="float: left;margin-top: 30px">{{userInfo.userNickname}}</h2>
              </el-row>
              <el-row>
              </el-row>
              <el-row>
                <span v-if="userInfo.userSignature"
                      style="margin-left:15px;float: left;margin-top: 10px;text-align: left">{{userInfo.userSignature}}</span>
                <span v-else class="time" style="margin-left:15px;float: left;margin-top: 10px;text-align: left">He left nothing here...</span>
              </el-row>
              <br/>
            </el-col>
          </el-row>
        </div>
        <br/>
        <div class="shadow" style="background-color: #fdfdfd;width: 75%;margin-left: 13%;
            min-height:500px;*+height:100%;_height:400px;">
          <el-tabs style="margin-left: 30px;">
            <el-tab-pane label="His article">
              <ArticleSummary :article="article" :edit-flag="false" v-for="(article,index) in articles"
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
            <el-tab-pane label="His favorite">
              <ArticleSummary :article="article" :edit-flag="false" v-for="(article,index) in favorites"
                              :key="index"></ArticleSummary>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
  import ArticleSummary from "../../components/ArticleSummary/ArticleSummary.vue";
  import {getArticleByUserid} from "../../api/article";
  import {reqUserInfo} from "../../api/user";
  import {reqFavoriteArticle} from "../../api/favorite";
  import {formatTimeToStr} from "../../utils/date";

  export default {
    name: "UserPage",
    data() {
      return {
        articles: [],
        favorites: [],
        userInfo: [],
        articleTotal: 0,
        articleQuery: {
          pageSize: 6,
          pageNum: 1,
          keyword: '',
          userNickname:''
        }
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
    mounted() {
      this.getArticleList()
      reqUserInfo(this.$route.params.userId).then(result => {
        if (result.status === 200) {
          this.userInfo = result.data
        }
      })
      reqFavoriteArticle(this.$route.params.userId).then(result => {
        if (result.status === 200) {
          this.favorites = result.data
        }
      })
    },
    methods: {
      getArticleList() {
        getArticleByUserid(this.$route.params.userId, this.articleQuery.pageNum).then(result => {
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
    components: {HeaderTop, ArticleSummary}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .shadow
    background-color #fdfdfd
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

  .time
    color #909399
    font-size 16px
    text-align left

</style>
