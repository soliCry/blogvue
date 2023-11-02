<template>
  <div class="shadow">
    <br/>
    <div>
      <img  style="width: 50px;height: 50px;border-radius:50px">
      <div>
        <span>{{userInfo.userNickname}}</span>
        <br>
        <el-link @click="toUser" type="info">His Personal Homepage<i class="el-icon-d-arrow-right"></i></el-link>
      </div>
    </div>
    <br/>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
      <tr>
        <td>Registration Time</td>
        <td>{{userInfo.userRegistetime | formatDate}}</td>
        <td></td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{userInfo.userEmail}}</td>
      </tr>
      <tr>
        <td>{{userInfo.articleNum}}</td>
        <td>article</td>
      </tr>
    </table>
    <br>
  </div>
</template>

<script>

  import {formatTimeToStr} from "../../utils/date";

  export default {
    name: "AuthorInfo",
    props:{
      userInfo: Object,
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
    methods:{
      toUser(){
        this.$router.push({
          path: `/userpage/${this.userInfo.userId}`,
        })
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
