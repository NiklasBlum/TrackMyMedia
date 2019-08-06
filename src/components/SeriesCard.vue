<template>
  <v-card>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="show.poster_path" :src="posterUrl + show.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{show.name}}</v-list-item-title>
        <v-list-item-subtitle>{{show.first_air_date}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions>
      <MediaWatchState v-if="show" :media="show" />
      <v-spacer></v-spacer>
      <CheckWatchList v-if="show" :media="show"></CheckWatchList>
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
  computed: {
    posterUrl: {
      get() {
        return this.$store.state.posterUrl;
      }
    }
  }
};
</script>