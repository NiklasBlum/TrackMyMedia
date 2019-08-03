<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm4 md2>
        <v-img :src="this.posterPath"></v-img>
      </v-flex>
      <v-flex sm5>
        <CheckWatchList v-if="this.show" :media="this.show"></CheckWatchList>
        <MediaWatchState v-if="this.show" :media="this.show" />
      </v-flex>
      <v-flex xs12 sm8 md10>
        <v-card flat color="blue-grey darken-2">
          <v-card-title>
            <h1>Plot</h1>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>{{this.show.overview}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container grid-list-lg>
      <v-layout mt-5 row wrap>
        <v-flex xs6 sm3 md3 lg2 v-for="season in show.seasons" :key="season.id">
          <SeasonCard :season="season" :show="show"></SeasonCard>
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import CheckWatchList from "../components/CheckWatchList";
import axios from "axios";
import { mapState } from "vuex";
import SeasonCard from "../components/SeasonCard";
import MediaWatchState from "@/components/MediaWatchState";

export default {
  components: {
    CheckWatchList,
    SeasonCard,
    MediaWatchState
  },
  data() {
    return {
      show: "",
      posterPath: require("../assets/no-image.png"),
      myURL: this.posterUrl
    };
  },

  mounted() {
    this.getDetails(this.$route.params.id);
  },
  methods: {
    getDetails(id) {
      let searchQuery = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${this.apiKey}&language=${this.language}`;
      axios
        .get(searchQuery)
        .then(response => {
          this.show = response.data;
          this.posterPath = this.posterUrl + this.show.poster_path;
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
