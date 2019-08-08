<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="season.poster_path" :src="posterUrl + season.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id + /season/ +season.season_number">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id + /season/ +season.season_number">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-card-title>{{season.name}}</v-card-title>
    <v-card-actions>
      <v-btn v-if="!watched" block @click="setSeasonAsWatched">
        <v-icon large>mdi-check-all</v-icon>
      </v-btn>
      <v-btn v-if="watched" block @click="setSeasonAsUnwatched">
        <v-icon large>mdi-cancel</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/init";

export default {
  props: {
    season: Object,
    show: Object
  },
  data() {
    return {
      watched: false,
      notFoundPic: require("../assets/no-image.png")
    };
  },
  methods: {
    checkWatchStateSeason() {
      db.collection("tv")
        .doc(this.show.id.toString())
        .get()
        .then(snapshot => {
          console.log(snapshot);
        });
    },
    setSeasonAsWatched() {
      this.watched = true;
    },
    setSeasonAsUnwatched() {
      this.watched = false;
    }
  },
  created() {
    this.checkWatchStateSeason();
  },
  computed: mapState(["posterUrl"])
};
</script>