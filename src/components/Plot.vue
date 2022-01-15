<template>
  <v-card class="black mb-3">
    <v-card-title class="blue mb-3">Plot</v-card-title>
    <v-card-text>{{ this.description }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    description: String,
  },
};
</script>
