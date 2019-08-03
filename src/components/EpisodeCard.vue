<template>
  <v-card>
    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs12 sm3 md3 lg10>
          <v-img v-if="this.episode.still_path" :src="this.posterUrlOrg + episode.still_path"></v-img>
        </v-flex>
        <v-flex xs12 sm8 md8>
          <v-card-title>{{this.episode.name}}</v-card-title>
          <v-card-text>{{this.episode.overview}}</v-card-text>
        </v-flex>
        <v-flex xs12 sm1 md1>
          <v-btn block>test</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/init";

export default {
  props: {
    episode: Object
  },
  data() {
    return {
      watched: null
    };
  },
  methods: {
    CheckWatchStateEpisode() {
      db.collection("series")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let docSeries = doc.data();
            docSeries.id = doc.id;
            console.log(docSeries);
          });
        });
    },
    setEpisodeAsWatched() {},
    setEpisodeAsNotWatched() {}
  },
  created() {
    console.log(this.episode);
    this.CheckWatchStateEpisode();
  },
  computed: mapState(["posterUrlOrg"])
};
</script>

