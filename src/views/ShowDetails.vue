<template>
  <v-card v-if="show">
    <v-card-title>
      <div class="display-1">{{ show.name }}</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4" md="3" lg="3">
          <SeriesCard :show="this.show" />
        </v-col>
        <v-col>
          <v-card shaped class="black mb-3">
            <v-card-title class="blue mb-3">Plot</v-card-title>
            <v-card-text>{{ this.show.overview }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Trailer :trailerId="trailerId" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-container grid-list-lg fluid>
      <v-layout mt-5 row wrap justify-center justify-space-around>
        <v-flex xs12 sm4 md3 lg2 v-for="season in show.seasons" :key="season.id">
          <SeasonCard :season="season" :show="show" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import SeasonCard from "../components/Series/SeasonCard";
import SeriesCard from "@/components/Series/SeriesCard";
import Trailer from "@/components/Trailer.vue";
export default {
  components: {
    SeasonCard,
    SeriesCard,
    Trailer
  },
  data() {
    return {
      show: null,
      posterPath: require("@/assets/no-image.png"),
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
          console.log(response.data);
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
