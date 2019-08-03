<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm4 md2>
        <v-img :src="this.posterPath"></v-img>
      </v-flex>

      <v-flex xs12 sm8 md10>
        <v-card dark flat color="blue-grey darken-2">
          <v-card-title>
            <h1>{{this.movie.title}}</h1>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>{{this.movie.overview}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm5>
        <CheckWatchList v-if="this.movie" :media="this.movie" />
        <MediaWatchState v-if="this.movie" :media="this.movie" />
      </v-flex>
    </v-layout>
  </v-container>
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
    "media"
  ])
};
</script>
