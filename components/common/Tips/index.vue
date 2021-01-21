<template>
  <v-snackbar
    v-if="snackbar"
    v-model="snackbar"
    dark
    color="secondary"
    multi-line
    :timeout="showTime"
    class="text--primary"
  >
    <strong>{{ text }}</strong>
    <v-btn color="red" text @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    txt: {type:String, default:'', required:false},
    show: {type:Boolean, default:false, required:false},
    time: {type:[Number, String], default: null, required: false}
  },
  data () {
    return {
      snackbar: false,
      text: '',
      showTime: null,
    }
  },
  mounted(){
    this.snackbar = this.show
    this.text = this.txt
    this.showTime = this.time || 5000
  },
  methods:{
    open(txt, time){
      const self = this
      if(txt) {
        self.text = txt
      }
      if(time){
        self.showTime = time
      }
      self.snackbar = true
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
