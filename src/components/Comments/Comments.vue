<template>
  <div class="shadow" align="left">
    <div style="margin-left: 10px;">
      <img @click="toUser(comment.userId)" :src="require('@/../static/image/avatar.jpeg')"
           style="cursor:pointer;width: 30px;height: 30px;border-radius: 50px">
      <a @click="toUser(comment.userId)" style="text-decoration: none;cursor: pointer">{{comment.userNickname}}</a>
      <span style="color:#909399;font-size:14px;margin-left: 40px">{{comment.publishdate}}</span>
    </div>
    <br>
    <div>
      <span style="margin-left: 40px">{{comment.commentBody}}</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "Comments",
    props: {
      comment: Object,
    },
    inject: ["reload"],
    methods: {
      toUser(userId) {
        this.$router.push({
          path: `/userpage/${userId}`,
        })
      },
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .image
    width: 20px
    height: 20px
    margin-top 5px
    margin-left 5px

  .namehref
    text-decoration none
    margin-top 5px
    margin-left 5px

  .comment
    color dimgrey
    font-size 14px
</style>
