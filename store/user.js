import Cookies from 'js-cookie'
import {
  // reqLogin, // export const reqLogin = ({name, pwd}) => ajax('/login', {name, pwd}, 'POST')
  reqUsers, // export const reqUserInfo = () => ajax('/userinfo')
  reqUserInfo,
  reqLogout, // export const reqLogout = (id) => ajax('/logout', {id}, 'POST')
  decrypt // 解密
} from './api.js'
// import de from '~/static/lang/de.js'

// const UPDATE_USERS = 'UpdateUsers'
const GET_USER_INFO = 'GetUserInfo'
const LOGIN = 'Login'
const LOGOUT = 'Logout'
const LOGGED_IN_STATE = 'loggedInState'
const UPDATE_USER_INFO_SELECT_DYNAMOS = 'UpdateUserInfoSelectDynamos'

// 注意：token 暂时放在登录用户的Vuex的state里，如果项目要求非登录也可访问项目时，需要把token移回store/index.vue的根state里
export const state = () => ({
  info: null,
  token: null
})

// vuex 里的计算机属性, 相当于Vue里的computed
export const getters = {
  isLoggedIn: (state) => {
    return (
      (!!state.info && !!state.token) || !!window.sessionStorage.getItem('user')
    )
  },
  // 获取用户选择的系统当前机组的作息
  // 使用方式：this.$store.getters['user/selectedDynamos'] || null
  selectedDynamos: (state) => {
    if (state.info.dynamos) {
      if (!!state.info && !!state.token && state.info.dynamos) {
        return state.info.dynamos.filter((item) => item.selected)
      } else {
        return state.info.dynamos[0]
      }
    } else {
      return null
    }
  }
}

export const mutations = {
  [GET_USER_INFO](state, { info }) {
    this.isLoggedIn = false
    state.info = typeof info === 'string' ? JSON.parse(info) : info
  },

  [LOGIN](state, { user }) {
    state.info = typeof user === 'string' ? JSON.parse(user) : user
    state.token = getToken()
  },

  [LOGOUT](state) {
    state.info = null
    state.token = null
    this.isLoggedIn = false

    Cookies.remove('user')
    Cookies.remove('token')
  },

  [LOGGED_IN_STATE](state, info) {
    window.sessionStorage &&
      window.sessionStorage.setItem('loggedInState', info)
  },
  [UPDATE_USER_INFO_SELECT_DYNAMOS](state, info) {
    if (info) {
      const dynamos = state.info.dynamos || null
      info.map((item) => {
        dynamos.find((dy) => {
          dy.selected = dy.id === item
        })
      })
      // state.info.dynamos = info
    }
  }
}

export const actions = {
  async Login({ commit }, { name, pwd }) {
    // ajax
    const result = await reqUsers()
    if (result.code === 200) {
      const info = result.data
      pwd = decrypt(pwd)
      const user = info.find((item) => item.name === name && item.pwd === pwd)
      commit(LOGIN, { user })
    }

    // ajax
    // const result = await reqLogin({name, pwd})
    // if( result.code===200 ){
    //   const info = result.data
    //   const token = result.token

    //   //const TOKEN = 'abc123456789'
    //   info.name = name
    //   info.pwd = pwd
    //   commit(LOGIN, {info, token})

    // }
  },

  async LogOut({ commit, state }) {
    const id = state.info.id

    // ajax
    const result = await reqLogout({ id })

    if (result.code === 200) {
      commit(LOGOUT)
    }
  },

  async GetUserInfo({ commit }) {
    // First: read date from sessionStorage, if sessionStorage is null, read it from /api/index.js

    let user = null
    if (
      window.sessionStorage.getItem('loggedInState') &&
      JSON.parse(
        window.sessionStorage.getItem('loggedInState').toLowerCase()
      ) &&
      window.sessionStorage &&
      window.sessionStorage.getItem('FDES')
    ) {
      user = JSON.parse(window.sessionStorage.getItem('FDES')).user.info || null
    } else {
      user = null
    }

    // sessionStorage
    if (user) {
      commit(GET_USER_INFO, { info: user })
    } else {
      // ajax
      const result = await reqUserInfo()
      if (result.code === 200) {
        // const info = result.data
        // commit(GET_USER_INFO, { info })
      }
    }
  },

  LoggedInState({ commit }, isLogin) {
    commit(LOGGED_IN_STATE, isLogin)
  },

  UpdateUserInfoSelectDynamos({ commit }, dynamos) {
    commit(UPDATE_USER_INFO_SELECT_DYNAMOS, dynamos)
  }
}

function getToken() {
  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc'
  const _token =
    window.sessionStorage && window.sessionStorage.getItem('FDES')
      ? JSON.parse(window.sessionStorage.getItem('FDES')).user.token
      : TOKEN // || window.sessionStorage.getItem('token')

  if (_token) {
    return _token
  } else {
    return TOKEN
  }
}
