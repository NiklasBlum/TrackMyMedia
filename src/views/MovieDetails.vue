<template>
  <v-card v-if="movie">
    <v-card-title>
      <div class="display-1">{{ movie.title }}</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4" md="3" lg="3">
          <MovieCard :movie="movie" />
        </v-col>
        <v-col>
          <v-card shaped class="black mb-3">
            <v-card-title class="blue mb-3">Plot</v-card-title>
            <v-card-text>{{ this.movie.overview }}</v-card-text>
          </v-card>
          <MediaStats :runtime="movie.runtime" :releaseState="movie.status" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Trailer :trailerId="trailerId" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Reviews :reviews="reviews" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import MovieCard from "@/components/Movie/MovieCard";
import MediaStats from "@/components/MediaStats.vue";
import Trailer from "@/components/Trailer.vue";
import TmdbService from "@/services/TmdbService";
import Reviews from "@/components/Reviews.vue";

export default {
  components: {
    MovieCard,
    MediaStats,
    Trailer,
    Reviews
  },
  data() {
    return {
      tab: null,
      movie: null,
      posterPath: require("@/assets/no-image.png"),
      trailer: false,
      trailerId: null,
      reviews: []
    };
  },
  created() {
    this.getDetails(this.$route.params.id);
    this.getReviews(this.$route.params.id);
  },
  methods: {
    getDetails(id) {
      let searchQuery = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${this.apiKey}&language=${this.language}&append_to_response=videos`;
      axios
        .get(searchQuery)
        .then(response => {
          this.movie = response.data;
          this.posterPath = this.posterUrl + this.movie.poster_path;
          this.trailerId = this.movie.videos.results[0].key;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getReviews(id) {
      this.reviews = await TmdbService.getReviews("movie", id);
    }
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
