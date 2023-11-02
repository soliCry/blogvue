import Vue from 'vue'
import VueRouter from 'vue-router'


import Article from "../pages/Article/Article"
import About from "../pages/About/About"
import PersonalSpace from "../pages/PersonalSpace/PersonalSpace"
import Articles from "../pages/Articles/Articles";
import UserPage from "../pages/UserPage/UserPage";
import SearchbyTitle from "../pages/SearchbyTitle/SearchbyTitle";
import SearchbySum from "../pages/SearchbySum/SearchbySum";
import login from "../pages/login/login";
import register from "../pages/register/register";
// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [
    {
      path:'/articles',
      component: Articles,
    },
    {
      path:'/article/:id',
      component: Article,
    },
    {
      path:'/about',
      component: About,
    },
    {
      path:'/personalspace',
      component: PersonalSpace,
    },
    {
      path:'/userpage/:userId',
      component: UserPage,
    },
    {
      path:'/searchbytitle/:keyword',
      component: SearchbyTitle,
    },
    {
      path:'/searchbysum/:keyword',
      component: SearchbySum,
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/register',
      component: register,
    },
  ]
})
