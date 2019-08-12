<template>
  <v-container grid-list-lg fluid>
    <v-layout row>
      <v-flex>
        <MediaTabs @emmittedMediaChange="getMedia" />
      </v-flex>
    </v-layout>
    <v-layout row align-center justify-space-around>
      <v-flex xs10 sm10 md10>
        <v-text-field
          :placeholder="'Search for '+ this.currentMedia + ' and press enter.' "
          v-model="searchText"
          @keyup.enter="getMedia"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <div v-show="currentMedia == 'tv'">
      <v-layout row align-center justify-space-around>
        <v-flex xs6 sm4 md3 lg2 v-for="show in media" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-show="currentMedia == 'movie'">
      <v-layout row align-center justify-space-around>
        <v-flex xs6 sm4 md3 lg2 v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie" />
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
import MediaTabs from "@/components/MediaTabs";
import { mapState } from "vuex";
export default {
  components: {
    MovieCard,
    SeriesCard,
    MediaTabs
  },
  data() {
    return {
      searchText: "",
      media: []
    };
  },
  methods: {
    getMedia() {
      if (this.searchText != "") {
        let searchQuery = `${this.baseSearchUrl}${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}&query=${this.searchText}`;
        axios
          .get(searchQuery)
          .then(response => {
            this.media = response.data.results;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  computed: mapState(["baseSearchUrl", "apiKey", "currentMedia", "language"])
};
</script>
