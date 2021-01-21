<template>
  <div class="page">
    <v-select
      v-if="items"
      v-model="selected"
      :items="items"
      item-color="primary"
      label="机组 *"
      multiple
      dense
      small-chips
      hide-details
      persistent-hint
      required
      :error-messages="dynamosErrors"
      @input="$v.selected.$touch()"
      @blur="$v.selected.$touch()"
      @keyup.enter.native="$emit('save')"
    ></v-select>
  </div>
</template>

<script type="text/ecmascript-6">
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  export default {
    name: 'DYS',
    components: {

    },
    mixins: [validationMixin],
    validations: {
      selected: { required }
    },
    model: {
      prop: 'msg',
      event: 'vModel'
    },
    props: {// ['msg','userid'],
      msg: {
        type: undefined,
        default: (r) => { return r},
        required: false
      },
      userid: {
        type: Number,
        default: -1,
        required: false
      }
    },
    data () {
      return {
        selected: [],
        items: []// ['D1','D2','D3','D4','L1','L2','L3','L4'],
      }
    },
    computed: {
      dynamosErrors(){
        const errors = []
        if( !this.$v.selected.$dirty ) { return errors }
        !this.$v.selected.required && errors.push('请选择机组.')
        return errors
      }
    },
    watch: {
      async selected(){
        const self = this
        if( self.selected ){
          if(this.userid===-1){
            this.$emit('vModel', self.selected)
          }
          else if( self.userid && self.msg ) {
            const params = {
              key: 'users/dys',
              id: self.userid,
              info: self.selected
            }
            await self.$store.dispatch('system/UpdateSystemInfo', params)
          }
        }
      }
    },
    mounted(){
      const self = this
      const system = this.$store.state.system
      const station = system.info.stations.items
      station.forEach(i=>{
        i.children.forEach(child => {
          self.items.push({
            "text": child.shortName,
            "value": child.id
          })
        })
      })

      // this.items = []
      if( self.msg ) {
        self.selected = self.msg
      }
    },
    methods: {
      async updateSelect(){

      }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
