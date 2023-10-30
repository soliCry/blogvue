<template>
  <el-container style="min-height:710px;*+height:100%;_height:400px;">
    <el-header style="max-height: 40px">
      <HeaderTop></HeaderTop>
    </el-header>
    <el-container style="background-color: aliceblue;">
      <el-main>
        <el-tabs type="border-card" class="shadow" style="background-color: #fdfdfd;width: 70%;margin-left: 15%;">
          <el-tab-pane label="搜索文章：">
            <span v-if="this.articles.length == 0">抱歉，暂无结果</span>
            <ArticleSummary :article="article" :edit-flag="false" v-for="(article,index) in articles"
                            :key="index"></ArticleSummary>
            <br>
            <el-pagination
              v-if="this.articles.length != 0"
              @size-change="handleArtSizeChange"
              @current-change="handleArtCurrentChange"
              :current-page.sync="this.articleQuery.pageNum"
              :page-sizes="[6]"
              :page-size="this.articleQuery.pageSize"
              layout="sizes, prev, pager, next, jumper">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HeaderTop from "../../components/HeaderTop/HeaderTop";
  import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
  import {getArticleByTitle} from "../../api/article";

  export default {
    name: "SearchbyTitle",
    data() {
      return {
        articles: [],
        articleQuery: {
          pageSize: 6,
          pageNum: 1,
          keyword: '',
          userNickname:''
        }
      }
    },
    methods: {
      getArticleList() {
        getArticleByTitle(this.articleQuery.keyword, this.articleQuery.pageNum).then(result => {
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
    mounted() {
      this.articleQuery.keyword = this.$route.params.keyword
      this.getArticleList()
    },
    components: {HeaderTop, ArticleSummary}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shadow
    background-color #fdfdfd
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
</style>
