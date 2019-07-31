<template>
  <v-container mt-5>
    <v-layout column align-center>
      <v-flex>
        <MediaTabs @emmittedMediaChange="getWatchlist" />
      </v-flex>
    </v-layout>
    <div v-if="currentMedia === 'tv'">
      <v-layout row wrap>
        <v-flex xs6 sm3 md3 lg2 v-for="show in watchList" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-layout row wrap>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in watchList" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import MediaTabs from "@/components/MediaTabs";
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  components: {
    MediaTabs,
    MovieCard,
    SeriesCard
  },
  data() {
    return {
      watchList: [],
      localMedia: "movies"
    };
  },

  methods: {
    getWatchlist() {
      if (this.currentMedia == "movie") {
        this.localMedia = "movies";
      } else {
        this.localMedia = "tv";
      }
      let searchQuery = `${this.baseAccountUrl}${this.accountId}/watchlist/${this.localMedia}?api_key=${this.apiKey}&language=${this.language}&session_id=${this.sessionId}`;
      if (this.sortBy != "") {
        this.searchQuery += `&sort_by=${this.sortBy}`;
      }
      axios
        .get(searchQuery)
        .then(response => {
          console.log(response.data.results);
          this.watchList = response.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: mapState([
    "baseAccountUrl",
    "accountId",
    "sessionId",
    "apiKey",
    "language",
    "currentMedia"
  ]),
  created() {
    this.getWatchlist();
  }
};
</script>

