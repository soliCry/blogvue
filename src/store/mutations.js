/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_USER, RECEIVE_TAGS, SET_TOKEN
} from './mutation-types'

export default {
  
  [RECEIVE_USER](state, {user}) {
    state.user = user
  },
  [SET_TOKEN](state, token) {
    state.token = token
  },
  [RECEIVE_TAGS](state,{tags}){
    state.tag = tags
  }
}
