<template>
  <el-container>
    <el-header style="max-height: 40px">
      <HeaderTop></HeaderTop>
    </el-header>
    <el-main>
      Please login to use our blog
    </el-main>
  </el-container>
</template>

<script>
  import HeaderTop from "../../components/HeaderTop/HeaderTop";

  export default {
    name: "About",
    data() {
      return {
        isLogin: false,
      }
    },
    components: {HeaderTop}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-button
    border 0px

  .login
    margin-top 15px
    margin-left 430px

  .unlogin
    margin-top 10px
    margin-left 350px
</style>
