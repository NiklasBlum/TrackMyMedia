<template>
  <v-container fluid grid-list-lg>
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
              <v-card-text>
                {{ this.movie.overview }}
              </v-card-text>
            </v-card>
            <MovieStats :runtime="movie.runtime" :releaseState="movie.status" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Trailer :trailerId="trailerId" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import MovieCard from "@/components/Movie/MovieCard";
import MovieStats from "@/components/Movie/MovieStats.vue";
import Trailer from "@/components/Trailer.vue";

export default {
  components: {
    MovieCard,
    MovieStats,
    Trailer,
  },
  data() {
    return {
      tab: null,
      movie: null,
      posterPath: require("@/assets/no-image.png"),
      trailer: false,
      trailerId: null,
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
        .then((response) => {
          this.movie = response.data;
          this.posterPath = this.posterUrl + this.movie.poster_path;
          this.trailerId = this.movie.videos.results[0].key;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: mapState([
    "baseUrl",
    "posterUrl",
    "currentMedia",
    "apiKey",
    "language",
  ]),
};
</script>
