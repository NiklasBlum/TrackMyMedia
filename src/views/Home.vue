<template>
  <div>
    <v-row no-gutters>
      <v-col align="center">
        <MediaFilter @currentMediaChanged="searchText !== '' ? getMedia() : ''" />
      </v-col>
      <v-col cols="12" class="mt-4">
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
          @keyup.enter="searchText !== '' ? getMedia() : ''"
          :loading="loading"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>
    <div v-if="currentMedia === 'movie' && searchText !== ''">
      <v-row>
        <v-col sm="6" md="4" lg="3" v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>
    </div>
    <div v-if="currentMedia === 'tv' && searchText !== ''">
      <v-row>
        <v-col sm="6" md="4" lg="3" v-for="show in media" :key="show.id">
          <SeriesCard :show="show" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/Movie/MovieCard.vue";
import SeriesCard from "@/components/Series/SeriesCard.vue";
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
