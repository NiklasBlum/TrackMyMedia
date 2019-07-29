<template>
  <v-container mt-5>
    <v-layout row wrap>
      <v-flex xs12 sm4 md2>
        <v-img :src="this.posterPath"></v-img>
      </v-flex>
      <v-flex sm5>
        <CheckWatchList v-if="this.details" :media="this.details"></CheckWatchList>
      </v-flex>
      <v-flex xs12 sm8 md10>
        <v-card flat color="blue-grey darken-2">
          <v-card-title>
            <h1>Plot</h1>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>{{this.details.overview}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout mt-5 row wrap>
      <v-flex xs6 sm3 md3 lg2 v-for="season in details.seasons" :key="season.id">
        <SeasonCard :season="season" :show="details"></SeasonCard>
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CheckWatchList from "../components/CheckWatchList";
import axios from "axios";
import { mapState } from "vuex";
import SeasonCard from "../components/SeasonCard";

export default {
  components: {
    CheckWatchList,
    SeasonCard
  },
  data() {
    return {
      searchQuery: "",
      details: "",
      posterPath: require("../assets/no-image.png"),
      myURL: this.posterUrl
    };
  },

  mounted() {
    this.getDetails(this.$route.params.id);
  },
  methods: {
    getDetails(id) {
      this.searchQuery = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${
        this.apiKey
      }&language=${this.language}`;
      axios
        .get(this.searchQuery)
        .then(response => {
          this.details = response.data;
          this.posterPath = this.posterUrl + this.details.poster_path;
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
