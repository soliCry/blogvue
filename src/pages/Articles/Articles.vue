<template>
  <el-container style="min-height:710px;*+height:100%;_height:400px;">
    <el-header style="max-height: 40px">
      <HeaderTop></HeaderTop>
    </el-header>
    <el-container style="background-color: aliceblue; ">
      <el-aside width="200px">
        <div class="shadow">
          <br/>
          <el-divider content-position="left"><h3>Article Categories</h3></el-divider>
          <el-menu mode="vertical" active-text-color="#2b2b2b">
            <el-menu-item :class="{on:flag===1}" :index="(1).toString()">All Articles</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="mainwidth">
        <el-tabs type="border-card">
          <el-tab-pane label="ARTICLE">
            <ArticleSummary :article="article" :edit-flag="false" v-for="(article,index) in articles"
                            :key="index"></ArticleSummary>
            <br>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="this.articleQuery.pageNum"
              :page-sizes="[6]"
              :page-size="this.articleQuery.pageSize"
              layout="sizes, prev, pager, next, jumper">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
  import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
  import Footer from "../../components/Footer/Footer";
  import ArticleSummary from "../../components/ArticleSummary/ArticleSummary";
  import {mapState} from 'vuex'
  import {getArticleByTitle} from "../../api/article";

  export default {
  data() {
    return {
      flag: 1,
      articles: [],
      articleQuery: {
        pageSize: 6,
        pageNum: 1,
        keyword: ' ',
      }
    }
  },
  name: "Articles",
  components: { ArticleSummary, Footer, HeaderTop },
  mounted() {
    this.getList()
  },
  watch: {
    'articleQuery.pageNum': function(newPageNum, oldPageNum) {
      console.log(this.articleQuery.pageNum)
      this.getList();
    }
  },
  methods: {
    async getList() {
      try {
        const result = await getArticleByTitle(this.articleQuery.keyword, this.articleQuery.pageNum);
        this.articles = result.data || [];
        console.log(this.articles)
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Optionally display an error message to the user
      }
    },
    handleCurrentChange(val) {
      this.articleQuery.pageNum = val;
      // getList() will be called automatically due to the watch
    },
  },
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
  .on
    background-color #c1c9d0
</style>
