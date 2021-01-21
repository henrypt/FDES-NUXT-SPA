/*
  包含n个接口请求函数的模块
  函数的返回值: promise对象
 */
// import axios from '@nuxtjs/axios' // '~/plugins/axios.js'
import CryptoJS from 'crypto-js'
import config from './pyconfig.js'
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'

const BASE_URL = config.ROOT
window.console.log('BASE_URL = ', BASE_URL)

export const reqEquips = () => ajax(`${BASE_URL}/nd/get/sys_GetEquips.asp`)

// 获取模板列表
export const reqModelList = (types) =>
  ajax(`${BASE_URL}/nd/get/sea_getModelList.asp?types=${types}`)

// 获取指定模板ID的数据
export const reqModelDataById = (modelId) =>
  ajax(`${BASE_URL}/nd/get/sea_getModelItem.asp?SetId=${modelId}`)

// 获取多台机型+机组+项目 的列表数据
export const reqTCategories = (dynamoId) =>
  ajax(
    `${BASE_URL}/nd/get/mai_ISetTest-ansi.asp?t=GetTCategorys&Dynamo=${dynamoId}`
  )

// 获取指定机组+机型+分类项目ID 的 多台监测量数据
export const reqTsitmes = (dynamo, dType, catId) =>
  ajax(
    `${BASE_URL}/nd/get/mai_ISetTest.asp?t=GetTestItemByCat&Dynamo=${dynamo}&DType=${dType}&CatID=${catId}`
  )

export const reqLanguages = () => ajax(BASE_URL + '/languages')

// get menu class 1 json data
export const reqMenuClass1 = (lang) =>
  ajax(`${BASE_URL}/menuClass1?lang=${lang}`)

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) =>
  ajax(BASE_URL + '/search_shops', { geohash, keyword })

// 用户名密码登陆
export const reqLogin = ({ name, pwd }) => ajax('/login', { name, pwd }, 'POST')

// 用户登出
// export const reqLogout = (id) => ajax('/logout', {id}, 'POST')
export const reqLogout = (id) => {
  // 静态模拟数据
  const data = {
    code: 200
  }
  return Sleep(data, 5000)
}

export const reqToken = () => {
  const data = {
    code: 200,
    data: {
      expireTime: -1,
      grantType: 'client_credential',
      deviceID: 'fdesBJ',
      secretKey: '8888',
      authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc'
    }
  }
  return Sleep(data)
}

// System Users
// 根据会话获取用户信息
export const reqUserInfo = () => {
  // 静态模拟数据
  const data = {
    code: 200,
    data: {
      id: 1,
      name: '访客',
      pwd: '8888',
      dynamos: [19, 20],
      roles: { text: '普通用户', value: 1 }
    }
  }
  return Sleep(data)
}

// export const reqUsers = () => ajax(`${BASE_URL}/users`, 'GET')
export const reqUsers = () => {
  // 静态模拟数据
  const data = {
    code: 200,
    data: [
      {
        id: 1,
        name: '访客',
        pwd: '8888',
        dynamos: [19, 20],
        roles: { text: '普通用户', value: 1 }
      },
      {
        id: 2,
        name: 'user 1',
        pwd: '8888',
        dynamos: [21, 222, 23],
        roles: { text: '系统工程师', value: 5 }
      },
      {
        id: 3,
        name: 'user 2',
        pwd: '8888',
        dynamos: [19, 20],
        roles: { text: 'VIP', value: 6 }
      },
      {
        id: 4,
        name: 'henry',
        pwd: '8888',
        dynamos: [19, 20],
        roles: { text: 'VIP', value: 6 }
      }
    ]
  }
  return Sleep(data)
}

