<template>
  <v-container mt-5>
    <v-layout mb-4 column align-center>
      <v-flex>
        <v-tabs
          fixed-tabs
          v-model="currentMedia"
          @change="getPopular"
          color="transparent"
          slider-color="blue"
          icons-and-text
        >
          <v-tab :href="'#movie'">
            Movies
            <v-icon>movie</v-icon>
          </v-tab>
          <v-tab :href="'#tv'">
            Series
            <v-icon>tv</v-icon>
          </v-tab>
        </v-tabs>
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
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  components: {
    MovieCard,
    SeriesCard
  },
  data() {
    return {
      searchQuery: "",
      media: []
    };
  },
  methods: {
    getPopular() {
      this.searchQuery = `${this.baseUrl}${this.currentMedia}/popular?api_key=${
        this.apiKey
      }&language=${this.language}`;

      axios
        .get(this.searchQuery)
        .then(response => {
          this.media = response.data.results;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getPopular();
  },
  computed: {
    baseUrl: {
      get() {
        return this.$store.state.baseUrl;
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
    }
  }
};
</script>

