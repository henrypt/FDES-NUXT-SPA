import { reqSystemInfo } from './api.js'

const GET_SYSTEM_INFO = 'GetSystemInfo'
const UPDATE_SYSTEM_INFO_USERS = 'UpdateSystemInfoUsers'
const UPDATE_SYSTEM_INFO_ROLES = 'UpdateSystemInfoRoles'
const ADD_USER = 'AddUser'
const DELETE_USER = 'DeleteUser'

export const state = () => ({
  info: null
})

export const getters = {
  getDynamoInfoById: (state, getters) => (dyId) => {
    if (state && state.info) {
      const items = state.info.stations.items || null
      if (items) {
        for (const item of items) {
          return item.children.find((child) => child.id === dyId) || null
        }
      }
    }

    return null
  }
}

export const mutations = {
  [GET_SYSTEM_INFO](state, { info }) {
    state.info = info
  },
  [UPDATE_SYSTEM_INFO_USERS](state, { id, info }) {
    state.info.users.find((user) => {
      if (user.id === id) {
        user.dynamos = info
      }
    })
  },
  [UPDATE_SYSTEM_INFO_ROLES](state, { id, info }) {
    state.info.users.find((user) => {
      if (user.id === id) {
        user.roles = info
      }
    })
  },
  [ADD_USER](state, { info }) {
    state.info.users.push(info)
  },
  [DELETE_USER](state, id) {
    const users = state.info.users
    users.splice(
      users.findIndex((user) => user.id === id),
      1
    )
  }
}

export const actions = {
  async GetSystemInfo2({ commit }) {
    const result = await reqSystemInfo()
    if (result.code === 200) {
      const info = result.data
      commit(GET_SYSTEM_INFO, { info })
    }

    // return new Promise((resolve, reject) => {
    //   window.setTimeout(() => {
    //     const result = Get()
    //     const info = result.data
    //     commit(GET_SYSTEM_INFO, {info: info})
    //     resolve()
    //   },1000)
    // })
  },

  async GetSystemInfo({ commit }) {
    let system = null

    if (
      window.sessionStorage.getItem('loggedInState') &&
      JSON.parse(
        window.sessionStorage.getItem('loggedInState').toLowerCase()
      ) &&
      window.sessionStorage &&
      window.sessionStorage.getItem('FDES')
    ) {
      system = JSON.parse(window.sessionStorage.getItem('FDES')).system.info
    } else {
      system = null
    }

    // sessionStorage
    if (system) {
      commit(GET_SYSTEM_INFO, { info: system })
    } else {
      // ajax
      const result = await reqSystemInfo()
      if (result.code === 200) {
        const info = result.data
        commit(GET_SYSTEM_INFO, { info })
      }
    }
  },
  UpdateSystemInfo({ commit }, { key, id, info }) {
    switch (key) {
      case 'users/dys':
        commit(UPDATE_SYSTEM_INFO_USERS, { id, info })
        break
      case 'users/roles':
        commit(UPDATE_SYSTEM_INFO_ROLES, { id, info })
        break
      case 'users/add':
        commit(ADD_USER, { info })
        break
      case 'users/delete':
        commit(DELETE_USER, id)
        break
    }
  }
}

/*
function Get() {
  // return setTimeout(()=>{
  const info = {
    code: 200,
    data: [
      {
        id: '1',
        name: 'ZhuangTaiJianCe',
        key: 'ztjc',
        desc: '状态监测',
        disabled: false,
        to: '/ZhuangTaiJianCe',
        active: true,
        icon: 'home',
        subMenu: [
          {
            id: '1.1',
            name: 'ZhuangTaiZhanShi',
            desc: '状态展示',
            disabled: false,
            icon: './images/ZhuangTaiJianCe/ZhuangTaiZhanShi.png',
            to: '/ZhuangTaiJianCe/ZhuangTaiZhanShi',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.2',
            name: 'DingZiRaoZuWenDu',
            desc: '定子绕组温度',
            disabled: false,
            icon: './images/ZhuangTaiJianCe/DingZiRaoZuWenDu.png',
            to: '/ZhuangTaiJianCe/DingZiRaoZuWenDu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.3',
            name: 'TongXingCeDian',
            desc: '同型测点',
            disabled: true,
            icon: './images/ZhuangTaiJianCe/TongXingCeDian.png',
            to: '/ZhuangTaiJianCe/TongXingCeDian',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.4',
            name: 'WenDuFenBuShiYiTu',
            desc: '温度分部示意图',
            disabled: false,
            icon: './images/ZhuangTaiJianCe/WenDuFenBuShiYiTu.png',
            to: '/ZhuangTaiJianCe/WenDuFenBuShiYiTu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.5',
            name: 'ShuiDianLianJie',
            desc: '水电连接',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/ShuiDianLianJie.png',
            to: '/ZhuangTaiJianCe/ShuiDianLianJie',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.6',
            name: 'TieXinWenDu',
            desc: '铁芯温度',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/TieXinWenDu.png',
            to: '/ZhuangTaiJianCe/TieXinWenDu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.7',
            name: 'JinXiangYunXing',
            desc: '进相运行',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/JinXiangYunXing.png',
            to: '/ZhuangTaiJianCe/JinXiangYunXing',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.8',
            name: 'QiTaCanShu',
            desc: '其它参数',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/QiTaCanShu.png',
            to: '/ZhuangTaiJianCe/QiTaCanShu',
            type: 'ZhuangTaiJianCe'
          }
        ]
      },
      {
        id: '2',
        name: 'QuShiFenXi',
        key: 'qsfx',
        desc: '趋势分析',
        disabled: false,
        to: '/QuShiFenXi',
        active: true,
        icon: 'folder',
        subMenu: [
          {
            id: '2.1',
            name: 'FaZhan',
            desc: '发展趋势',
            disabled: false,
            icon: './images/QuShiFenXi/FaZhan.png',
            to: '/QuShiFenXi/FaZhan',
            type: 'QuShiFenXi'
          },
          {
            id: '2.2',
            name: 'TongXingBiJiao',
            desc: '同形比较',
            disabled: false,
            icon: './images/QuShiFenXi/TongXingBiJiao.png',
            to: '/QuShiFenXi/TongXingBiJiao',
            type: 'QuShiFenXi'
          }
        ]
      },
      {
        id: '7',
        name: 'ZhuangTaiJianCe',
        key: 'xtsz',
        desc: '系统设置',
        disabled: true,
        to: '/XiTongSheZhi',
        active: true,
        icon: 'settings',
        subMenu: [
          {
            id: '7.1',
            name: 'YongHuGuanLi',
            desc: '用户管理',
            disabled: false,
            icon: './images/XiTongSheZhi/YongHuGuanLi.png',
            to: '/XiTongSheZhi/YongHuGuanLi',
            type: 'XiTongSheZhi'
          },
          {
            id: '7.2',
            name: 'JueSheGuanLi',
            desc: '角色管理',
            disabled: false,
            icon: './images/XiTongSheZhi/JueSheGuanLi.png',
            to: '/XiTongSheZhi/JueSheGuanLi',
            type: 'XiTongSheZhi'
          }
        ]
      }
    ]
  }
  return info
  // },10000)
}
*/
