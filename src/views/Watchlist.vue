<template>
  <v-container fluid grid-list-lg>
    <v-layout column align-center>
      <v-flex>
        <MediaFilter @currentMediaChanged="getWatchlistFromFirestore" />
      </v-flex>
    </v-layout>
    <div v-if="currentMedia === 'tv'">
      <v-layout row wrap justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="show in tmdbMedia" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-layout row wrap justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in tmdbMedia" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import MediaFilter from "@/components/MediaFilter";
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
import axios from "axios";
import { mapState } from "vuex";
import db from "@/firebase/config";
export default {
  components: {
    MediaFilter,
    MovieCard,
    SeriesCard
  },
  data() {
    return {
      fireBaseMedia: [],
      tmdbMedia: []
    };
  },
  methods: {
    getWatchlistFromFirestore() {
      this.tmdbMedia = [];
      this.fireBaseMedia = [];
      db.collection("users")
        .doc(this.user.uid)
        .collection("watchlist")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (
              doc.data().media_type == this.currentMedia &&
              doc.data().watchlist == true
            ) {
              this.fireBaseMedia.push(doc.data());
              this.getMediaFromTmdb(doc.data().media_id);
            }
          });
        });
    },
    getMediaFromTmdb(id) {
      let query = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${this.apiKey}&language=${this.language}`;
      axios
        .get(query)
        .then(response => {
          this.tmdbMedia.push(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: mapState([
    "baseUrl",
    "posterUrl",
    "currentMedia",
    "apiKey",
    "language",
    "user"
  ]),
  created() {
    this.getWatchlistFromFirestore();
  }
};
</script>
