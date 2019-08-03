<template>
  <v-card>
    <v-img v-if="movie.poster_path" :src="this.posterUrl + movie.poster_path"></v-img>
    <v-img v-else-if="movie.backdrop_path" :src="this.posterUrl + movie.backdrop_path"></v-img>
    <v-img v-else :src="notFoundPic"></v-img>
    <v-card-title class="text-truncate">{{movie.original_title}}</v-card-title>
    <v-card-actions>
      <router-link :to="{path: `movie/${movie.id}`}">
        <v-btn block color="info">Details</v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <CheckWatchList :media="this.movie"></CheckWatchList>
      <MediaWatchState v-if="this.movie" :media="movie" />
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "./CheckWatchList";
import MediaWatchState from "@/components/MediaWatchState";
export default {
  components: {
    CheckWatchList,
    MediaWatchState
  },
  props: {
    movie: Object
  },
  data() {
    return {
      notFoundPic: require("../assets/no-image.png")
    };
  },
  computed: {
    posterUrl: {
      get() {
        return this.$store.state.posterUrl;
      }
    }
  }
};
</script>

