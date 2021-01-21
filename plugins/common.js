import Vue from 'vue'
import Moment from 'moment'

const common = {
  install(Vue) {
    Vue.prototype.i18nConfiguration = {
      name: 'FDES_LANGUAGE'
    }

    Vue.prototype.$moment = {
      moment: (date) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')
        return newMoment
      },
      // 获取 YYYY-MM-DD hh:mm:ss
      dateTime: (date = new Date()) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')

        return newMoment.format('YYYY-MM-DD hh:mm:ss')
      },
      // 获取时间戳
      timeStamp: (date = new Date()) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')
        return Date.parse(newMoment.format('YYYY/MM/DD hh:mm:ss'))
      },
      add: (d = 0, date = new Date()) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')

        return newMoment.add(d, 'd').format('YYYY-MM-DD hh:mm:ss')
      }
    }
  }
}

Vue.use(common)
