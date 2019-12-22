<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="movie.poster_path" :src="posterUrl + movie.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/movie/ + movie.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="{ path: `movie/${movie.id}` }">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{
          movie.original_title
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ getHumanDate(movie.release_date) }}
          {{ getHumanDate(watchedAt) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        v-if="watched"
        light
        color="cyan"
        @click="setMovieAsNotWatched"
        :loading="loading"
      >
        <v-icon>mdi-check-all</v-icon>
      </v-btn>
      <v-btn v-if="!watched" dark @click="setMovieAsWatched" :loading="loading">
        <v-icon>mdi-check-bold</v-icon>
      </v-btn>
      <v-spacer />
      <CheckWatchList :media="movie" :mediaType="'movie'"></CheckWatchList>
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "./CheckWatchList";
import { mapState } from "vuex";

import firestore from "@/firebase/firestore";
import moment from "moment";

export default {
  components: {
    CheckWatchList
  },
  props: {
    movie: Object
  },
  data() {
    return {
      loading: false,
      watched: false,
      watchedAt: null,
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
    checkMovieWatchState() {
      this.loading = true;
      firestore
        .collection("movie")
        .get()
        .then(snapshot => {
          snapshot.forEach(snapMovie => {
            if (snapMovie.id == this.movie.id.toString()) {
              this.watched = snapMovie.data().watched;
              this.watchedAt = snapMovie.data().watchedAt;
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setMovieAsWatched() {
      this.loading = true;
      firestore
        .collection("movie")
        .doc(this.movie.id.toString())
        .set({
          media_id: this.movie.id,
          watched: true,
          watchedAt: new Date(Date.now()),
          title: this.movie.original_title
        })
        .then(() => {
          this.watched = true;
          this.watchedAt = new Date(Date.now());
          console.log(this.watchedAt);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setMovieAsNotWatched() {
      this.loading = true;
      firestore
        .collection("movie")
        .doc(this.movie.id.toString())
        .delete()
        .then(() => {
          this.watched = false;
          this.watchedAt = null;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.checkMovieWatchState();
  },
  computed: mapState(["posterUrl"])
};
</script>
