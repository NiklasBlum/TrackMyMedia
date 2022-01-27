<template>
  <v-card v-if="show">
    <v-card-title>
      <div class="display-1">{{ show.name }}</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="5" md="6" lg="4">
          <MediaCard :media="this.show" :mediaType="currentMedia" />
        </v-col>
        <v-col cols="12" sm="7" md="6" lg="4">
          <Plot :description="this.show.overview" />
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="2">
          <MediaStats
            :id="show.id"
            :runtime="null"
            :releaseState="show.status"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="2"
          v-if="this.freeStreamingProviders"
        >
          <MediaStreamingProvider :providers="this.freeStreamingProviders" />
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
              <v-row justify="center" class="pt-3">
                <v-col
                  cols="6"
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
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import SeasonCard from "../components/Series/SeasonCard";
import MediaCard from "@/components/MediaCard.vue";
import Trailer from "@/components/Trailer.vue";
import TmdbService from "@/services/TmdbService";
import Reviews from "@/components/Reviews.vue";
import MediaStats from "@/components/MediaStats.vue";
import Plot from "@/components/Plot.vue";
import MediaStreamingProvider from "@/components/MediaStreamingProvider.vue";

export default {
  components: {
    SeasonCard,
    MediaCard,
    Trailer,
    Reviews,
    MediaStats,
    Plot,
    MediaStreamingProvider,
  },
  data() {
    return {
      show: null,
      posterPath: require("@/assets/no-image.png"),
      trailerId: null,
      reviews: [],
      freeStreamingProviders: null,
    };
  },
  methods: {
    async getDetails(showId) {
      this.show = await TmdbService.getShowDetails(showId);

      this.posterPath = this.posterUrl + this.show.poster_path;
      if (this.show.videos.results.length > 0) {
        this.trailerId = this.show.videos.results[0].key;
      }
    },
    async getReviews(showId) {
      this.reviews = await TmdbService.getReviews("tv", showId);
    },
    async getFreeStreamingProviders(showId) {
      this.freeStreamingProviders = await TmdbService.getFreeStreamingProviders(
        "tv",
        showId
      );
    },
  },
  created() {
    this.getDetails(this.$route.params.id);
    this.getReviews(this.$route.params.id);
    this.getFreeStreamingProviders(this.$route.params.id);
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
