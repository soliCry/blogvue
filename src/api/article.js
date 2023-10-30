import axios from 'axios';
const BASE_URL = 'http://43.134.66.209:8081/api/blog';
import store from '../store'

const token = store.state.token;


export const reqArticle = (articleId) => {
    const headers = {
      'Authorization': 'Bearer ' + token,
    };
    return axios.get(BASE_URL+'/get-article-by-id'+ articleId ,{headers})
  }

export const postArticle = (articleId,articleTitle,mdcontent,htmlcontent,articleSummary,userId,userPicture,publishdate,edittime,articleStatus,articlePageviews,articleComments,userNickname,tags,articleFavorites) => {
  const postdata = {articleId,articleTitle,mdcontent,htmlcontent,articleSummary,userId,userPicture,publishdate,edittime,articleStatus,articlePageviews,articleComments,userNickname,tags,articleFavorites}
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  return axios.post(BASE_URL+'/create-article',postdata,{headers})
}
export const editArticle = (articleId,articleTitle,mdcontent,htmlcontent,articleSummary,userId,userPicture,publishdate,edittime,articleStatus,articlePageviews,articleComments,userNickname,tags,articleFavorites) => {
  const editdata = {articleId,articleTitle,mdcontent,htmlcontent,articleSummary,userId,userPicture,publishdate,edittime,articleStatus,articlePageviews,articleComments,userNickname,tags,articleFavorites}
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  return axios.put(BASE_URL+'/update-article',editdata,{headers})
}

export const deleteArticle = (id) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/remove-article/'+ id,{headers})
}

export const getArticleBySum = (Sum,pageNum) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/get-article-by-sum/' + Sum + '/' + pageNum,{headers})
}

export const getArticleByTitle = (Title,pageNum) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/get-article-by-sum/' + Title + '/' + pageNum,{headers})
}

export const getArticleByUserid = (userId,pageNum) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/get-article-by-userid/' + userId + '/' + pageNum,{headers})
}