// export const reqRoles = () => ajax(`${BASE_URL}/roles`, 'GET')
export const reqRoles = () => {
  const data = {
    code: 200,
    data: [
      {
        id: 1,
        name: '普通用户', // cans:'1,1,10000,0,0,00,0',
        powers: [
          {
            id: 'ztjc',
            name: '状态监测',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'qsfx',
            name: '趋势分析',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'gzzd',
            name: '故障诊断',
            power: [
              { name: '浏览报警', can: 0 },
              {
                name: '浏览故障诊断、故障部位、故障树、原发先兆、人工提交先兆',
                can: 0
              },
              { name: '运行中处理故障、人工提交先兆、运行数据审核', can: 0 },
              { name: '检修处理故障、人工提交先兆、检修数据审核', can: 0 },
              { name: '测点异常处理', can: 0 }
            ],
            cans: []
          },
          {
            id: 'sjlr',
            name: '数据录入',
            power: [{ name: '查询', can: 0 }],
            cans: []
          },
          {
            id: 'yctj',
            name: '异常统计',
            power: [{ name: '查询', can: 0 }],
            cans: []
          },
          {
            id: 'sjcl',
            name: '数据处理',
            power: [
              { name: '查询', can: 1 },
              { name: '设置', can: 0 }
            ],
            cans: []
          },
          {
            id: 'xtsz',
            name: '系统设置',
            power: [{ name: '查询', can: 0 }],
            cans: []
          }
        ]
      },
      {
        id: 3,
        name: '运行工程师', // cans:'1,1,11100,1,1,10,0',
        powers: [
          {
            id: 'ztjc',
            name: '状态监测',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'qsfx',
            name: '趋势分析',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'gzzd',
            name: '故障诊断',
            power: [
              { name: '浏览报警', can: 1 },
              {
                name: '浏览故障诊断、故障部位、故障树、原发先兆、人工提交先兆',
                can: 1
              },
              { name: '运行中处理故障、人工提交先兆、运行数据审核', can: 1 },
              { name: '检修处理故障、人工提交先兆、检修数据审核', can: 0 },
              { name: '测点异常处理', can: 0 }
            ],
            cans: []
          },
          {
            id: 'sjlr',
            name: '数据录入',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'yctj',
            name: '异常统计',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'sjcl',
            name: '数据处理',
            power: [
              { name: '查询', can: 1 },
              { name: '设置', can: 0 }
            ],
            cans: []
          },
          {
            id: 'xtsz',
            name: '系统设置',
            power: [{ name: '查询', can: 0 }],
            cans: []
          }
        ]
      },
      {
        id: 4,
        name: '维修工程师', // cans:'1,1,11011,1,1,10,0',
        powers: [
          {
            id: 'ztjc',
            name: '状态监测',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'qsfx',
            name: '趋势分析',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'gzzd',
            name: '故障诊断',
            power: [
              { name: '浏览报警', can: 1 },
              {
                name: '浏览故障诊断、故障部位、故障树、原发先兆、人工提交先兆',
                can: 1
              },
              { name: '运行中处理故障、人工提交先兆、运行数据审核', can: 0 },
              { name: '检修处理故障、人工提交先兆、检修数据审核', can: 1 },
              { name: '测点异常处理', can: 1 }
            ],
            cans: []
          },
          {
            id: 'sjlr',
            name: '数据录入',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'yctj',
            name: '异常统计',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'sjcl',
            name: '数据处理',
            power: [
              { name: '查询', can: 1 },
              { name: '设置', can: 0 }
            ],
            cans: []
          },
          {
            id: 'xtsz',
            name: '系统设置',
            power: [{ name: '查询', can: 0 }],
            cans: []
          }
        ]
      },
      {
        id: 5,
        name: '系统工程师', // cans:'1,1,11111,1,1,11,0',
        powers: [
          {
            id: 'ztjc',
            name: '状态监测',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'qsfx',
            name: '趋势分析',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'gzzd',
            name: '故障诊断',
            power: [
              { name: '浏览报警', can: 1 },
              {
                name: '浏览故障诊断、故障部位、故障树、原发先兆、人工提交先兆',
                can: 1
              },
              { name: '运行中处理故障、人工提交先兆、运行数据审核', can: 1 },
              { name: '检修处理故障、人工提交先兆、检修数据审核', can: 1 },
              { name: '测点异常处理', can: 1 }
            ],
            cans: []
          },
          {
            id: 'sjlr',
            name: '数据录入',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'yctj',
            name: '异常统计',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'sjcl',
            name: '数据处理',
            power: [
              { name: '查询', can: 1 },
              { name: '设置', can: 1 }
            ],
            cans: []
          },
          {
            id: 'xtsz',
            name: '系统设置',
            power: [{ name: '查询', can: 0 }],
            cans: []
          }
        ]
      },
      {
        id: 6,
        name: 'VIP用户', // cans:'1,1,11111,1,1,11,1',
        powers: [
          {
            id: 'ztjc',
            name: '状态监测',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'qsfx',
            name: '趋势分析',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'gzzd',
            name: '故障诊断',
            power: [
              { name: '浏览报警', can: 1 },
              {
                name: '浏览故障诊断、故障部位、故障树、原发先兆、人工提交先兆',
                can: 1
              },
              { name: '运行中处理故障、人工提交先兆、运行数据审核', can: 1 },
              { name: '检修处理故障、人工提交先兆、检修数据审核', can: 1 },
              { name: '测点异常处理', can: 1 }
            ],
            cans: []
          },
          {
            id: 'sjlr',
            name: '数据录入',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'yctj',
            name: '异常统计',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'sjcl',
            name: '数据处理',
            power: [
              { name: '查询', can: 1 },
              { name: '设置', can: 1 }
            ],
            cans: []
          },
          {
            id: 'xtsz',
            name: '系统设置',
            power: [{ name: '查询', can: 1 }],
            cans: []
          }
        ]
      },
      {
        id: 7,
        name: '油务工程师', // cans:'1,1,11000,1,0,10,0',
        powers: [
          {
            id: 'ztjc',
            name: '状态监测',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'qsfx',
            name: '趋势分析',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'gzzd',
            name: '故障诊断',
            power: [
              { name: '浏览报警', can: 1 },
              {
                name: '浏览故障诊断、故障部位、故障树、原发先兆、人工提交先兆',
                can: 1
              },
              { name: '运行中处理故障、人工提交先兆、运行数据审核', can: 0 },
              { name: '检修处理故障、人工提交先兆、检修数据审核', can: 0 },
              { name: '测点异常处理', can: 0 }
            ],
            cans: []
          },
          {
            id: 'sjlr',
            name: '数据录入',
            power: [{ name: '查询', can: 1 }],
            cans: []
          },
          {
            id: 'yctj',
            name: '异常统计',
            power: [{ name: '查询', can: 0 }],
            cans: []
          },
          {
            id: 'sjcl',
            name: '数据处理',
            power: [
              { name: '查询', can: 1 },
              { name: '设置', can: 0 }
            ],
            cans: []
          },
          {
            id: 'xtsz',
            name: '系统设置',
            power: [{ name: '查询', can: 0 }],
            cans: []
          }
        ]
      }
    ]
  }
  return Sleep(data)
}

