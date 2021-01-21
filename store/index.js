/*
Vuex's central object module
*/
import Vue from 'vue'
import Vuex from 'vuex'
import { reqToken } from './api.js'

Vue.use(Vuex)

export const getters = () => ({
  authStatus: (state) => state.status
})

export const state = () => ({
  token: {
    expireTime: -1,
    grantType: null, // 'client_credential',
    deviceID: null,
    secretKey: null, // '123456',
    authorization: null
  },
  expireTime: null,
  authCode: null
})

export const mutations = {
  initToken(state, { token }) {
    state.token = token
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = {
      expireTime: -1,
      grantType: null, // 'client_credential',
      deviceID: null,
      secretKey: null, // '123456',
      authorization: null
    }
  }
}

export const actions = {
  async initToken({ commit }) {
    const result = await reqToken()
    if (result.code === 200) {
      const token = result.data
      commit('initToken', { token })
      return token
    }
  },
  clearToken({ commit }) {
    commit('clearToken')
  },
  async refresh({ commit }, info) {
    const result = await reqToken()
    if (result.code === 200) {
      const token = result.data
      commit('initToken', { token })
      return token
    }
  }
}
