<template>
  <v-card shaped>
    <v-card-title class="blue mb-3">Statistik</v-card-title>
    <v-card-text>
      <v-chip large>
        <v-icon left>mdi-timer</v-icon>
        {{ runtime }} min
      </v-chip>
      <v-chip large>
        <v-icon left>mdi-bell-ring-outline</v-icon>
        {{ releaseState }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    runtime: Number,
    releaseState: String
  }
};
</script>
