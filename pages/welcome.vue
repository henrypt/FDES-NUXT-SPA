<!-- page info:  -->
<template>
  <div>
    <v-row justify-center class="px-sm-1 px-md-10 px-lg-10">
      <v-col cols="6" sm="12" md="5" lg="5">
        <FaultStatistics />
      </v-col>
      <v-col cols="6" sm="12" md="5" lg="5">
        <Login ref="loginComponent" :show-close="false" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Login from '~/components/Login/login.vue'
import FaultStatistics from '~/components/common/Chart/FaultStatistics'

export default {
  layout: 'welcome',
  // import引入的组件需要注入到对象中才能使用
  components: { Login, FaultStatistics },
  data() {
    // 这里存放数据
    return {
      title: 'FDES Welcome Page'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // store.getters.user.isLoggedIn
    const self = this
    const isLoggedIn = self.$store.getters['user/isLoggedIn'] || false
    self.$store.dispatch('user/LoggedInState', !!isLoggedIn)

    this.hGetStateData()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // mounted
  },
  // 方法集合
  methods: {
    async hGetStateData() {
      const self = this
      await self.$store.dispatch('system/GetSystemInfo')
      await self.$store.dispatch('user/GetUserInfo')
      await self.$store.dispatch('roles/GetRolesInfo')
      this.menu = self.$store.state.menu.info // this.$t('menuClass1') || null

      // if (self.$store.state.user.info) {
      //   if (self.$store.state.user.info.id === 1) {
      //     // guest
      //     self.$refs.loginComponent.updateMenuPowerByState(self.$store.state)
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped></style>
