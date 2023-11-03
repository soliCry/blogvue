import axios from 'axios';
const BASE_URL = 'http://43.134.66.209:8084/api/favorite'
import store from '../store'

const token = store.state.token;

export const favorite = (id,userId,articleId,favoriteDate,isValid) => {
    const favdata = {id,userId,articleId,favoriteDate,isValid}
    const headers = {
        'Content-Type': 'application/json',
        'token': token,
      };
    return axios.post(BASE_URL+'/add-favorite/',favdata,{headers})
}
export const checkFavorited = (id,userId,articleId,favoriteDate,isValid) => {
    const favdata = {id,userId,articleId,favoriteDate,isValid}
    const headers = {
        'Content-Type': 'application/json',
        'token': token,
      };
    return axios.post(BASE_URL+'/favorited/',favdata,{headers})
}
export const cancelFavorite = (id,userId,articleId,favoriteDate,isValid) => {
    const favdata = {id,userId,articleId,favoriteDate,isValid}
    const headers = {
        'Content-Type': 'application/json',
        'token': token,
      };
    return axios.post(BASE_URL+'/cancel/',favdata,{headers})
}
export const reqFavoriteArticle = (userId) => {
    const headers = {
      'token': token,
    };
    return axios.get(BASE_URL+'/get-favorite/'+ userId ,{headers})
  }