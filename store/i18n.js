const LS_NAME = 'FDES_LANGUAGE'
export const state = () => ({
  info: {
    localStorageName: LS_NAME,
    languages: [
      { name: '简体中文', value: 'zh-CN' },
      { name: 'English', value: 'en-US' }
    ]
  },
  locales: ['en-US', 'zh-CN'],
  locale: window.localStorage.getItem(LS_NAME) || 'zh-CN'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state && state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const actions = {}
