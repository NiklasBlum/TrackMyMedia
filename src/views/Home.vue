<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <MediaFilter
          @currentMediaChanged="searchText !== '' ? getMedia() : ''"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          :placeholder="'Search for ' + this.currentMedia + ' and press enter.'"
          v-model="searchText"
          @keyup.enter="searchText !== '' ? getMedia() : ''"
          :loading="loading"
        />
      </v-col>
    </v-row>
    <div v-if="currentMedia === 'movie' && searchText !== ''">
      <v-row>
        <v-col sm="4" md="3" lg="2" v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>
    </div>
    <div v-if="currentMedia === 'tv' && searchText !== ''">
      <v-row>
        <v-col sm="4" md="3" lg="2" v-for="show in media" :key="show.id">
          <SeriesCard :show="show" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
import MediaFilter from "@/components/MediaFilter";
import { mapState } from "vuex";

export default {
  components: {
    MovieCard,
    SeriesCard,
    MediaFilter
  },
  data() {
    return {
      searchText: "",
      media: [],
      loading: false
    };
  },
  methods: {
    getMedia() {
      this.loading = true;
      let searchQuery = `${this.baseSearchUrl}${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}&query=${this.searchText}`;
      axios
        .get(searchQuery)
        .then(response => {
          this.media = response.data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  computed: mapState(["baseSearchUrl", "apiKey", "currentMedia", "language"])
};
</script>
