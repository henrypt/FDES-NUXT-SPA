<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      :items-per-page="9999"
      loading-text="加载中..."
      class="elevation-1"
      hide-default-header
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <v-icon color="success">mdi-human-handsup</v-icon>用户管理
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="blue" size="20" dark class="mb-2" v-on="on">
                新用户
              </v-btn>
            </template>
            <v-form ref="addNewUserForm" v-model="valid">
              <v-card>
                <v-card-title>
                  <span class="headline subtitle-1">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="1" sm="6" md="4" class="px-0 py-0">
                        <v-text-field
                          v-model="addName"
                          :error-messages="nameErrors"
                          required
                          autofocus
                          clearable
                          label="用户名 *"
                          @input="$v.addName.$touch()"
                          @blur="$v.addName.$touch()"
                          @keyup.enter.native="save"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="10" sm="6" md="4">
                        <Dys
                          v-model="addDynamos"
                          :userid="-1"
                          @save="save"
                        ></Dys>
                      </v-col>
                      <v-col cols="1" sm="6" md="4">
                        <Roles
                          v-model="addRoles"
                          :userid="-1"
                          @save="save"
                        ></Roles>
                      </v-col>
                    </v-row>
                  </v-container>
                  <big class="red--text ml-3">* 为必填项</big>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="save">添加</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <v-text-field
          v-model="item.name"
          label="用户名 (只读)"
          placeholder="请输入用户名"
          readonly
        ></v-text-field>
      </template>
      <template v-slot:[`item.dynamos`]="{ item }">
        <Dys v-model="item.dynamos" :userid="item.id" />
      </template>
      <template v-slot:[`item.roles`]="{ item }">
        <Roles v-model="item.roles" :userid="item.id" />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pen
        </v-icon> -->
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">重置</v-btn>
      </template> -->
    </v-data-table>

    <Tips ref="Tips" />
  </div>
</template>

<script type="text/ecmascript-6">
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import Dys from '@/components/common/DYS/index.vue'
import Roles from '@/components/common/Roles/index.vue'
import Tips from '@/components/common/Tips/'

export default {
  components: {
    Dys,
    Roles,
    Tips
  },
  mixins: [validationMixin],
  validations: {
    addName: { required, maxLength: maxLength(20) },
    addDynamos: { required },
    addRoles: { required }
  },
  data () {
    return {
      dialog: false,
      loading: true,
      headers: [
        { text: '名称', value: 'name', sortable: false, align: 'start' },
        { text: '机组', value: 'dynamos', sortable: false },
        { text: '角色', value: 'roles' },
        { text: '操作', value: 'actions', sortable: false }
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        dynamos: [],
        roles: [],
      },
      valid: null,
      addName: '',
      addDynamos: [],
      addRoles: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新用户' : '编辑内容'
    },
    nameErrors () {
      const errors = []

      if (!this.$v.addName.$dirty){ return errors }
      !this.$v.addName.maxLength && errors.push('用户名最多20个字长度')
      !this.$v.addName.required && errors.push('请填写用户名.')
      return errors
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  mounted() {

  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      const self = this

      self.users = []

      setTimeout(()=>{
        // for(let i=1; i<=10; i++){
        //   self.users.push({
        //     id: i,
        //     name: 'user '+i,
        //     dynamos: [19,20],
        //     roles: "VIP"//{"text":"VIP", "value":4}
        //   })
        // }

        // for(let i=11; i<=20; i++){
        //   this.users.push({
        //     id: i,
        //     name: 'user '+i,
        //     dynamos: [21,222,23],
        //     roles: {"text":"系统工程师", "value":2}
        //   })
        // }
        self.users = self.$store.state.system.info.users || []
        self.loading = false

      },1.0*1000)

    },

    deleteItem (item) {
      const self = this
      const index = self.users.indexOf(item)
      let current = null
      if( confirm('您确定删除此用户吗?') ){
        // self.users.splice(index, 1)
        current = self.users[index]
        if(current && current.id){
          self.$store.dispatch(
            'system/UpdateSystemInfo',
            {
              key: 'users/delete',
              id: current.id,
              info: null
            }
          )

          // self.showLogin = false
          // self.tips.show = true
          // self.tips.time = 1500
          // self.tips.txt = '删除成功'
          self.$refs.Tips.open('删除成功',1500)
        }

      }
    },

    close () {
      const self = this
      this.dialog = false
      setTimeout(() => {
        self.addName = ''
        self.addDynamos = []
        self.addRoles = []
        self.editedIndex = -1
      }, 300)
    },

    save () {
      const self = this
      if (self.editedIndex > -1) {
        // Object.assign(this.users[this.editedIndex], this.editedItem)
      }
      else {
        let newUser = null
        self.$v.$touch()
        if( !self.$v.$error ){
          newUser = {
            id: self.users.length + 1,
            name: self.addName,
            pwd: '8888',
            dynamos: self.addDynamos,
            roles: self.addRoles
          }
        }

        if(self.addName && self.addName!=='' && self.addDynamos && self.addDynamos.length>0 && self.addRoles ){
          if( newUser ){
            self.$store.dispatch(
              'system/UpdateSystemInfo',
              {
                key: 'users/add',
                info: newUser
              }
            )

            // self.showLogin = false
            // self.tips.show = true
            // self.tips.time = 1500
            // self.tips.txt = '添加成功'
            self.$refs.Tips.open('添加成功',1500)

            self.close()
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
