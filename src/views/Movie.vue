<template>
  <v-parallax v-if="this.movie" :src="this.posterUrlOrg + this.movie.backdrop_path" height="100%">
    <v-container fluid grid-list-lg>
      <v-layout row wrap justify-center >
        <v-flex xs5 sm5 md2>
          <v-card>
            <v-img :src="this.posterPath"></v-img>
            <v-card-actions>
              <v-layout justify-space-around>
                <CheckWatchList v-if="this.movie" :media="this.movie" />
                <MediaWatchState v-if="this.movie" :media="this.movie" />
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm7 md10>
          <v-card dark flat color="blue-grey darken-2">
            <v-card-title>
              <h1>{{this.movie.title}}</h1>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>{{this.movie.overview}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-parallax>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import CheckWatchList from "../components/CheckWatchList";
import MediaWatchState from "@/components/MediaWatchState";

export default {
  components: {
    CheckWatchList,
    MediaWatchState
  },
  data() {
    return {
      searchQuery: "",
      movie: "",
      posterPath: require("../assets/no-image.png")
    };
  },

  created() {
    this.getDetails(this.$route.params.id);
  },
  methods: {
    getDetails(id) {
      this.searchQuery = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${this.apiKey}&language=${this.language}`;

      axios
        .get(this.searchQuery)
        .then(response => {
          this.movie = response.data;
          this.posterPath = this.posterUrl + this.movie.poster_path;
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
    "media",
    "posterUrlOrg"
  ])
};
</script>
