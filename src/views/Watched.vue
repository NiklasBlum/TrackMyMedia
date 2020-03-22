<template>
  <v-container grid-list-lg>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getMediaFromFireStore" />
      </v-col>
    </v-row>

    <div v-if="currentMedia == 'tv'">
      <v-layout row align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="show in tmdbMedia" :key="show.id">
          <SeriesCard :show="show"></SeriesCard>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="currentMedia == 'movie'">
      <v-layout row align-center justify-space-around>
        <v-flex xs6 sm3 md3 lg2 v-for="movie in tmdbMedia" :key="movie.id">
          <MovieCard :movie="movie"></MovieCard>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import db from "@/firebase/config";
import MovieCard from "@/components/MovieCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";
import MediaFilter from "@/components/MediaFilter.vue";
export default {
  components: {
    MovieCard,
    SeriesCard,
    MediaFilter
  },
  data() {
    return {
      fireBaseMedia: [],
      tmdbMedia: []
    };
  },
  methods: {
    getMediaFromFireStore() {
      this.tmdbMedia = [];
      this.fireBaseMedia = [];
      this.dbRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().watched == true) {
            this.fireBaseMedia.push(doc.data());
            this.getMediaFromTmdb(doc.data().media_id);
          }
        });
      });
    },
    getMediaFromTmdb(id) {
      let query = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${this.apiKey}&language=${this.language}`;
      axios
        .get(query)
        .then(response => {
          this.tmdbMedia.push(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getMediaFromFireStore();
  },
  computed: {
    ...mapState([
      "baseUrl",
      "posterUrl",
      "currentMedia",
      "apiKey",
      "language",
      "user"
    ]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection(this.currentMedia)
        .orderBy("watchedAt")
        .limit(10);
    }
  }
};
</script>
