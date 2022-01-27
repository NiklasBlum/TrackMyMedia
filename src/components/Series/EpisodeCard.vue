<template>
  <v-card :class="{ 'cyan darken-4': watched, 'blue-grey darken-4': !watched }">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" xs="12" sm="5" md="4" lg="2" align-self="center">
          <PosterImage :imagePath="episode.still_path" />
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="8">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Folge {{ this.episode.episode_number }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Erschienen am {{ getGermanDate(episode.air_date) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-expansion-panels>
            <v-expansion-panel class="">
              <v-expansion-panel-header>
                {{ episode.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ this.episode.overview }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="2" lg="2">
          <v-btn
            elevation="24"
            v-if="!watched"
            block
            height="100%"
            @click="setEpisodeWatchState(true)"
            :loading="loading"
          >
            <v-icon large>mdi-eye-plus</v-icon>
          </v-btn>
          <v-btn
            elevation="24"
            :class="{ 'cyan darken-4': watched, '': !watched }"
            v-if="watched"
            block
            height="100%"
            @click="setEpisodeWatchState(false)"
            :loading="loading"
          >
            <v-icon large>mdi-eye-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import dateFormatter from "@/dateFormatter";
import PosterImage from "@/components/PosterImage.vue";
import FirestoreService from "@/services/FirestoreService.js";

export default {
  components: {
    PosterImage,
  },
  props: {
    episode: Object,
    seasonNumber: Number,
  },
  data() {
    return {
      panel: [0],
      loading: false,
      watched: false,
      showId: parseInt(this.$route.params.id),
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
    async getEpisodeWatchState() {
      this.loading = true;

      this.watched = await FirestoreService.getEpisodeWatchState(
        this.showId,
        this.seasonNumber,
        this.episode.episode_number
      );

      this.loading = false;
    },

    async setEpisodeWatchState(watchState) {
      this.loading = true;

      await FirestoreService.setEpisodeWatchState(
        this.showId,
        this.seasonNumber,
        this.episode.episode_number,
        watchState
      );

      this.watched = watchState;
      this.loading = false;
    },
  },
  computed: {
    ...mapState(["posterUrlOrg", "user"]),
  },
  created() {
    this.getEpisodeWatchState();
  },
};
</script>
