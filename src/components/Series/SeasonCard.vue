<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <PosterImage
      :imagePath="season.poster_path"
      :routePath="/show/ + show.id + /season/ + season.season_number"
    />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ season.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ getGermanDate(season.air_date) }}</v-list-item-subtitle>
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
      <v-btn v-if="!watched" block @click="setSeasonAsWatched" :loading="loading">
        <v-icon large>mdi-check-bold</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/config";
import dateFormatter from "@/dateFormatter";
import PosterImage from "@/components/PosterImage.vue";
export default {
  components: {
    PosterImage
  },
  props: {
    season: Object,
    show: Object
  },
  data() {
    return {
      loading: false,
      watched: false,
      mySeason: null,
      notFoundPic: require("@/assets/no-image.png")
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
    checkWatchStateSeason() {
      this.loading = true;
      this.dbRef
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
      this.dbRef
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
      this.dbRef
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
  computed: {
    ...mapState(["posterUrl", "user"]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection("tv")
        .doc(this.show.id.toString())
        .collection("seasons");
    }
  }
};
</script>
