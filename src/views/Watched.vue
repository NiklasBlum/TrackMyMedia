<template>
  <v-container grid-list-lg>
    <v-layout column align-center>
      <v-flex>
        <MediaFilter @currentMediaChanged="getMediaFromFireStore" />
      </v-flex>
    </v-layout>
    <div v-if="currentMedia == 'tv'">
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="show in tmdbMedia" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia == 'movie'">
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in tmdbMedia" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import db from "@/firebase/init";
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
import MediaFilter from "@/components/MediaFilter.vue";
export default {
  components: {
    MovieCard,
    SeriesCard,
    MediaFilter
  },
  data() {
    return {
      fireBaseMedia: [],
      tmdbMedia: []
    };
  },
  methods: {
    getMediaFromFireStore() {
      this.tmdbMedia = [];
      this.fireBaseMedia = [];
      db.collection(this.currentMedia)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().watched == true) {
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
  created() {
    this.getMediaFromFireStore();
  },
  computed: mapState([
    "baseUrl",
    "posterUrl",
    "currentMedia",
    "apiKey",
    "language"
  ])
};
</script>
