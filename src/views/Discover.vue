<template>
  <v-container fluid grid-list-lg>
    <v-layout column align-center>
      <v-flex>
        <MediaTabs @emmittedMediaChange="getMedia" />
      </v-flex>
    </v-layout>
    <v-layout mt-3 row align-center justify-space-between>
      <v-flex xs12 sm3 md3>
        <v-select :items="years" v-model="year" item-text="name" item-value="id" label="Year"></v-select>
      </v-flex>
      <v-flex xs12 sm3 md3>
        <v-select :items="genres" v-model="genre" item-text="name" item-value="id" label="Genre"></v-select>
      </v-flex>
      <v-flex xs12 sm3 md3>
        <v-select
          :items="sortBy"
          v-model="sortFilter"
          item-text="name"
          item-value="param"
          label="Sorting"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm3 md3 text-xs-center align-center>
        <v-btn @click="getMedia">Search</v-btn>
      </v-flex>
    </v-layout>
    <div v-if="currentMedia === 'tv'">
      <v-layout row wrap>
        <v-flex xs6 sm3 md3 lg2 v-for="show in media" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-layout row wrap>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import MediaTabs from "@/components/MediaTabs";
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
export default {
  components: {
    MovieCard,
    SeriesCard,
    MediaTabs
  },
  data() {
    return {
      selectedYear: "",
      selectedGenre: "",
      selectedFilter: "",
      media: [],
      genres: [
        { id: 0, name: "" },
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 27, name: "Horror" }
      ],
      years: [
        { id: 0, name: "" },
        { id: 2019, name: "2019" },
        { id: 2018, name: "2018" },
        { id: 2017, name: "2017" },
        { id: 2016, name: "2016" }
      ],
      sortBy: [
        { param: "", name: "" },
        { param: "popularity.asc", name: "Popularity Ascending" },
        { param: "popularity.desc", name: "Popularity Descending" },
        { param: "release_date.asc", name: "Release Ascending" },
        { param: "release_date.desc", name: "Release Descending" }
      ]
    };
  },
  methods: {
    getMedia() {
      this.searchQuery = `${this.baseDiscoverUrl}${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}`;

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
        .then(response => {
          this.media = response.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    baseDiscoverUrl: {
      get() {
        return this.$store.state.baseDiscoverUrl;
      }
    },
    currentMedia: {
      get() {
        return this.$store.state.currentMedia;
      }
    },
    apiKey: {
      get() {
        return this.$store.state.apiKey;
      }
    },
    language: {
      get() {
        return this.$store.state.language;
      },
      set(language) {
        this.$store.commit("setLanguage", lang);
      }
    },
    year: {
      get() {
        return this.selectedYear;
      },
      set(year) {
        this.selectedYear = year;
      }
    },
    genre: {
      get() {
        return this.selectedGenre;
      },
      set(genre) {
        this.selectedGenre = genre;
      }
    },
    sortFilter: {
      get() {
        return this.selectedFilter;
      },
      set(filter) {
        this.selectedFilter = filter;
      }
    }
  }
};
</script>

