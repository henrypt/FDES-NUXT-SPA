// async function hDefaultTo() {
//   const self = this
//   const store = self.$store
//   let to = null
//   let menuInfo = null

//   await store.dispatch('menu/GetMenuInfo')

//   menuInfo = store.state.menu.info || null
//   debugger
//   let current = null
//   if (menuInfo) {
//     current = menuInfo.find((item) => {
//       if (item.to === '/' + self.$route.name) {
//         return item
//       }
//     })

//     to = current.defaultTo || current.subMenu[0].to
//     self.$router.push(to) // 页面加载时跳转
//   }
//   window.console.log(to, menuInfo, current)
// }

// function hDefaultTo(strPath) {
//   return false
// }

export default ({ app, $axios, store, route, redirect }) => {
  // nuxtjs中使用路由守卫
  // 路由守卫一般是来验证token失效, 也可以设置权限
  app.router.beforeEach((to, from, next) => {
    next()
  })

  app.router.afterEach((to, from) => {
    // let current = null
    // const menuInfo = store.state.menu.info || null
    // window.console.log('menuInfo = ', menuInfo)
    // if (menuInfo) {
    //   current = menuInfo.find((item) => {
    //     if (item.to === '/' + route.path) {
    //       return item
    //     }
    //   })
    //   if (current) {
    //     if (current.defaultTo) {
    //       self.$router.push(current.defaultTo) // 页面加载时跳转
    //     } else {
    //       self.$router.push(current.subMenu[0].to) // 页面加载时跳转
    //     }
    //   }
    // }
  })

  // const menuInfo = store.state.menu || null
  // let current = null
  // window.console.log('33 store.state.menu = ', store.state.menu)
  // if (menuInfo) {
  //   debugger
  //   current = menuInfo.find((item) => {
  //     if (item.to === '/' + route.path) {
  //       return item
  //     }
  //   })

  //   const to = current.defaultTo || current.subMenu[0].to
  //   alert(to)
  //   self.$router.push(to) // 页面加载时跳转
  // }

  // hDefaultTo(route.path)
  // let userLogin = false
  // if (store.state.user.info && store.state.user.token) {
  //   userLogin = true
  // }
  // app.router.beforeEach((to, from, next) => {
  //   const isClinet = process.client
  //   if (isClinet) {
  //     // const currentHref = location.href
  //     if (!userLogin) {
  //       if (to.path === '/welcome') {
  //         next && next()
  //       } else {
  //         // next({ path: '/welcome' })
  //         app.router.replace('/welcome')
  //         next()
  //       }
  //     }
  //     // window.console.log(isClinet, to.path, currentHref)
  //   }
  //   next()
  // })
}
