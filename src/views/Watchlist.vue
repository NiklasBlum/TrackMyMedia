<template>
  <div>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getFirestoreTmdbIds" />
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-around">
      <v-col
        sm="6"
        md="4"
        lg="3"
        v-for="mediaItem in tmdbMedia"
        :key="mediaItem.id"
      >
        <MediaCard :media="mediaItem" :mediaType="currentMedia" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MediaFilter from "@/components/MediaFilter";
import MediaCard from "@/components/MediaCard.vue";
import { mapState } from "vuex";
import FirestoreService from "@/services/FirestoreService.js";
import TmdbService from "@/services/TmdbService.js";

export default {
  components: {
    MediaFilter,
    MediaCard,
  },
  data() {
    return {
      tmdbMedia: [],
    };
  },
  methods: {
    getFirestoreTmdbIds() {
      (this.tmdbMedia = []),
        FirestoreService.getMediaOnWatchlistTmdbIds().then(
          (tmdbIds) => {
            tmdbIds.forEach((tmdbId) => {
              TmdbService.getMediaFromTmdbById(tmdbId).then((response) => {
                this.tmdbMedia.push(response);
              });
            });
          }
        );
    },
  },
  computed: mapState([
    "baseUrl",
    "posterUrl",
    "currentMedia",
    "apiKey",
    "language",
    "user",
  ]),
  created() {
    this.getFirestoreTmdbIds();
  },
};
</script>
