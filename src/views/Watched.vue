<template>
  <div>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getWatchedFirestoreTmdbIds" />
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-around">
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
    //TODO: new Firebase method to get all media Ids where watched=true
    getWatchedFirestoreTmdbIds() {
      (this.tmdbMedia = []),
        FirestoreService.getMediaWatchedTmdbIds(this.currentMedia).then(
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
