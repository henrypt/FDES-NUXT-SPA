# nuxt-study

> My lovely Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# 为什么使用nuxt.js?
``` 
vue单页面应用渲染是从服务器获取所需js，在客户端将其解析生成html挂载于
id为app的DOM元素上，这样会存在两大问题。

由于资源请求量大，造成网站首屏加载缓慢，不利于用户体验。
由于页面内容通过js插入，对于内容性网站来说，搜索引擎无法抓取网站内容，不利于SEO。
Nuxt.js 是一个基于Vue.js的通用应用框架，预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。可以将html在服务端渲染，合成完整的html文件再输出到浏览器。
```

> 路由
nuxt按照 pages 文件夹的目录结构自动生成路由

> 入口页面
nuxt页面入口为 layouts/default.vue

> webpack配置
nuxt内置webpack，允许根据服务端需求，在 nuxt.config.js 中的build属性自定义构建webpack的配置，覆盖默认配置

> sass文件如需解析，nuxt.config.js中配置css属性
``` json
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  }
```
> 使用axios并跨域
npm install @nuxtjs/proxy -S
nuxt 项目默认安装axios， 所以只需安装proxy即可
``` json
  "dependencies": {
    "@nuxtjs/axios": "^5.0.0",
    "@nuxtjs/proxy": "^1.2.4",
  }
```


# npm generate 属性配置
https://www.w3cschool.cn/nuxtjs/nuxtjs-t6ao36hd.html

