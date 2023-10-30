/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USER,SET_TOKEN
} from './mutation-types'

import {login} from "../api/user";


import {
  Message
} from 'element-ui'

export default {
  async getLoginUser({commit}, {username, password}) {
    const result = await login(username, password)
    if (result.status === 200) {
      const user = result.data
      const token = result.data.jwt
      commit(RECEIVE_USER, {user})
      commit(SET_TOKEN, token)
      Message({
        message: '登录成功',
        type: 'success'
      })
    } else {
      Message({
        message: result.msg,
        type: 'error'
      })
    }
  },
}
