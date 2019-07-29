<template>
  <v-card>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4 lg10>
          <v-img v-if="this.episode.still_path" :src="this.posterUrlOrg + episode.still_path"></v-img>
        </v-flex>
        <v-flex xs12 sm8 md8>
          <v-card-title>{{this.episode.name}}</v-card-title>
          <v-card-text>{{this.episode.overview}}</v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["episode"],
  mounted() {},
  computed: mapState(["posterUrlOrg"])
};
</script>

