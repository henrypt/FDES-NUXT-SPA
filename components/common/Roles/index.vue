<template>
  <div class="page">
    <v-select
      v-if="roles"
      v-model="selected"
      :items="roles"
      item-color="primary"
      label="角色 *"
      dense
      hide-details
      persistent-hint
      required
      :error-messages="rolesErrors"
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
  name: 'Roles',
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
      selected: null,
      roles: []
    }
  },
  computed: {
    rolesErrors(){
      const errors = []
      if( !this.$v.selected.$dirty ) { return errors }
      !this.$v.selected.required && errors.push('请选择角色.')
      return errors
    }
  },
  watch: {
    async selected(){
      const self = this
      const current = self.roles.find((item)=>item.value===self.selected)
      if( self.selected ){
        if(this.userid===-1){
          this.$emit('vModel', current)
        }
        else if( self.userid && current ) {
          const params = {
            key: 'users/roles',
            id: self.userid,
            info: current // // {text: "VIP", value: 6}
          }

          await self.$store.dispatch('system/UpdateSystemInfo', params)
          // self.$emit('update')
        }
      }
    }
  },
  mounted(){
    this.roles = this.$store.state.system.info.roles

    if( this.msg ) {
      this.selected = this.msg
    }
  },
  methods:{
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
