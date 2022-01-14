<template>
  <v-card v-if="show">
    <v-card-title>
      <div class="display-1">{{ show.name }}</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="3">
          <SeriesCard :show="this.show" />
        </v-col>
        <v-col>
          <v-card class="black mb-3">
            <v-card-title class="blue mb-3">Plot</v-card-title>
            <v-card-text>{{ this.show.overview }}</v-card-text>
          </v-card>
          <MediaStats
            :id="show.id"
            :runtime="null"
            :releaseState="show.status"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Trailer :trailerId="trailerId" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="black">
            <v-card-title class="blue"> Staffeln </v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col
                  xs="12"
                  sm="4"
                  md="4"
                  lg="2"
                  v-for="season in show.seasons"
                  :key="season.id"
                >
                  <SeasonCard :season="season" :show="show" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Reviews :reviews="reviews" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-layout mt-5 row wrap justify-center justify-space-around>
      <v-flex xs12 sm4 md3 lg2 v-for="season in show.seasons" :key="season.id">
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import SeasonCard from "../components/Series/SeasonCard";
import SeriesCard from "@/components/Series/SeriesCard";
import Trailer from "@/components/Trailer.vue";
import TmdbService from "@/services/TmdbService";
import Reviews from "@/components/Reviews.vue";
import MediaStats from "@/components/MediaStats.vue";

export default {
  components: {
    SeasonCard,
    SeriesCard,
    Trailer,
    Reviews,
    MediaStats,
  },
  data() {
    return {
      show: null,
      posterPath: require("@/assets/no-image.png"),
      trailerId: null,
      reviews: [],
    };
  },
  methods: {
    getDetails(id) {
      let searchQuery = `${this.baseUrl}tv/${id}?api_key=${this.apiKey}&language=${this.language}&append_to_response=videos`;
      axios
        .get(searchQuery)
        .then((response) => {
          this.show = response.data;
          console.log(this.show);
          this.posterPath = this.posterUrl + this.show.poster_path;
          if (this.show.videos.results.length > 0) {
            this.trailerId = this.show.videos.results[0].key;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getReviews(id) {
      this.reviews = await TmdbService.getReviews("tv", id);
    },
  },
  created() {
    this.getDetails(this.$route.params.id);
    this.getReviews(this.$route.params.id);
  },
  computed: mapState([
    "baseUrl",
    "posterUrl",
    "currentMedia",
    "apiKey",
    "language",
    "media",
    "posterUrlOrg",
  ]),
};
</script>
