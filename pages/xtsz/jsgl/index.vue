<template>
  <v-row justify="center">
    <v-col
      v-for="item in roles"
      :key="item.name"
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <v-card class="mx-auto" max-width="280" dense nuxt>
        <v-toolbar dense flat dark short height="32" color="warning lighten-4">
          <!-- <v-btn icon small color="warning"><v-icon>mdi-close</v-icon></v-btn> -->
          <v-toolbar-title class="subtitle-2 primary--text">
            {{ item.name }}
          </v-toolbar-title>
        </v-toolbar>
        <div
          v-for="item2 in item.powers"
          :key="item2.name"
          class="px-1 pt-2 pb-0 caption"
        >
          <h3 class="blue-grey--text">{{ item2.name }}</h3>
          <v-switch
            v-for="(p, i) in item2.power"
            :key="p.name"
            v-model="p.can"
            class="secondary px-0 py-0 my-0"
            @change="updateRoleCan(item, item2, p, i)"
          >
            <template v-slot:label>
              <label class="subtitle-2">{{ p.name }}</label>
            </template>
          </v-switch>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      roles: []
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新角色' : '编辑内容'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      const self = this

      self.roles = []
      setTimeout(() => {
        self.roles = JSON.parse(JSON.stringify(self.$store.state.roles.info))
        self.loading = false
      }, 1.0 * 1000)
    },

    async updateRoleCan(item, item2, p, index) {
      window.console.log(this.roles, item, item2, p, index)
      const self = this
      self.roles.find((role) => {
        if (role.id === item.id) {
          role.powers.find((p) => {
            if (p.id === item2.id) {
              p.power[index].can = p.power[index].can ? 1 : 0
            }
          })
        }
      })

      await self.$store.dispatch('roles/UpdateRolesInfo', { info: self.roles })
      self.roles = JSON.parse(JSON.stringify(self.$store.state.roles.info))
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
