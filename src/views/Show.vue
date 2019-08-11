<template>
  <v-parallax v-if="this.show" :src="this.posterUrlOrg + this.show.backdrop_path" height="100%">
    <v-container fluid grid-list-lg>
      <v-layout row wrap justify-center>
        <v-flex xs5 sm5 md2>
          <v-card>
            <v-img :src="this.posterPath"></v-img>
            <v-card-actions>
              <v-layout justify-space-around>
                <CheckWatchList v-if="this.show" :media="this.show"></CheckWatchList>
                <MediaWatchState v-if="this.show" :media="this.show" />
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm7 md10>
          <v-card flat color="blue-grey darken-2">
            <v-card-title>
              <h1>Plot</h1>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>{{this.show.overview}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-container grid-list-lg fluid>
        <v-layout mt-5 row wrap justify-center justify-space-around>
          <v-flex xs6 sm3 md3 lg2 v-for="season in show.seasons" :key="season.id">
            <SeasonCard :season="season" :show="show"></SeasonCard>
            <v-spacer></v-spacer>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </v-parallax>
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
      show: null,
      posterPath: require("../assets/no-image.png"),
      trailerId: null
    };
  },
  methods: {
    getDetails(id) {
      let searchQuery = `${this.baseUrl}tv/${id}?api_key=${this.apiKey}&language=${this.language}&append_to_response=videos`;
      axios
        .get(searchQuery)
        .then(response => {
          this.show = response.data;
          this.posterPath = this.posterUrl + this.show.poster_path;
          this.trailerId = this.show.videos.results[0].key;
          console.log(this.trailerId);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getDetails(this.$route.params.id);
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
