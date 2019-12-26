<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="season.poster_path" :src="posterUrl + season.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn
                large
                :to="/show/ + show.id + /season/ + season.season_number"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn
                large
                :to="/show/ + show.id + /season/ + season.season_number"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          season.name
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ getHumanDate(season.air_date) }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
        v-if="watched"
        light
        color="cyan"
        block
        @click="setSeasonAsNotWatched"
        :loading="loading"
      >
        <v-icon large>mdi-check-all</v-icon>
      </v-btn>
      <v-btn
        v-if="!watched"
        block
        @click="setSeasonAsWatched"
        :loading="loading"
      >
        <v-icon large>mdi-check-bold</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/config";
import moment from "moment";

export default {
  props: {
    season: Object,
    show: Object
  },
  data() {
    return {
      loading: false,
      watched: false,
      mySeason: null,
      notFoundPic: require("../assets/no-image.png")
    };
  },
  methods: {
    getHumanDate(date) {
      if (date) {
        if (date.seconds) {
          return moment(date.seconds * 1000).format("DD.MM.YYYY");
        } else {
          return moment(date).format("DD.MM.YYYY");
        }
      } else {
        return null;
      }
    },
    checkWatchStateSeason() {
      this.loading = true;
      db.collection("users")
        .doc(this.user.uid)
        .collection("tv")
        .doc(this.show.id.toString())
        .collection("seasons")
        .get()
        .then(snapshot => {
          snapshot.forEach(snapSeason => {
            if (snapSeason.id == this.season.season_number) {
              let currentSeason = snapSeason.data();
              currentSeason.id = snapSeason.id;
              currentSeason.finished = snapSeason.data().finished;
              this.watched = snapSeason.data().finished;
              this.mySeason = currentSeason;
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setSeasonAsWatched() {
      this.loading = true;
      db.collection("users")
        .doc(this.user.uid)
        .collection("tv")
        .doc(this.show.id.toString())
        .collection("seasons")
        .doc(this.season.season_number.toString())
        .set({
          finished: true
        })
        .then((this.watched = true))
        .finally(() => {
          this.loading = false;
        });
    },
    setSeasonAsNotWatched() {
      this.loading = true;
      db.collection("users")
        .doc(this.user.uid)
        .collection("tv")
        .doc(this.show.id.toString())
        .collection("seasons")
        .doc(this.season.season_number.toString())
        .update({
          finished: false
        })
        .then((this.watched = false))
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.checkWatchStateSeason();
  },
  computed: mapState(["posterUrl", "user"])
};
</script>
