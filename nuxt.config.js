const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      // { rel: 'icon', type: 'image/png', href: '/icon.png' }
      // {
      //   rel: 'stylesheet',
      //   href: '/font/fdes-font.css?family=Roboto:100,300,400,500,700,900'
      // }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./static/common.css', './static/font/iconfont.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/storeCache', ssr: false },
    { src: '~/plugins/persistedstate.js', ssr: false },
    // { src: '~/plugins/axios.js', ssr: false },
    { src: './static/font/iconfont.js', ssr: false },
    { src: '~/plugins/i18n', ssr: false },
    { src: '~/plugins/lodash', ssr: false },
    { src: '~/plugins/route', ssr: false },
    { src: '~/plugins/common.js', ssr: false },
    { src: '~/plugins/x2js.js', ssr: false },
    { src: '~/plugins/echarts.js', ssr: false },
    { src: '~/plugins/lazyrender.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/router'
  ],
  webfontloader: {
    fdes: {
      families: ['Roboto:100,300,400,500,700,900'] // Loads Lato font with weights 400 and 700
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    credentials: true
  },
  proxy: {
    '/api': {
      target: 'http://192.168.0.191:80',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#00C58E', // light-green butto background
          secondary: '#EDF2F7', // white-gray button background
          anchor: '#6784D0', // 锚 light-blue for <a></a>
          info: '#2F4963', // dark-gray text color
          success: '#09B3AF', // dark-green butto background
          warning: '#F56565',
          accent: '#8c9eff', // 强调 #606F7B
          error: '#b71c1c',
          words: '#263238',
          danwei: '#90A4AE',
          sub_title1: '#DCEDC8',
          sub_title2: '#F1F8E9'
          // border-color:
          //  #05668D dark-blue, font-color: #4A658F
          //  #5CA4A9 light-green, font-color: #5CA4A9
          //
        }
      },
      fontFamily: 'sss',
      iconfont: 'mdi'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     * extractCSS: { allChunks: true },    // css 独立打包 link 的形式加载
     * publicPath: '/sample/assets/', //sample/essays 打包的默认路径为 ‘_nuxt’ 或者可以指定cdn 域名
     * filenames:{         // css 和 js  img 打包时指定文件夹
     *  app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
     *  chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
     *  css: ({ isDev }) => isDev ? '[name].js' : '[contenthash].css',
     *  img: ({ isDev }) => isDev ? '[path][name].[ext]' : '[hash:7].[ext]'
     * }
     */

    extend(config, ctx) {}
  },
  router: {
    // base: './', // 此为根目录，如果有具体目录需求按实际情况写
    middleware: ['header', 'i18n', 'auth']
    // router: {
    //   scrollBehavior(to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    //   }
    // }
  }
}
