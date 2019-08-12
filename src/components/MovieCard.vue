<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="movie.poster_path" :src="posterUrl + movie.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/movie/  + movie.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="{path: `movie/${movie.id}`}">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{movie.original_title}}</v-list-item-title>
        <v-list-item-subtitle>{{movie.release_date}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-if="watched" color="cyan" @click="setMovieAsNotWatched">
        <v-icon>mdi-check-all</v-icon>
      </v-btn>
      <v-btn v-if="!watched" @click="setMovieAsWatched">
        <v-icon>mdi-check-bold</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <CheckWatchList v-if="movie" :media="movie"></CheckWatchList>
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "./CheckWatchList";
import { mapState } from "vuex";
import db from "@/firebase/init";

export default {
  components: {
    CheckWatchList
  },
  props: {
    movie: Object
  },
  data() {
    return {
      watched: false,
      notFoundPic: require("../assets/no-image.png")
    };
  },
  methods: {
    checkMovieWatchState() {
      db.collection("movie")
        .get()
        .then(snapshot => {
          snapshot.forEach(snapMovie => {
            if (snapMovie.id == this.movie.id.toString()) {
              this.watched = snapMovie.data().finished;
            }
          });
        });
    },
    setMovieAsWatched() {
      db.collection("movie")
        .doc(this.movie.id.toString())
        .set({
          finished: true,
          title: this.movie.original_title
        })
        .then((this.watched = true));
    },
    setMovieAsNotWatched() {
      db.collection("movie")
        .doc(this.movie.id.toString())
        .delete()
        .then((this.watched = false));
    }
  },
  created() {
    this.checkMovieWatchState();
  },
  computed: mapState(["posterUrl"])
};
</script>

