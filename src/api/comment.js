import axios from 'axios';
const BASE_URL = 'http://43.134.66.209:8083/api/comment'
import store from '../store'

const token = store.state.token;


export const postComment=(commentId,articleId,userId,commentBody,publishdate,comment_status) =>{
  const postdata = {commentId,articleId,userId,commentBody,publishdate,userPicture,comment_status}
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  return axios.post(BASE_URL+'/add-new-comment',postdata,headers)
}

export const reqArticleComments = (articleId) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/get-by-article-id/'+ articleId ,{headers})
}

export const deleteComment = (commentId) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.delete(BASE_URL+'/delete/'+ commentId,{headers})
}