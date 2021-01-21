// import { reqMenuInfo } from '../api/index.js'
const INIT_MENU = 'InitMenu'
const GET_MENU_INFO = 'GetMenuInfo'
const UPDATE_MENU_INFO = 'UpdateMenuInfo'
const SET_MENU_CAN = 'SetMenuCan'

export const state = () => ({
  info: null
})

export const mutations = {
  // Menu Data from i18n -> locales/
  [INIT_MENU](state, { info }) {
    state.info = info
  },
  [GET_MENU_INFO](state, { info }) {
    state.info = info
  },
  [UPDATE_MENU_INFO](state, { arrPower }) {
    const menuInfo = state.info || []

    menuInfo.forEach((menu) => {
      menu.can =
        arrPower.find((item) => item.id === menu.key).power[0].can === 1
    })

    state.info = menuInfo
  },
  [SET_MENU_CAN](state, { info }) {
    state.info[info.index].can = info.can
  }
}

export const actions = {
  GetMenuInfo({ commit }, info) {
    const fdes = window.sessionStorage.getItem('FDES') || null
    const menuData = JSON.parse(fdes).menu.info // window.sessionStorage.getItem('menu') || null

    // sessionStorage
    if (!menuData) {
      // commit(GET_MENU_INFO, { info })
      // } else {
      // ajax
      // const result = await reqMenuInfo()
      const result = info || null // self.$t('menuClass1') || null

      if (result.code === 200) {
        const info2 = result.data
        commit(GET_MENU_INFO, { info2 })
      }
    }
  },
  UpdateMenuInfo({ commit }, arrPower) {
    commit(UPDATE_MENU_INFO, { arrPower })
  },
  SetMenuCan({ commit }, info) {
    commit(SET_MENU_CAN, { info })
  }
}
