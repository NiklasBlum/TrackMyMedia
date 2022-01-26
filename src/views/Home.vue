<template>
  <div>
    <v-row no-gutters>
      <v-col align="center">
        <MediaFilter
          @currentMediaChanged="searchText !== '' ? getMediaBySearch() : ''"
        />
      </v-col>
      <v-col cols="12" class="my-4">
        <v-text-field
          light
          background-color="white"
          rounded
          filled
          dense
          label="Search"
          hide-details
          :placeholder="'Search for ' + this.currentMedia + ' and press enter.'"
          v-model="searchText"
          @keyup.enter="searchText !== '' ? getMediaBySearch() : ''"
          :loading="loading"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>
    <div v-if="this.media.length > 0">
      <v-row>
        <v-col
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="mediaItem in media"
          :key="mediaItem.id"
        >
          <MediaCard :media="mediaItem" :mediaType="currentMedia" />
        </v-col>
      </v-row>
    </div>
    <v-layout mt-5 justify-center>
      <Pagination @pageChanged="pageChanged" v-show="showPagination" />
    </v-layout>
    <LoadingAnimation v-if="loading" />
  </div>
</template>

<script>
import MediaFilter from "@/components/MediaFilter";
import MediaCard from "@/components/MediaCard";
import { mapState } from "vuex";
import TmdbService from "@/services/TmdbService.js";
import Pagination from "@/components/Navigation/Pagination";
import LoadingAnimation from "@/components/LoadingAnimation";
export default {
  components: {
    MediaFilter,
    MediaCard,
    Pagination,
    LoadingAnimation,
  },
  data() {
    return {
      searchText: "",
      media: [],
      loading: false,
      showPagination: false,
      page: 1,
    };
  },
  methods: {
    pageChanged(page) {
      this.page = page;
      this.getMediaBySearch();
    },
    getMediaBySearch() {
      this.showPagination = false;
      this.media = [];
      this.loading = true;
      TmdbService.getMediaBySearch(this.searchText, this.page)
        .then((response) => {
          this.media = response;
        })
        .finally(() => {
          this.loading = false;
          if (this.media.length > 0) {
            this.showPagination = true;
          }
        });
    },
  },
  computed: mapState(["baseSearchUrl", "apiKey", "currentMedia", "language"]),
};
</script>
