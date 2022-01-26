<template>
  <div>
    <LoadingAnimation v-if="loading" />
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getWatchedFirestoreTmdbIds" />
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-around" v-if="!loading">
      <v-col
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="mediaItem in tmdbMedia"
        :key="mediaItem.id"
      >
        <MediaCard :media="mediaItem" :mediaType="currentMedia" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MediaFilter from "@/components/MediaFilter.vue";
import MediaCard from "@/components/MediaCard.vue";
import FirestoreService from "@/services/FirestoreService.js";
import TmdbService from "@/services/TmdbService.js";
import LoadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  components: {
    MediaFilter,
    MediaCard,
    LoadingAnimation,
  },
  data() {
    return {
      tmdbMedia: [],
      loading: false,
    };
  },
  methods: {
    async getWatchedFirestoreTmdbIds() {
      this.loading = true;
      this.tmdbMedia = [];
      let tmdbIds = await FirestoreService.getMediaWatchedTmdbIds();

      for (const id of tmdbIds) {
        let response = await TmdbService.getMediaFromTmdbById(id);
        this.tmdbMedia.push(response);
      }
      this.loading = false;
    },
  },
  created() {
    this.getWatchedFirestoreTmdbIds();
  },
  computed: {
    ...mapState([
      "baseUrl",
      "posterUrl",
      "currentMedia",
      "apiKey",
      "language",
      "user",
    ]),
  },
};
</script>
