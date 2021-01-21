<template>
  <v-breadcrumbs
    v-if="breadcrumbsInfo.length > 1"
    :items="breadcrumbsInfo"
    divider="/"
  ></v-breadcrumbs>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Breadcrumbs',
  data(){
    return {
      menu: null,
      breadcrumbsInfo: []
    }
  },
  computed:{
    menuInfo(){
      const self = this
      return self.menu
    }
  },
  created(){
    const self = this
    self.menu = self.$store.state.menu.info
  },
  mounted(){

    const self = this
    const paths = self.$route.fullPath.split('/') || []

    for(let i=0,iLen=paths.length; i<iLen; i++){
      if(paths[i]===''){
        self.breadcrumbsInfo = [{
          text: '首页',
          href: '/',
          disabled: true
        }]
      }
      else{
        // 一级菜单
        for(let j=0,jLen=self.menuInfo.length; j<jLen; j++){
          const class1 = self.menuInfo[j] || null

          if( class1.to.includes('/'+paths[i]) ){
            self.setBreadcrumbs(class1, iLen)
            if(typeof paths[i+1]==='undefined' && paths.length>1 && class1.subMenu.length>0){
              self.setBreadcrumbs(class1.subMenu[0], 1)
            }
            else{
              // 二级菜单
              class1.subMenu.find(item=>{
                if(item.to.includes('/'+paths[i+1])){
                  self.setBreadcrumbs(item, iLen)
                }
              })
            }
            break
          }

        }
      }
    }
  },
  methods:{
    setBreadcrumbs(item, pathsLen){
      const self = this
      if(item && pathsLen){
        const len = self.breadcrumbsInfo.length || 1

        self.breadcrumbsInfo.push({
          disabled: false,
          href: (len<pathsLen-1) ? '..'+item.to : '',
          text: item.desc
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>> div.v-breadcrumbs__item
  color: rgba(255, 255, 255, 0.9);
</style>
