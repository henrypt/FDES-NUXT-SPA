<template>
  <v-dialog
    ref="dialogDatepicker"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="msg"
        locale="zh-cn"
        :label="title"
        prepend-inner-icon="mdi mdi-timer"
        color="primary"
        readonly
        dense
        hide-details
        class="datepicker_text_field"
        v-on="on"
        @change="DateChange()"
      ></v-text-field>
      <label v-if="labelText" id="labelText">{{ labelText }}</label>
    </template>

    <v-date-picker v-model="date" locale="zh-cn" @input="DateChange()">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">关闭</v-btn>
      <v-btn text color="primary" @click="$refs.dialogDatepicker.save(date)">
        确定
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  model: {
    prop: 'msg',
    event: 'vModel'
  },
  props: {
    msg: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    labelText: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      hour: '00',
      minute: '00',
      second: '00',
      time: {
        hours: [],
        minutes: [],
        seconds: []
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    DateChange() {
      const self = this
      const d = self.date
      window.console.log('Datepicker => ', d)
      self.$emit('vModel', d)
      self.modal = false
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
#title
  color: info
  font-size: 9pt
  float:left

.v-input
  max-width: 105px
  margin: 0px 0px 0px 0px
  >>> .v-icon.v-icon
    font-size: 18px !important
    margin-top: 0px !important

.datepicker_text_field
  width:120px
  font-size:14px
  padding-top:4px
  margin-right:5px

#labelText
  text-align: left;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  padding: 6px 2px 0 0;

>>> .v-date-picker-title__date
  div
    font-size: 18px !important
</style>
