/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USER,SET_TOKEN
} from './mutation-types'

import {login} from "../api/user";
import router from "../router/index"

import {
  Message
} from 'element-ui'

export default {
  async getLoginUser({commit}, {username, password}) {
    try{
      const result = await login(username, password)
      if (result.status === 200) {
        const user = result.data
        const token = result.data.jwt
        commit(RECEIVE_USER, {user})
        commit(SET_TOKEN, token)
        Message({
          message: 'Login successful',
          type: 'success'
        })
        router.push({ path: "/articles" });
      } else {
        Message({
          message: 'Incorrect user name or password entered',
          type: 'error'
        })
      }
    }catch(error){
      console.error("Login error:", error);
      Message({
        message: 'Incorrect user name or password entered',
        type: 'error'
      });
    }
  },
}
