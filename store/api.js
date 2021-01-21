import CryptoJS from 'crypto-js'

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

const systemInfoData = {
  name: '发电机智能监测及故障诊断系统',
  enname: 'Generator intelligence monitoring and fault dragnosis expert system',
  sname: 'FDES',
  home: {
    welcome: 'welcome',
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
            selected: false,
            dynamoType: 100
          },
          {
            id: 20,
            name: '二号机',
            shortName: 'D2',
            disabled: false,
            selected: false,
            dynamoType: 100
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
            selected: false,
            dynamoType: 101
          },
          {
            id: 23,
            name: '二号机',
            shortName: 'L2',
            disabled: false,
            selected: false,
            dynamoType: 101
          },
          {
            id: 24,
            name: '三号机',
            shortName: 'L3',
            disabled: false,
            selected: false,
            dynamoType: 101
          },
          {
            id: 25,
            name: '四号机',
            shortName: 'L4',
            disabled: false,
            selected: false,
            dynamoType: 101
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
            selected: false,
            dynamoType: 1022
          },
          {
            id: 32,
            name: '二号机',
            shortName: 'N2',
            disabled: false,
            selected: false,
            dynamoType: 1022
          },
          {
            id: 33,
            name: '三号机',
            shortName: 'N3',
            disabled: false,
            selected: false,
            dynamoType: 1022
          }
        ]
      }
    ]
  },
  users: [
    {
      id: 1,
      name: 'user 1',
      pwd: '8888',
      dynamos: [
        {
          id: 19,
          name: '一号机',
          shortName: 'D1',
          disabled: false,
          selected: false,
          dynamoType: 100
        },
        {
          id: 20,
          name: '二号机',
          shortName: 'D2',
          disabled: false,
          selected: false,
          dynamoType: 101
        }
      ],
      roles: { text: '系统工程师', value: 5 }
    },
    {
      id: 2,
      name: 'user 2',
      pwd: '8888',
      dynamos: [
        {
          id: 19,
          name: '一号机',
          shortName: 'D1',
          disabled: false,
          selected: false,
          dynamoType: 100
        },
        {
          id: 20,
          name: '二号机',
          shortName: 'D2',
          disabled: false,
          selected: false,
          dynamoType: 101
        }
      ],
      roles: { text: 'VIP', value: 6 }
    },
    {
      id: 3,
      name: 'henry',
      pwd: '8888',
      // dynamos: [19, 20],
      dynamos: [
        {
          id: 19,
          name: '一号机',
          shortName: 'D1',
          disabled: false,
          selected: false,
          dynamoType: 100
        },
        {
          id: 20,
          name: '二号机',
          shortName: 'D2',
          disabled: false,
          selected: false,
          dynamoType: 101
        },
        {
          id: 22,
          name: '一号机',
          shortName: 'L1',
          disabled: false,
          selected: false,
          dynamoType: 101
        },
        {
          id: 23,
          name: '二号机',
          shortName: 'L2',
          disabled: false,
          selected: false,
          dynamoType: 101
        }
      ],
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
export const reqSystemInfo = () => {
  const data = {
    code: 200,
    data: systemInfoData
  }
  return Sleep(data)
}

// export const reqRoles = () => ajax(`${BASE_URL}/roles`, 'GET')
const rolesData = [
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
export const reqRoles = () => {
  const data = {
    code: 200,
    data: rolesData
  }
  return Sleep(data)
}

// export const reqUsers = () => ajax(`${BASE_URL}/users`, 'GET')
export const reqUsers = () => {
  let r = null
  if (window) {
    const fdes = JSON.parse(window.sessionStorage.getItem('FDES')) || null
    if (fdes && fdes.system && fdes.system.info) {
      r = {
        code: 200,
        data: fdes.system.info.users
      }
    }
  } else {
    r = {
      code: 200,
      data: systemInfoData
    }
  }

  return Sleep(r)
}

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

// 用户登出
// export const reqLogout = (id) => ajax('/logout', {id}, 'POST')
export const reqLogout = (id) => {
  // 静态模拟数据
  const data = {
    code: 200
  }
  return Sleep(data, 500)
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
