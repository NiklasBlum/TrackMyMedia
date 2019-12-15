<template>
  <v-pagination
    v-model="page"
    :length="10"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
  ></v-pagination>
</template>

<script>
export default {
  data() {
    return {
      page: 1
    };
  },
  watch: {
    page() {
      this.$emit("pageChanged", this.page);
    }
  }
};
</script>
