<template>
  <v-card>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="season.poster_path" :src="posterUrl + season.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn  large :to="/show/ + show.id + /season/ +season.season_number">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id + /season/ +season.season_number">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-card-title>{{season.name}}</v-card-title>
    <v-card-actions>
      <v-btn color="info" :to="/show/ + show.id + /season/ +season.season_number">Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    season: Object,
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