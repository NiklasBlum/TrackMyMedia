<template>
  <v-card>
    <v-img v-if="movie.poster_path" :src="this.posterUrl + movie.poster_path"></v-img>
    <v-img v-else :src="notFoundPic"></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{movie.original_title}}</v-list-item-title>
        <v-list-item-subtitle>{{movie.release_date}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions>
      <MediaWatchState v-if="this.movie" :media="this.movie" />
      <v-spacer></v-spacer>
      <CheckWatchList v-if="this.movie" :media="this.movie"></CheckWatchList>
      <v-spacer></v-spacer>
      <v-btn :to="{path: `movie/${movie.id}`}">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
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

