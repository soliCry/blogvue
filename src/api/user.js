import axios from 'axios';
const BASE_URL = 'http://43.134.66.209:8080/api/user'
import store from '../store'

const token = store.state.token;


export const login = (username, password) => {
  const logindata = {username, password};
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios.post(BASE_URL+"/login",logindata,{headers})
};

export const register = (userName,userPassword,userEmail) => {
  const regdata = {userName,userPassword,userEmail};
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios.post(BASE_URL+"/register-save",regdata,{headers})
}

export const reqUserInfo = (userId) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/get-user-by-id/'+ userId ,{headers})
}

export const reqUserList = (userID,pageNum,pageSize,userName,userNickname,userStatus) => {
  const reqdata = {userID,pageNum,pageSize,userName,userNickname,userStatus};
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/get-user-list',{
    params: { reqdata },
    headers
  })
}

export const updateUser = (userId,userName,userNickname,userStatus,userEmail,userPicture,userRegistetime,userSignature) => {
  const updatedata = {userId,userName,userNickname,userStatus,userEmail,userPicture,userRegistetime,userSignature};
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  return axios.put(BASE_URL+"/update",updatedata,{headers})
}

export const nameCheck = (userName) => {
  const headers = {
    'Authorization': 'Bearer ' + token,
  };
  return axios.get(BASE_URL+'/name-check/'+userName ,{headers})
}
