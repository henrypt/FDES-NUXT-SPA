<template>
  <v-app class="page_welcome">
    <v-flex>
      <v-app-bar color="rgba(0,0,0,0.1)" dense height="70">
        <v-list color="rgba(0,0,0,0.01)" min-width="100%">
          <template v-if="system && system.info">
            <v-list-item dense>
              <v-list-item-avatar size="50">
                <v-img
                  :src="system.info.logoInfo.img"
                  :alt="system.info.name"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  class="title secondary--text"
                  v-text="system.info.name"
                ></v-list-item-title>
                <v-list-item-subtitle
                  class="subtitle-1 info--text font-italic"
                  v-text="system.info.enname"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-app-bar>
      <v-container fluid>
        <v-row dense>
          <v-col>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>

      <Footer />
    </v-flex>
  </v-app>
</template>

<script>
// import Cookie from 'js-cookie'
import { mapState, mapGetters } from 'vuex'

import Footer from '@/components/common/Footer'
export default {
  components: { Footer },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      system: (state) => state.system,
      user: (state) => state.user,
      roles: (state) => state.roles
    }),
    ...mapGetters('user', ['isLoggedIn']),
    isGuest() {
      if (this.$store.state.user.info) {
        return this.$store.state.user.info.id === 1 // this.$store.state.user.info.id.toString().toLowerCase() === 'guest'
      }
      return false
    }
  },
  created() {},
  mounted() {
    // if (Cookie) {
    //   if (!this.$store.state.token.authorization) {
    //     const _token = Cookie.get('token')
    //     this.$store.commit('setToken', _token)
    //   }
    // }
  },
  methods: {}
}
</script>

<style scoped>
.page_welcome {
  background-image: url('/img/welcome.jpg');
  background-size: cover;
}

.transparentBg01 {
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
