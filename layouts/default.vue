<template>
  <v-app dark>
    <v-flex>
      <v-content class="hContent">
        <Navbar fluid />

        <!--  ml-12 -->
        <v-container id="mainContent" fluid>
          <nuxt />
        </v-container>
      </v-content>
    </v-flex>
  </v-app>
</template>

<script>
// import Cookie from 'js-cookie'

import Navbar from '@/components/common/Navbar'
export default {
  name: 'Default',
  scrollToTop: true,
  components: {
    Navbar
  },
  data() {
    return {
      title: 'FDES',
      fixed: true
    }
  },
  watch: {},
  mounted() {
    // if (Cookie) {
    //   if (!this.$store.state.token.authorization) {
    //     const _token = Cookie.get('token')
    //     this.$store.commit('setToken', _token)
    //   }
    // }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.transparentBg01
  background-color: rgba(0, 0, 0, 0.01)

.hContent
  padding: 0 !important
  margin: 0 !important

/* large desktop */
@media screen and (min-width:1200px)
  #mainContent
    padding: 2px 1px 5px 1px
    margin: 0

/* Normal desktop */
@media screen and (min-width: 960px) and (max-width: 1199px)
  #mainContent
    padding: 2px 1px 5px 1px
    margin: 0

/* Tablet desktop */
@media screen and (min-width: 768px) and (max-width: 959px)
  #mainContent
    padding: 42px 1px 5px 1px
    margin: 0

/* Large Mobile */
@media only screen and (min-width: 480px) and (max-width: 767px)
  #mainContent
    padding: 40px 0 0 0 !important;

/* small mobile */
@media screen and (min-width:375px) and (max-width:479px)
  #mainContent
    padding: 40px 0 0 0 !important;


@media screen and (min-width:360px) and (max-width:374px)
  #mainContent
    padding: 40px 0 0 0 !important;

@media screen and (max-width:359px)
  #mainContent
    padding: 40px 0 0 0;
</style>
