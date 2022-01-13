<template>
  <v-card shaped class="black">
    <v-card-title class="blue mb-3">Statistik</v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-if="id != null">
          <v-chip large>
            <v-icon left>mdi-identifier</v-icon>
            {{ id }}
          </v-chip>
        </v-col>
        <v-col v-if="runtime != null">
          <v-chip large>
            <v-icon left>mdi-timer</v-icon>
            {{ runtime }} min
          </v-chip>
        </v-col>
        <v-col v-if="releaseState != null">
          <v-chip large>
            <v-icon left>mdi-bell-ring-outline</v-icon>
            {{ releaseState }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    id: Number,
    runtime: Number,
    releaseState: String,
  },
};
</script>
