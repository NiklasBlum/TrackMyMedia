<template>
  <v-container grid-list-lg fluid>
    <v-layout column align-center>
      <v-flex>
        <MediaTabs @emmittedMediaChange="getPopular" />
      </v-flex>
    </v-layout>
    <div v-if="currentMedia === 'tv'">
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="show in media" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
    <v-pagination
      v-show="showPagination"
      v-model="page"
      :length="10"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
    {{showPagination}}
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
    MovieCard,
    SeriesCard,
    MediaTabs
  },
  data() {
    return {
      media: null,
      showPagination: false,
      page: 1
    };
  },
  methods: {
    getPopular() {
      this.showPagination = false;
      this.media = null;
      let searchQuery = `${this.baseUrl}${this.currentMedia}/popular?api_key=${this.apiKey}&language=${this.language}&page=${this.page}`;
      axios
        .get(searchQuery)
        .then(response => {
          this.media = response.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    page() {
      this.getPopular();
    }
  },
  created() {
    this.showPagination = false;
    this.getPopular();
  },
  updated() {
    this.showPagination = true;
  },
  computed: mapState(["baseUrl", "apiKey", "currentMedia", "language"])
};
</script>

