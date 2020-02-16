<template>
  <v-container fluid grid-list-lg>
    <v-card v-if="movie">
      <v-card-title>
        <h1>{{ movie.title }}</h1>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col xs="12" sm="4" md="3" lg="2">
            <MovieCard :movie="movie" />
          </v-col>
          <v-col>
            <v-card shaped class="black mb-3">
              <v-card-title>Plot</v-card-title>
              <v-card-text>
                {{ this.movie.overview }}
              </v-card-text>
            </v-card>
            <MovieStats :runtime="movie.runtime" :releaseState="movie.status" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <MovieTrailer :trailerId="trailerId" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import MovieCard from "@/components/MovieCard";
import MovieStats from "@/components/Movie/MovieStats.vue";
import MovieTrailer from "@/components/Movie/MovieTrailer.vue";

export default {
  components: {
    MovieCard,
    MovieStats,
    MovieTrailer
  },
  data() {
    return {
      tab: null,
      movie: null,
      posterPath: require("../assets/no-image.png"),
      trailer: false,
      trailerId: null
    };
  },
  created() {
    this.getDetails(this.$route.params.id);
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
