<template>
  <v-container mt-4>
    <v-layout column align-center>
      <v-flex></v-flex>
    </v-layout>
    <v-layout row align-center>
      <v-flex xs8 sm10 md10>
        <v-text-field
          :placeholder="'Search for '+ this.currentMedia + '...'"
          v-model="searchText"
          @keyup.enter="getMedia"
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2>
        <v-btn @click="getMedia">Search</v-btn>
      </v-flex>
    </v-layout>
    <div v-if="currentMedia === 'tv'">
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="show in media" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
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
export default {
  components: {
    MovieCard,
    SeriesCard
  }, 
  computed: {
    baseSearchUrl: {
      get() {
        return this.$store.state.baseSearchUrl;
      }
    },
    apiKey: {
      get() {
        return this.$store.state.apiKey;
      }
    },
    currentMedia: {
      get() {
        return this.$store.state.currentMedia;
      },
      set(media) {
        this.$store.commit("setCurrentMedia", media);
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
    searchText: {
      get() {
        return this.$store.state.searchText;
      },
      set(searchText) {
        this.$store.commit("setSearchText", searchText);
      }
    },
    media: {
      get() {
        return this.$store.state.media;
      }
    }
  },
  methods: {
    getMedia() {
      if (this.searchText != "") {
        let searchQuery = `${this.baseSearchUrl}${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}&query=${this.searchText}`;
        console.log(searchQuery);
        axios
          .get(searchQuery)
          .then(response => {
            console.log(response.data.results);
            this.$store.commit("setMediaData", response.data.results);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
