<template>
  <div class="login">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="loginForm" v-model="valid">
        <v-card>
          <v-card-title>
            <span class="headline teal--text">用户登录</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    :error-messages="nameErrors"
                    label="用户名 *"
                    :counter="10"
                    required
                    autofocus
                    clearable
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                    @keyup.enter.native="submit"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="用户密码 *"
                    type="password"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    @keyup.enter.native="submit"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <big class="red--text ml-3">* 为必填项</big>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gray mr-4" @click="close">关闭</v-btn>
            <v-btn color="success" @click="submit">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',

  mixins: [validationMixin],
  model: {
    prop: 'msg',
    event: 'vmodel'
  },
  props: {
    msg: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required }
  },

  data () {
    return {
      valid: null,
      username: 'henry',
      password: '8888'
    }
  },
  computed: {
    dialog(){
      return this.msg
    },
    nameErrors () {
      const errors = []

      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('用户名最多10个字长度')
      !this.$v.username.required && errors.push('请填写用户名.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('请填写用户密码')
      return errors
    }
  },
  watch: {


  },
  mounted(){

  },
  methods:{
    submit () {
      const self = this
      self.$v.$touch()

      if (!self.$v.$error) {
        this.login({
          "name": self.username,
          "pwd": self.password
        })
      }
    },
    clear () {
      // this.$v.$reset()
      this.username = ''
      this.password = ''
    },
    close() {
      // this.$router.push({path:'/'})
      // this.$router.push({path:'/'})
      this.$emit('closeLogin')
    },
    async login(params){
      const self = this
      // this.$store.dispatch('Login', {"name":objUser.name, "pwd":objUser.pwd})
      await self.$store.dispatch('user/Login', params)
      await self.$store.dispatch('initToken')
      await self.$store.dispatch('user/LoggedInState', true)

      self.close()
      self.$emit('welcomeUser')
      self.updateMenuPowerByState(self.$store.state)

      self.$router.replace({path: '/'})
    },
    async updateMenuPowerByState( state ) {
      const self = this
      if(state.user.info) {
        // 更新Vuext-state-menu-info xxx.can 处理菜单权限
        state.menu && await self.$store.dispatch('menu/UpdateMenuInfo', state.user.info.roles.text)
        // return self.menu
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
