<template>
  <v-card>
    <v-img v-if="show.poster_path" :src="this.posterUrl + show.poster_path"></v-img>
    <v-img v-else :src="notFoundPic"></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{show.name}}</v-list-item-title>
        <v-list-item-subtitle>{{show.first_air_date}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions>
      <MediaWatchState v-if="this.show" :media="show" />
      <v-spacer></v-spacer>
      <CheckWatchList :media="this.show"></CheckWatchList>
      <v-spacer></v-spacer>
      <v-btn :to="/show/ + show.id">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "./CheckWatchList";
import MediaWatchState from "@/components/MediaWatchState.vue";

export default {
  components: {
    CheckWatchList,
    MediaWatchState
  },
  props: {
    show: Object
  },
  data() {
    return {
      notFoundPic: require("../assets/no-image.png")
    };
  },
  created() {
    console.log(this.show);
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