<template>
  <!-- <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      Page Contents
    </v-flex>
  </v-layout> -->
  <v-layout id="henryLayout" column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-row class="fill-height">
        <v-col>
          <div class="text-center justify-center">
            <Loading />
          </div>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import Loading from '@/components/common/Loading'
export default {
  components: { Loading },
  fetch({ app, store, req }) {
    // await store.dispatch('system/GetSystemInfo')
    // const result = await reqToken()
    // if (result.code === 200) {
    //   store.commit('setToken', result.Authorization)
    // }
  },
  async asyncData({ redirect, $axios }) {
    // redirect('/ztjc/ztzs')
  },
  watch: {
    $route(to, from) {
      // this.$router.go(0)
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {
    // this.$axios
    //   .$get('https://yesno.wtf/api')
    //   .then((res) => {
    //     window.console.log('$get success', res)
    //   })
    //   .catch((err) => {
    //     window.console.log('$get error: ', err.message)
    //   })
  },
  methods: {
    async getPageData() {
      let to = null

      // if (window.sessionStorage) {
      //   to = window.sessionStorage.getItem('FDES').system.info.home.to
      // }
      const store = this.$store

      if (to) {
      } else {
        await store.dispatch('system/GetSystemInfo')
        // await store.dispatch('user/GetUserInfo')
        // await store.dispatch('roles/GetRolesInfo')

        if (!store.state.token.authorization) {
          to = store.state.system.info.home.welcome || '/'
        } else {
          // Default Page Path from vuex - system.info.home.to
          to = store.state.system.info.home.to || '/'
        }
      }

      this.$router.push(to) // 页面加载时跳转
    }
  }
}
</script>
