import axios from 'axios';
const BASE_URL = 'http://43.134.66.209:8083/api/comment'
import store from '../store'

const token = store.state.token;


export const postComment=(id,articleId,userId,commentBody,publishDate,commentStatus) =>{
  const postdata = {id,articleId,userId,commentBody,publishDate,commentStatus}
  const headers = {
    'Content-Type': 'application/json',
    'token': token,
  };
  return axios.post(BASE_URL+'/add-new-comment',postdata,headers)
}

export const reqArticleComments = (articleId) => {
  const headers = {
    'token': token,
  };
  return axios.get(BASE_URL+'/get-by-article-id/'+ articleId ,{headers})
}

export const deleteComment = (commentId) => {
  const headers = {
    'token': token,
  };
  return axios.delete(BASE_URL+'/delete/'+ commentId,{headers})
}