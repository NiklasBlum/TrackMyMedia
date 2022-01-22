<template>
  <v-card class="black">
    <v-card-title class="blue">Plot</v-card-title>
    <v-card-text class="pt-3">{{ this.description }} </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    description: String,
  },
};
</script>