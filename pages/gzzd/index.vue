<template>
  <div class="page"></div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data () {
    return {

    }
  },
  mounted() {
    this.hDefaultTo()
  },
  methods: {
    hDefaultTo(){
      const self = this
      let current = null

      const menuInfo = self.$store.state.menu.info || null

      if (menuInfo) {
        current = menuInfo.find((item) => {
          window.console.log(item.to, this.$route.path)
          if (item.to === self.$route.path) {
            return item
          }
        })

        if (current) {
          if (current.defaultTo) {
            self.$router.push(current.defaultTo) // 页面加载时跳转
          } else {
            self.$router.push(current.subMenu[0].to) // 页面加载时跳转
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
