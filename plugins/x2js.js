// x2js 这是一个在XML和JavaScript对象之间进行转换的库
import Vue from 'vue'
import x2js from 'x2js'

// Vue.use(x2js)
// eslint-disable-next-line new-cap
Vue.prototype.$x2js = new x2js()
