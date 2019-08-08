<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-container fluid>
      <v-layout row justify-center>
        <v-flex xs12 sm5 md4 lg3 align-self-center grow>
          <v-img v-if="this.episode.still_path" :src="this.posterUrlOrg + this.episode.still_path"></v-img>
        </v-flex>
        <v-flex xs12 sm12 md6 lg7>
          <v-card-title>{{this.episode.name}}</v-card-title>
          <v-card-text>{{this.episode.overview}}</v-card-text>
        </v-flex>
        <v-flex xs12 sm12 md2 lg2>
          <v-btn v-if="!watched" block height="100%" @click="setEpisodeAsWatched">
            <v-icon large>mdi-check-all</v-icon>
          </v-btn>
          <v-btn v-if="watched" block height="100%" @click="setEpisodeAsNotWatched">
            <v-icon large>mdi-cancel</v-icon>
          </v-btn>
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
    setEpisodeAsWatched() {
      this.watched = true;
    },
    setEpisodeAsNotWatched() {
      this.watched = false;
    }
  },
  created() {

    this.CheckWatchStateEpisode();
  },
  computed: mapState(["posterUrlOrg"])
};
</script>

