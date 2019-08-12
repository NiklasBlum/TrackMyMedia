<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs5 sm5 md2>
        <MovieCard v-if="movie" :movie="movie" />
      </v-flex>
      <v-flex xs12 sm7 md10>
        <v-card v-if="this.movie" dark flat color="blue-grey darken-2">
          <v-card-title>
            <h1>{{this.movie.title}}</h1>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>{{this.movie.overview}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-container fluid>
      <v-layout row justify-center align-center>
        <v-flex xs12>
          <v-tabs v-model="tab" icons-and-text background-color="transparent" fixed-tabs>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#trailer">
              Trailer
              <v-icon>mdi-movie</v-icon>
            </v-tab>
            <v-tab href="#info">
              Infos
              <v-icon>mdi-information-outline</v-icon>
            </v-tab>
          </v-tabs>
        </v-flex>
        <v-flex>
          <v-layout v-show="tab == 'trailer'" justify-center>
            <v-flex xs12 lg8>
              <youtube :video-id="trailerId" resize fitParent></youtube>
            </v-flex>
          </v-layout>

          <v-layout v-show="tab == 'info'" justify-center>
            <v-flex>
              <v-chip large v-if="this.movie">
                <v-icon left>mdi-timer</v-icon>
                {{movie.runtime}} min
              </v-chip>
            </v-flex>
            <v-flex>
              <v-chip large v-if="this.movie">
                <v-icon left>mdi-bell-ring-outline</v-icon>
                {{movie.status}}
              </v-chip>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import CheckWatchList from "../components/CheckWatchList";
import MovieCard from "@/components/MovieCard";
export default {
  components: {
    CheckWatchList,
    MovieCard
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
          console.log(this.movie);
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
    "language",
    "posterUrlOrg"
  ])
};
</script>
