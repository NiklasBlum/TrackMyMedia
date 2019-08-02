<template>
  <v-card>
    <v-img v-if="show.poster_path" :src="this.posterUrl + show.poster_path"></v-img>
    <v-img v-else-if="show.backdrop_path" :src="this.posterUrl + show.backdrop_path"></v-img>
    <v-img v-else :src="notFoundPic"></v-img>
    <v-card-title class="text-truncate">{{show.original_name}}</v-card-title>
    <v-card-actions>
      <router-link :to="/show/ + show.id">
        <v-btn block color="info">Details</v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <!-- <CheckWatchList :media="this.show"></CheckWatchList> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "./CheckWatchList";
export default {
  components: {
    CheckWatchList
  },
  props: ["show"],
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