<template>
  <div class="shadow" align="left">
    <div style="display: flex; flex-direction: column; align-items: center;">
    <el-input v-model.trim="articleTitle" placeholder="Please enter a title" style="width: 400px;"
              clearable></el-input>
    <el-input placeholder="Please enter your article tag(Use space bar to separate tags)" :value="articletag" @input="articletag = $event" style="width: 500px;margin-top: 10px;"></el-input>
  </div>
    <mavon-editor :autofocus='false' v-model="mdContent" ref=md
                  style="min-height:500px;*+height:100%;_height:400px;"/>

    <el-button type="primary" @click="saveArticle(1,id)">Post article</el-button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {postArticle} from "../../api/article";

  export default {
    name: "PostArticle",

    computed: {
      ...mapState(['user']),
      id() {
        return this.$store.state.user.userId
      },
    },
    data() {
      return {
        articleTitle: '',
        articletag:'',
        mdContent: '',
        htmlContent: '',
        articleStatus: 1,
        userId: '',
        tags:[]
      }
    },
    inject: ["reload"],
    methods: {
      addTags() {
        console.log(this.user)
    // 将输入的标签文本分割成数组，以空格为分隔符
    const tagsArray = this.articletag.split(' ');
    
    // 过滤掉空的标签
    const validTags = tagsArray.filter(tag => tag.trim() !== '');
    
    // 将有效的标签保存在 tags 变量中
    this.tags = validTags;
  },
      saveArticle(status, id) {
        if (this.articleTitle === '') {
          this.$message.warning("Please enter article title")
          return
        } else if (this.mdContent === '') {
          this.$message.warning("Article content cannot be empty")
          return
        } else if (this.articletag === '') {
          this.$message.warning("Please enter at least one tag")
          return
        } else {
          this.articleStatus = status
          this.htmlContent = this.$refs.md.d_render
          this.userId = id
          this.addTags()
          postArticle(null, this.articleTitle, this.mdContent, this.htmlContent, null, this.userId, null, null, null,this.articleStatus, null, null, null, this.tags, null).then(result => {
            if (result.status === 200) {
              this.$message.success(result.resMsg)
              this.reload()
            } else {
              this.$message.error(result.resMsg)
            }
            // this.$router.push('/personalspace')
          })
        }
      }
    },
  }

</script>

<style scoped>

</style>
