import { reqRoles } from './api.js'

const GET_ROLES_INFO = 'getRolesInfo'
const UPDATE_ROLES_INFO = 'updateRolesInfo'

export const state = () => ({
  info: null
})

export const mutations = {
  [GET_ROLES_INFO](state, { info }) {
    state.info = info
  },
  [UPDATE_ROLES_INFO](state, { info }) {
    if (info) {
      state.info = info
    }
  }
}

export const actions = {
  async GetRolesInfo({ commit }) {
    // First: read date from sessionStorage, if sessionStorage is null, read it from /api/index.js
    let roles = null
    if (
      window.sessionStorage.getItem('loggedInState') &&
      JSON.parse(
        window.sessionStorage.getItem('loggedInState').toLowerCase()
      ) &&
      window.sessionStorage &&
      window.sessionStorage.getItem('FDES')
    ) {
      roles = JSON.parse(window.sessionStorage.getItem('FDES')).roles.info
    } else {
      roles = null
    }

    if (roles) {
      commit(GET_ROLES_INFO, { info: roles })
    } else {
      // ajax
      const result = await reqRoles()
      if (result.code === 200) {
        const info = result.data
        commit(GET_ROLES_INFO, { info })
      }
    }
  },

  UpdateRolesInfo({ commit }, { info }) {
    if (info) {
      commit(UPDATE_ROLES_INFO, { info })
    }
  }
}
