/*
  ajax请求函数模块
  返回值: promise对象(异步返回的数据是: response.data)

  axios消息拦截器
    instance.interceptors.request.use
    instance.interceptors.response.use
 */

import x2js from 'x2js'
import instance from './config.js'

export default function ajax(url, data = {}, type = 'GET', format = 'xml') {
  return new Promise(function(resolve, reject) {
    // 执行异步ajax请求
    let promise

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach((key) => {
        dataStr += key + '=' + data[key] + '&'
      })

      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      // 发送get请求
      promise = instance.get(url)
    } else {
      // 发送post请求
      promise = instance.post(url, data)
    }

    promise
      .then(function(response) {
        if (response.status === 200) {
          // 成功了调用resolve()
          // <?xml version="1.0" encoding="GB2312" ?>

          // const idx = response.data.indexOf('GB2312') || -1
          // if ( idx>-1 ) {
          //   resolve(new x2js().xml2js(response.data.substring(42)))
          // }
          // else{
          // eslint-disable-next-line new-cap

          if (format === 'json') {
            resolve(response.data)
          } else {
            // window.console.log(new x2js())
            // eslint-disable-next-line new-cap
            resolve(new x2js().xml2js(response.data))
          }
          // }
        } else {
          // 失败了调用reject()
          // reject()
        }

        try {
        } catch (error) {
          // 失败了调用reject()
          reject(error)
        }
      })
      .catch(function(error) {
        // 失败了调用reject()
        reject(error)
      })
  })
}

/*
const response = await ajax()
const result = response.data

const resule = await ajax()
 */
