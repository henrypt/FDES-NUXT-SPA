<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn icon color="white" v-on="on" @click="exportExcel">
        <v-icon normal>mdi-microsoft-excel</v-icon>
      </v-btn>
    </template>
    <span>导出</span>
  </v-tooltip>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  components: {},
  props: {
    id: {
      type: String,
      default: 'Table'
    },
    name: {
      type: String,
      default: 'Table'
    }
  },
  data() {
    return {}
  },
  methods: {
    // 导出Excel表格
    exportExcel() {
      const xlsxParam = { raw: true }
      const wb = XLSX.utils.table_to_book(
        document.querySelector('#' + this.id),
        xlsxParam
      )
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          this.name + '.xlsx'
        )
      } catch (e) {
        if (typeof window.console !== 'undefined') {
          window.console.log(e, wbout)
        }
      }
      return wbout
    }
  }
}
</script>
