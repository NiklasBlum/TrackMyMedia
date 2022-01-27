<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <PosterImage
      :imagePath="season.poster_path"
      :routePath="/show/ + show.id + /season/ + season.season_number"
    />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ season.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ getGermanDate(season.air_date) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
        v-if="watched"
        light
        color="cyan"
        block
        @click="setSeasonWatchState(false)"
        :loading="loading"
      >
        <v-icon large>mdi-eye-check</v-icon>
      </v-btn>
      <v-btn
        v-if="!watched"
        block
        @click="setSeasonWatchState(true)"
        :loading="loading"
      >
        <v-icon large>mdi-eye-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import dateFormatter from "@/dateFormatter";
import PosterImage from "@/components/PosterImage.vue";
import FirestoreService from "@/services/FirestoreService.js";
import TmdbService from "@/services/TmdbService.js";

export default {
  components: {
    PosterImage,
  },
  props: {
    season: Object,
    show: Object,
  },
  data() {
    return {
      loading: false,
      watched: false,
      notFoundPic: require("@/assets/no-image.png"),
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
    async getSeasonWatchState() {
      this.loading = true;

      this.watched = await FirestoreService.getSeasonWatchState(
        this.show.id,
        this.season.season_number
      );

      this.loading = false;
    },

    async setSeasonWatchState(watchState) {
      this.loading = true;

      await FirestoreService.setSeasonWatchState(
        this.show.id,
        this.season.season_number,
        watchState
      );
      let episodes = await TmdbService.getEpisodes(
        this.show.id,
        this.season.season_number
      );
      for (const episode of episodes) {
        await FirestoreService.setEpisodeWatchState(
          this.show.id,
          this.season.season_number,
          episode.episode_number,
          watchState
        );
      }

      this.watched = watchState;
      this.loading = false;
    },
  },
  created() {
    this.getSeasonWatchState();
  },
  computed: {
    ...mapState(["posterUrl", "user"]),
  },
};
</script>
