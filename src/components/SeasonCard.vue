<template>
  <v-card>
    <v-img v-if="season.poster_path" :src="this.posterUrl + season.poster_path"></v-img>
    <v-img v-else :src="notFoundPic"></v-img>
    <v-card-title>{{season.name}}</v-card-title>
    <v-card-actions>
      <router-link :to="/show/ + show.id + /season/ +season.season_number">
        <v-btn color="info">Details</v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["season", "show"],
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