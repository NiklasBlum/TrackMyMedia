<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-container fluid>
      <v-layout row justify-center>
        <v-flex xs12 sm5 md4 lg3 align-self-center grow>
          <v-img
            v-if="this.episode.still_path"
            :src="this.posterUrlOrg + this.episode.still_path"
          ></v-img>
        </v-flex>
        <v-flex xs12 sm12 md6 lg7>
          <v-card-title
            >{{ this.episode.episode_number }} |
            {{ this.episode.name }}</v-card-title
          >
          <v-card-text>{{ this.episode.overview }}</v-card-text>
        </v-flex>
        <v-flex xs12 sm12 md2 lg2>
          <v-btn
            v-if="!watched"
            block
            height="100%"
            @click="setEpisodeAsWatched"
          >
            <v-icon large>mdi-check-all</v-icon>
          </v-btn>
          <v-btn
            v-if="watched"
            block
            height="100%"
            @click="setEpisodeAsNotWatched"
          >
            <v-icon large>mdi-cancel</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/config";

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
      db.collection("tv")
        .doc(this.episode.show_id.toString())
        .collection("seasons")
        .doc(this.episode.season_number.toString())
        .collection("episodes")
        .get()
        .then(snapshot => {
          snapshot.forEach(snapEpisode => {
            if (snapEpisode.id == this.episode.episode_number.toString()) {
              this.watched = true;
            }
          });
        });
      // snapshot.forEach(snapSeason => {
      //   if (snapSeason.id == this.season.season_number) {
      //     let currentSeason = snapSeason.data();
      //     currentSeason.id = snapSeason.id;
      //     currentSeason.finished = snapSeason.data().finished;
      //     this.watched = snapSeason.data().finished;
      //     this.mySeason = currentSeason;
      //   }
      // });
    },
    setEpisodeAsWatched() {
      db.collection("tv")
        .doc(this.episode.show_id.toString())
        .collection("seasons")
        .doc(this.episode.season_number.toString())
        .collection("episodes")
        .doc(this.episode.episode_number.toString())
        .set({})
        .then((this.watched = true));
    },
    setEpisodeAsNotWatched() {
      db.collection("tv")
        .doc(this.episode.show_id.toString())
        .collection("seasons")
        .doc(this.episode.season_number.toString())
        .collection("episodes")
        .doc(this.episode.episode_number.toString())
        .delete()
        .then((this.watched = false));
    }
  },
  created() {
    this.CheckWatchStateEpisode();
  },
  computed: mapState(["posterUrlOrg"])
};
</script>
