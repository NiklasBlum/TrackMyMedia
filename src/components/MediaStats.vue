<template>
  <v-card class="black">
    <v-card-title class="blue">Statistik</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row class="text-center">
          <v-col cols="12" v-if="id != null">
            <v-chip>
              <v-icon left>mdi-identifier</v-icon>
              {{ id }}
            </v-chip>
          </v-col>
          <v-col cols="12" v-if="runtime != null">
            <v-chip>
              <v-icon left>mdi-timer</v-icon>
              {{ runtime }} min
            </v-chip>
          </v-col>
          <v-col cols="12" v-if="releaseState != null">
            <v-chip>
              <v-icon left>mdi-bell-ring-outline</v-icon>
              {{ releaseState }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
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
