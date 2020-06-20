<template>
  <div>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getPopular" />
      </v-col>
    </v-row>
    <div v-if="currentMedia === 'tv'">
      <v-row>
        <v-col sm="6" md="4" lg="3" v-for="show in media" :key="show.id">
          <SeriesCard :show="show" />
        </v-col>
      </v-row>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-row class="align-center justify-space-around">
        <v-col sm="6" md="4" lg="3" v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>
    </div>
    <v-layout mt-5>
      <Pagination @pageChanged="pageChanged" v-show="showPagination" />
    </v-layout>
  </div>
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
