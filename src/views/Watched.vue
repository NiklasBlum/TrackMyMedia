<template>
<<<<<<< HEAD
  <v-container>
    <v-layout>
      <v-flex xs3 v-for="movie in tmdbMovies" :key="movie.id">
        <MovieCard :movie="movie" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import db from "@/firebase/init";
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: {
    MovieCard
  },
  data() {
    return {
      fireBaseMovies: [],
      tmdbMovies: []
    };
  },
  methods: {
    getMoviesFromFireStore() {
      db.collection("movies")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let movie = doc.data();
            movie.firebaseId = doc.id;
            this.fireBaseMovies.push(movie);
            this.getMoviesFromTmdb(movie.MovieId);
          });
        });
    },
    getMoviesFromTmdb(id) {
      let query = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${this.apiKey}&language=${this.language}`;

      axios
        .get(query)
        .then(response => {
          this.tmdbMovies.push(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getMoviesFromFireStore();
  },
  computed: mapState([
    "baseUrl",
    "posterUrl",
    "currentMedia",
    "apiKey",
    "language",
    "media"
  ])
};
</script>
=======
  <div></div>
</template>

<script>
export default {};
</script>

>>>>>>> 014649e25ec0329e136056dbca1a6b9279d9d99a
