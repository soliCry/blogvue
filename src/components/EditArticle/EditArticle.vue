<template>
  <div class="shadow" align="left">
    <el-input v-model.trim="articleTitle" placeholder="Please enter a title" style="width: 400px;margin-left: 10px"></el-input>
    <el-input placeholder="Please enter your article tag(Use space bar to separate tags)" :value="articletag" @input="articletag = $event" style="width: 500px;margin-top: 10px;"></el-input>
    <mavon-editor :autofocus='false' v-model="mdContent" ref=md
                  style="min-height:500px;*+height:100%;_height:400px;"/>
    <el-button type="primary" @click="commit()">Submit</el-button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {editArticle} from "../../api/article";

  export default {
    name: "EditArticle",
    props: {
      article: Object
    },
    mounted() {
      this.articleId = this.article.articleId
      this.articleTitle = this.article.articleTitle
      this.mdContent = this.article.mdcontent
      this.htmlContent = this.article.htmlcontent
      this.articleStatus = this.article.articleStatus
      this.userId = this.article.userId
      this.tags = this.article.tags
    },
    computed: {
      ...mapState(['user', 'tag']),
      id() {
        return this.$store.state.user.userId
      },
    },
    data() {
      return {
        articleId: '',
        articleTitle: '',
        mdContent: '',
        htmlContent: '',
        articleStatus: '',
        userId: '',
        articletag:'',
        tags: [],
      }
    },
    inject: ["reload"],
    methods: {
      addTags() {
        const tagsArray = this.articletag.split(' ');
        const validTags = tagsArray.filter(tag => tag.trim() !== '');
        this.tags = validTags;
      },
      commit() {
        if (this.articleTitle === '') {
          this.$message.warning("Please enter article title")
          return
        } else if (this.mdContent === '') {
          this.$message.warning("Article content cannot be empty")
          return
        } else if (this.tags.length === 0) {
          this.$message.warning("Please select at least one tag")
          return
        } else {
          this.htmlContent = this.$refs.md.d_render;
          this.addTags();
          editArticle(null, this.articleTitle, this.mdContent, this.htmlContent, null, this.userId, null, null, null,this.articleStatus, null, null, null, this.tags, null).then(result => {
            if (result.status === 200) {
              this.$message.success(result.resMsg)
              this.reload()
            } else {
              this.$message.error(result.resMsg)
            }
          })
        }
      }
    },
  }

</script>

<style scoped>

</style>