export const reqSystemInfo = () => {
  const data = {
    code: 200,
    data: {
      name: '发电机故障诊断专家系统',
      home: {
        to: '/ztjc/ztzs'
      },
      logoInfo: {
        to: '/',
        img: '/v.png'
      },
      stations: {
        items: [
          {
            id: 1,
            name: '大亚湾',
            shortName: 'DYW',
            selected: false,
            children: [
              {
                id: 19,
                name: '一号机',
                shortName: 'D1',
                disabled: false,
                selected: false
              },
              {
                id: 20,
                name: '二号机',
                shortName: 'D2',
                disabled: false,
                selected: false
              }
            ]
          },
          {
            id: 2,
            name: '岭东',
            shortName: 'LD',
            selected: true,
            children: [
              {
                id: 22,
                name: '一号机',
                shortName: 'L1',
                disabled: false,
                selected: false
              },
              {
                id: 23,
                name: '二号机',
                shortName: 'L2',
                disabled: false,
                selected: false
              },
              {
                id: 24,
                name: '三号机',
                shortName: 'L3',
                disabled: false,
                selected: false
              },
              {
                id: 25,
                name: '四号机',
                shortName: 'L4',
                disabled: false,
                selected: false
              }
            ]
          },
          {
            id: 3,
            name: '宁德',
            shortName: 'ND',
            selected: false,
            children: [
              {
                id: 31,
                name: '一号机',
                shortName: 'N1',
                disabled: false,
                selected: false
              },
              {
                id: 32,
                name: '二号机',
                shortName: 'N2',
                disabled: false,
                selected: false
              },
              {
                id: 33,
                name: '三号机',
                shortName: 'N3',
                disabled: false,
                selected: false
              }
            ]
          }
        ]
      },
      users: [
        {
          id: 1,
          name: 'user 1',
          dynamos: [21, 222, 23],
          roles: { text: '系统工程师', value: 5 }
        },
        {
          id: 2,
          name: 'user 2',
          dynamos: [19, 20],
          roles: { text: 'VIP', value: 6 }
        }
      ],
      roles: [
        { text: '普通用户', value: 1 },
        { text: '高管', value: 2 },
        { text: '运行工程师', value: 3 },
        { text: '维修工程师', value: 4 },
        { text: '系统工程师', value: 5 },
        { text: 'VIP用户', value: 6 },
        { text: '油务工程师', value: 7 }
      ]
    }
  }
  return Sleep(data)
}

