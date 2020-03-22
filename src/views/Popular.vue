<template>
  <v-container grid-list-lg fluid>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getPopular" />
      </v-col>
    </v-row>
    <div v-if="currentMedia === 'tv'">
      <v-layout row align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="show in media" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-layout row align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
    <v-layout mt-5>
      <Pagination @pageChanged="pageChanged" v-show="showPagination" />
    </v-layout>
  </v-container>
</template>

<script>
import Pagination from "@/components/Navigation/Pagination.vue";
import MediaFilter from "@/components/MediaFilter";
import MovieCard from "@/components/Movie/MovieCard.vue";
import SeriesCard from "@/components/Series/SeriesCard.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    MovieCard,
    SeriesCard,
    MediaFilter,
    Pagination
  },
  data() {
    return {
      media: null,
      showPagination: false,
      page: 1
    };
  },
  methods: {
    pageChanged(page) {
      this.page = page;
      this.getPopular();
    },
    getPopular() {
      this.showPagination = false;
      this.media = null;
      let searchQuery = `${this.baseUrl}${this.currentMedia}/popular?api_key=${this.apiKey}&language=${this.language}&page=${this.page}`;
      axios
        .get(searchQuery)
        .then(response => {
          this.media = response.data.results;
        })
        .finally(() => {
          this.showPagination = true;
        });
    }
  },
  created() {
    this.getPopular();
  },
  computed: mapState(["baseUrl", "apiKey", "currentMedia", "language"])
};
</script>
