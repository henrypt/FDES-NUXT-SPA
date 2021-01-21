export default {
  // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false
  // // 一级菜单
  // menuClass1: (state) => (pid) => {
  //   return state.categories && state.categories.filter(c => c.parentID === pid)
  // },
  // // 二级菜单
  // menuClass2: (state) => (pid) => {
  //   return state.categories.filter(c => c.parentID === pid)
  // }
  //   filteredProducts (state, { filterCategory }) {
  //     return state.products.filter(product => {
  //       return product.category === filterCategory
  //     })
  //   }
}
