<template>
  <v-container mt-5>
    <v-layout column align-center>
      <v-flex>
        <v-tabs fixed-tabs v-model="currentMedia" color="transparent" slider-color="blue">
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
      <v-layout row wrap>
        <v-flex xs6 sm3 md3 lg2 v-for="show in watchList" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia === 'movie'">
      <v-layout row wrap>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in watchList" :key="movie.id">
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
      watchList: [],
      localMedia: "movies"
    };
  },
<<<<<<< HEAD
  created() {
    console.log("adsf");
=======
  watch: {
    currentMedia(media) {
      console.log("media: " + media);
      if (media === "tv") {
        this.localMedia = media;
      }
      if (media === "movie") {
        this.localMedia = "movies";
      }
      this.getWatchlist();
    }
  },
  mounted() {
>>>>>>> 014649e25ec0329e136056dbca1a6b9279d9d99a
    this.getWatchlist();
    this.currentMedia;
  },
  methods: {
    getWatchlist() {
<<<<<<< HEAD
      this.searchQuery = `${this.baseAccountUrl}${this.accountId}/watchlist/${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}&session_id=${this.sessionId}`;
      if (this.sortBy != "") {
        this.searchQuery += `&sort_by=${this.sortBy}`;
      }
=======
      this.searchQuery = `${this.baseAccountUrl}${this.accountId}/watchlist/${
        this.localMedia
      }?api_key=${this.apiKey}&language=${this.language}&session_id=${
        this.sessionId
      }`;

>>>>>>> 014649e25ec0329e136056dbca1a6b9279d9d99a
      axios
        .get(this.searchQuery)
        .then(response => {
          console.log(response.data.results);
          this.watchList = response.data.results;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    baseAccountUrl: {
      get() {
        return this.$store.state.baseAccountUrl;
      }
    },
    accountId: {
      get() {
        return this.$store.state.accountId;
      }
    },
    sessionId: {
      get() {
        return this.$store.state.sessionId;
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
      }
    },
    currentMedia: {
      get() {
        return this.$store.state.currentMedia;
      },
      set(media) {
        this.$store.commit("setCurrentMedia", media);
      }
    }
  }
};
</script>

