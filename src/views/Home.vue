<template>
  <v-container grid-list-lg>
    <v-layout column align-center>
      <v-flex>
        <MediaTabs @emmittedMediaChange="getMedia" />
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-space-around>
      <v-flex xs10 sm10 md10>
        <v-text-field
          :placeholder="'Search for '+ this.currentMedia + ' and press enter.' "
          v-model="searchText"
          @keyup.enter="getMedia"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <div v-if="currentMedia == 'tv'">
      <v-layout row wrap align-center justify-space-around >
        <v-flex xs5 sm4 md2 lg2 v-for="show in media" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia == 'movie'">
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in media" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
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
      console.log("asdf");
      let searchQuery = `${this.baseSearchUrl}${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}&query=${this.searchText}`;
      console.log(searchQuery);
      axios
        .get(searchQuery)
        .then(response => {
          this.media = response.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: mapState(["baseSearchUrl", "apiKey", "currentMedia", "language"])
};
</script>
