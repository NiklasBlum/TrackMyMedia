<template>
  <div>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getMedia" />
      </v-col>
    </v-row>
    <div class="my-3">
      <v-sheet rounded elevation="10" class="grey darken-2">
        <v-row align="center" class="px-3">
          <v-col cols="12" xs="12" sm="6" md="3">
            <v-select
              solo
              light
              rounded
              hide-details
              :items="years"
              v-model="year"
              item-text="name"
              item-value="id"
              label="Year"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="3">
            <v-select
              solo
              light
              rounded
              hide-details
              :items="genres"
              v-model="genre"
              item-text="name"
              item-value="id"
              label="Genre"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="3">
            <v-select
              solo
              light
              hide-details
              rounded
              :items="sortBy"
              v-model="sortFilter"
              item-text="name"
              item-value="param"
              label="Sorting"
            />
          </v-col>
          <v-col>
            <v-btn
              rounded
              block
              @click="getMedia"
              :loading="loading"
              color="cyan darken-4"
            >
              <v-icon left>mdi-magnify</v-icon>Search
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
    <div>
      <v-row>
        <v-col
          sm="6"
          md="4"
          lg="3"
          v-for="mediaItem in media"
          :key="mediaItem.id"
        >
          <MediaCard :media="mediaItem" :mediaType="currentMedia" />
        </v-col>
      </v-row>
    </div>
    <v-layout mt-4 justify-center v-if="this.media">
      <Pagination @pageChanged="pageChanged" v-show="showPagination" />
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "@/components/Navigation/Pagination";
import MediaFilter from "@/components/MediaFilter";
import MediaCard from "@/components/MediaCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    MediaCard,
    MediaFilter,
    Pagination,
  },
  data() {
    return {
      loading: false,
      showPagination: false,
      page: 1,
      selectedYear: "",
      selectedGenre: "",
      selectedFilter: "",
      media: [],
      genres: [
        { id: 0, name: "" },
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 27, name: "Horror" },
        { id: 27, name: "Horror" },
        { id: 99, name: "Documentary" },
      ],
      years: [
        { id: 0, name: "" },
        { id: 2022, name: "2022" },
        { id: 2021, name: "2021" },
        { id: 2020, name: "2020" },
        { id: 2019, name: "2019" },
        { id: 2018, name: "2018" },
        { id: 2017, name: "2017" },
        { id: 2016, name: "2016" },
        { id: 2015, name: "2015" },
        { id: 2014, name: "2014" },
        { id: 2013, name: "2013" },
      ],
      sortBy: [
        { param: "popularity.desc", name: "Popularity Descending" },
        { param: "popularity.asc", name: "Popularity Ascending" },
        { param: "release_date.asc", name: "Release Ascending" },
        { param: "release_date.desc", name: "Release Descending" },
      ],
    };
  },
  methods: {
    pageChanged(page) {
      this.page = page;
      this.getMedia();
    },
    getMedia() {
      this.loading = true;
      this.showPagination = false;
      this.media = null;
      this.searchQuery = `${this.baseDiscoverUrl}${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}&page=${this.page}`;

      if (this.selectedFilter) {
        this.searchQuery += `&sort_by=${this.selectedFilter}`;
      }
      if (this.selectedGenre) {
        this.searchQuery += `&with_genres=${this.selectedGenre}`;
      }
      if (this.selectedYear) {
        this.searchQuery += `&year=${this.selectedYear}`;
      }

      axios
        .get(this.searchQuery)
        .then((response) => {
          this.media =
            response.data.results.length == 0 ? null : response.data.results;
        })
        .finally(() => {
          this.loading = false;
          this.showPagination = true;
        });
    },
  },
  computed: {
    ...mapState(["baseDiscoverUrl", "currentMedia", "apiKey", "language"]),

    year: {
      get() {
        return this.selectedYear;
      },
      set(year) {
        this.selectedYear = year;
      },
    },
    genre: {
      get() {
        return this.selectedGenre;
      },
      set(genre) {
        this.selectedGenre = genre;
      },
    },
    sortFilter: {
      get() {
        return this.selectedFilter;
      },
      set(filter) {
        this.selectedFilter = filter;
      },
    },
  },
};
</script>
