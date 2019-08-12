<template>
  <v-container fluid grid-list-lg>
    <v-layout column align-center>
      <v-flex>
        <MediaTabs @emmittedMediaChange="getWatchlist" />
      </v-flex>
    </v-layout>
    <div v-if="currentMedia === 'tv'">
      <v-layout row wrap justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="show in watchlist" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-layout row wrap justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in watchlist" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
    <v-layout mt-5>
      <v-pagination
        v-show="showPagination"
        v-model="page"
        :length="10"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-layout>
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
      watchlist: null,
      localMedia: "movies",
      page: 1,
      showPagination: false
    };
  },
  watch: {
    page() {
      this.getWatchlist();
    }
  },
  methods: {
    getWatchlist() {
      this.showPagination = false;
      this.watchlist = null;
      if (this.currentMedia == "movie") {
        this.localMedia = "movies";
      } else {
        this.localMedia = "tv";
      }
      let searchQuery = `${this.baseAccountUrl}${this.accountId}/watchlist/${this.localMedia}?api_key=${this.apiKey}&language=${this.language}&session_id=${this.sessionId}&page=${this.page}`;

      axios
        .get(searchQuery)
        .then(response => {
          this.watchlist = response.data.results;
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
  },
  updated() {
    this.showPagination = true;
  }
};
</script>

