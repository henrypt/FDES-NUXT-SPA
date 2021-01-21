<template>
  <div class="search">
    <v-text-field
      outlined
      placeholder="search info"
      label="Searching"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {}
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.search >>> .v-input__control
  height: 0.65rem;

@media (min-width: 1200.00001px)
  .search >>> .v-input__control
    height: 0.5rem;
</style>