export const reqMenuInfo = () => {
  const sdata = {
    code: 200,
    data: []
  }

  return Sleep(sdata)
}

// 获取多台机型+机组+项目 的列表数据
export const reqFaultTree = (treeId, dynamoId) => {
  // ajax(
  //   `${BASE_URL}/nd/get/QryFaultModeTree.asp?Treeid=${treeId}&dynamo=${dynamoId}`,
  //   {},
  //   'GET',
  //   'json'
  // )
  const sdata = {
    code: 200,
    data: {
      id: '125006',
      name: '定子铁芯铜屏蔽温度高',
      side: '0',
      Color: '0',
      children: [
        {
          id: '151001',
          name: '冷氢温度高',
          side: '1',
          Color: '0',
          children: [
            {
              id: '151007',
              name: '氢冷器水侧窝气',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151008',
              name: '氢冷器泄漏',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '171003',
                  name: '氢气露点温度GRV004MZ高',
                  side: '2',
                  Color: '0',
                  children: []
                },
                {
                  id: '171008',
                  name: '漏氢量大',
                  side: '2',
                  Color: '0',
                  children: []
                },
                {
                  id: '141007',
                  name: '机壳内积水',
                  side: '2',
                  Color: '0',
                  children: []
                },
                {
                  id: '171001',
                  name: '氢气压力GRV001／002MP低',
                  side: '2',
                  Color: '0',
                  children: []
                }
              ]
            },
            {
              id: '171029',
              name: '氢冷器冷却效能低或通风系统异常',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '151005',
                  name: '氢气冷却器冷却效能低',
                  side: '0',
                  Color: '0',
                  children: [
                    {
                      id: '151006',
                      name: '氢冷器堵塞故障',
                      side: '1',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '171025',
                      name: '氢冷器外表脏污、损伤',
                      side: '1',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '171028',
                  name: '发电机通风冷却系统异常',
                  side: '0',
                  Color: '0',
                  children: [
                    {
                      id: '171026',
                      name: '冷、热氢短路',
                      side: '1',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '151013',
                  name: '冷热氢温差小',
                  side: '2',
                  Color: '0',
                  children: []
                }
              ]
            },
            {
              id: '151003',
              name: '氢冷器冷却水流量低',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '171024',
                  name: '氢气温度控制阀GRH001VD故障',
                  side: '1',
                  Color: '0',
                  children: []
                },
                {
                  id: '151019',
                  name: '氢冷器冷却水系统泄漏',
                  side: '1',
                  Color: '0',
                  children: [
                    {
                      id: '151021',
                      name: '氢冷器疏水阀关闭不严',
                      side: '0',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '151020',
                      name: '氢冷器冷却水系统管路泄漏',
                      side: '0',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '151018',
                  name: '氢冷器及其冷却水系统中某些阀门开度异常',
                  side: '1',
                  Color: '0',
                  children: []
                },
                {
                  id: '162011',
                  name: '闭路水总流量SRI001MD低',
                  side: '1',
                  Color: '0',
                  children: []
                }
              ]
            },
            {
              id: '151004',
              name: '氢冷器冷却水入口温度高',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '162008',
                  name: '闭路水供水温度SRI001MT高',
                  side: '1',
                  Color: '0',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: '125001',
          name: '定子铁芯铜屏蔽松动',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '125002',
          name: '定子铁芯铜屏蔽通风不良',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '171001',
          name: '氢气压力GRV001／002MP低',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '114023',
          name: '发电机过负荷',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '151002',
          name: '热氢温度高',
          side: '2',
          Color: '0',
          children: []
        },
        {
          id: '151014',
          name: '冷热氢温差大',
          side: '2',
          Color: '0',
          children: []
        }
      ]
    }
  }

  return Sleep(sdata)
}

export const reqFaultMode = (treeId, dynamoId) => {
  const sdata = {
    code: 200,
    data: {
      id: '125006',
      name: '定子绕组',
      side: '0',
      Color: '0',
      children: [
        {
          id: '151001',
          name: '绕组槽部',
          side: '1',
          Color: '0',
          children: [
            {
              id: '151077',
              name: '定子线棒堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151078',
              name: '定子线棒空心导线渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151079',
              name: '定子线棒股线断裂',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151080',
              name: '定子线棒股间短路',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151081',
              name: '定子线棒槽部振动大',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151082',
              name: '定子线棒槽问振动火花放电',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151083',
              name: '定子线棒槽部绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151084',
              name: '定子线棒槽楔松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151085',
              name: '定子线棒绝缘内部分层及损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151086',
              name: '定子线棒空心导线堵塞',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151002',
          name: '绕组端部',
          side: '1',
          Color: '0',
          children: [
            {
              id: '161001',
              name: '定子线棒出槽口处防晕层损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161002',
              name: '定子线棒出槽口处绝缘局部损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161003',
              name: '定子线棒水电接头渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161004',
              name: '定子线棒接头接触不良或部分开焊',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161005',
              name: '水电接头手包绝缘不良',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161006',
              name: '绝缘引水管（包括接头）渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161007',
              name: '绝缘引水管堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161008',
              name: '定子水总进、出口水管渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161009',
              name: '定子绕组端部振动大',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161010',
              name: '定子绕组端部绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151003',
          name: '引出线',
          side: '1',
          Color: '0',
          children: [
            {
              id: '171001',
              name: '引出线出水温度',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171001',
              name: '引出线水路堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171002',
              name: '引出线水路窝气',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171003',
              name: '套管内冷水渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171004',
              name: '引出线水路渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171005',
              name: '主引线（过渡引线）渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171006',
              name: '套管绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171007',
              name: '主引线（过渡引线）绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171008',
              name: '相环、过渡引线水电接头及软连接接头不良或部分开焊故障',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171009',
              name: '套管漏氢',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151004',
          name: '绕组其它',
          side: '1',
          Color: '0',
          children: [
            {
              id: '181001',
              name: '定子线棒温度高',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181002',
              name: '整个分支过热',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181003',
              name: '整相绕组过热',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181004',
              name: '定子线棒水路堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181005',
              name: '定子内冷水路渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181006',
              name: '定子绕组绝缘受潮',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181007',
              name: '浸渍不良故障',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151005',
          name: '定子铁芯槽部',
          side: '1',
          Color: '0',
          children: [
            {
              id: '191001',
              name: '定子铁芯松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '191002',
              name: '定子铁芯绝缘局部损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '191003',
              name: '定子铁芯径向通风槽堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '191004',
              name: '定子铁芯温度高',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151006',
          name: '定子铁芯阶梯段',
          side: '1',
          Color: '0',
          children: [
            {
              id: '211001',
              name: '定子铁芯阶梯段齿部通风槽堵塞',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151007',
          name: '定子铁芯压指',
          side: '1',
          Color: '0',
          children: [
            {
              id: '221001',
              name: '定子铁芯压指松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '221002',
              name: '定子铁芯压指通风不良',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151008',
          name: '定子铁芯压圈',
          side: '1',
          Color: '0',
          children: [
            {
              id: '251010',
              name: '定子铁芯压圈松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '251011',
              name: '定子铁芯压圈通风不良',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151009',
          name: '定子端部屏蔽环',
          side: '1',
          Color: '0',
          children: [
            {
              id: '231002',
              name: '定子铁芯铜屏蔽松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '231003',
              name: '定子铁芯铜屏蔽通风不良',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '231004',
              name: '定子铁芯铜屏蔽温度高',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151010',
          name: '铁芯其它',
          side: '1',
          Color: '0',
          children: [
            {
              id: '241001',
              name: '定子铁芯两端压圈、定位筋锁紧螺母等结构件松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '241001',
              name: '定子铁芯刚性支撑结构松动',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        }
      ]
    }
  }

  return Sleep(sdata)
}

function Sleep(data, time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

/**
 * AES块加密
 * mode:
 *   AES分为几种模式，比如ECB，CBC，CFB等等，这些模式除了ECB由于没有使用IV而不太安全，其他模式差别并没有太明显，大部分的区别在IV和KEY来计算密文的方法略有区别。具体可参考WIKI的说明。
 * padding:
 *   AES块加密说过，PADDING是用来填充最后一块使得变成一整块，所以对于加密解密两端需要使用同一的PADDING模式，大部分PADDING模式为PKCS5, PKCS7, NOPADDING。
 * 加密解密端
 * 所以，在设计AES加密的时候
 * - 对于加密端，应该包括：加密秘钥长度，秘钥，IV值，加密模式，PADDING方式。
 * - 对于解密端，应该包括：解密秘钥长度，秘钥，IV值，解密模式，PADDING方式。
 */
const KEY = '46cc793c53dc451b'
const IV = '15101510340'
export const encrypt = (word) => {
  const key = CryptoJS.enc.Utf8.parse(KEY)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
/**
 * AES块解密
 */
export const decrypt = (word) => {
  const key = CryptoJS.enc.Utf8.parse(KEY)
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
